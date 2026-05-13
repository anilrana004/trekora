import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Common "../types/common";
import BookingTypes "../types/booking";

module {
  public type Booking = BookingTypes.Booking;
  public type BookingInput = BookingTypes.BookingInput;

  public func generateRef(id : Nat) : Text {
    let s = id.toText();
    let padded = if (s.size() >= 6) { s } else {
      let pad = (6 - s.size() : Int).toNat();
      var prefix = "";
      var i = 0;
      while (i < pad) { prefix := prefix # "0"; i += 1 };
      prefix # s
    };
    "HT" # padded
  };

  // Generates a pseudo-random 14-character alphanumeric order ID using
  // Time.now() as entropy. Suitable for client-side order ID generation
  // where the backend cannot call the Razorpay API directly.
  // TODO(production): Replace with a real Razorpay order creation API call
  // via http-outcalls extension once Razorpay secret key is stored securely
  // in canister config. The API endpoint is POST https://api.razorpay.com/v1/orders
  public func generateOrderId() : Text {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charsArray = chars.toArray();
    let len = charsArray.size(); // 62
    let seed = Time.now().toNat();
    var result = "";
    var entropy = seed;
    var i = 0;
    while (i < 14) {
      // Mix entropy with position to vary each character
      let mix = entropy + i * 1_000_003;
      let idx = mix % len;
      result := result # Text.fromChar(charsArray[idx]);
      // Advance entropy via a simple LCG step
      entropy := (entropy * 1_664_525 + 1_013_904_223) % 4_294_967_296;
      i += 1
    };
    result
  };

  public func create(
    bookings : List.List<Booking>,
    nextId : Nat,
    caller : Principal,
    input : BookingInput,
  ) : Booking {
    let booking : Booking = {
      id = nextId;
      bookingRef = generateRef(nextId);
      userId = caller;
      itemType = input.itemType;
      itemId = input.itemId;
      itemName = input.itemName;
      batchDate = input.batchDate;
      groupSize = input.groupSize;
      totalAmount = input.totalAmount;
      advanceAmount = input.advanceAmount;
      status = "pending";
      travelerName = input.travelerName;
      email = input.email;
      phone = input.phone;
      createdAt = Time.now();
      paymentStatus = "pending";
      razorpayOrderId = null;
      razorpayPaymentId = null;
      razorpaySignature = null;
      paymentProvider = "razorpay";
      paymentTimestamp = null;
    };
    bookings.add(booking);
    booking
  };

  public func getByUser(bookings : List.List<Booking>, userId : Principal) : [Booking] {
    bookings.filter(func(b) { Principal.equal(b.userId, userId) }).toArray()
  };

  public func getAll(bookings : List.List<Booking>) : [Booking] {
    bookings.toArray()
  };

  public func cancel(bookings : List.List<Booking>, id : Nat, caller : Principal) : Common.Result<Bool, Text> {
    let existing = bookings.find(func(b) { b.id == id });
    switch (existing) {
      case null { #err("Booking not found") };
      case (?b) {
        if (not Principal.equal(b.userId, caller)) {
          return #err("Not authorized");
        };
        if (b.status == "cancelled") {
          return #err("Already cancelled");
        };
        bookings.mapInPlace(func(bk) {
          if (bk.id == id) { { bk with status = "cancelled" } } else { bk }
        });
        #ok(true)
      };
    }
  };

  public func updateStatus(bookings : List.List<Booking>, id : Nat, status : Text) : Bool {
    let existing = bookings.find(func(b) { b.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        bookings.mapInPlace(func(b) {
          if (b.id == id) { { b with status = status } } else { b }
        });
        true
      };
    }
  };

  // Generates a Razorpay-compatible order ID (format: "order_XXXXXXXXXXXXXX")
  // and stores it in the booking record, transitioning paymentStatus to "initiated".
  // amount is in paise (totalAmount * 100), currency is "INR".
  // TODO(production): Make an HTTP outcall to Razorpay's POST /v1/orders endpoint
  // here using the http-outcalls extension, passing amount + currency + receipt.
  // The response order.id should then be stored as razorpayOrderId.
  public func initPayment(
    bookings : List.List<Booking>,
    bookingId : Nat,
    _amount : Nat,
    _currency : Text,
  ) : Common.Result<Text, Text> {
    let existing = bookings.find(func(b) { b.id == bookingId });
    switch (existing) {
      case null { #err("Booking not found") };
      case (?b) {
        if (b.paymentStatus == "paid") {
          return #err("Booking is already paid");
        };
        let orderId = "order_" # generateOrderId();
        let updated : Booking = {
          b with
          razorpayOrderId = ?orderId;
          paymentStatus = "initiated";
        };
        bookings.mapInPlace(func(bk) {
          if (bk.id == bookingId) { updated } else { bk }
        });
        #ok(orderId)
      };
    }
  };

  // Stores paymentId + signature, marks booking as paid and confirmed.
  // TODO(production): Perform real HMAC-SHA256 signature verification here:
  //   expected = HMAC_SHA256(razorpayOrderId # "|" # paymentId, RAZORPAY_SECRET)
  //   Verify that expected == signature before accepting the payment.
  // This requires the Razorpay secret key to be stored securely in canister config
  // and the hmac computation done via the http-outcalls extension or a pure Motoko
  // HMAC implementation.
  public func verifyPayment(
    bookings : List.List<Booking>,
    bookingId : Nat,
    paymentId : Text,
    signature : Text,
    now : Nat,
  ) : Common.Result<Booking, Text> {
    if (paymentId.size() == 0) {
      return #err("Payment ID must not be empty");
    };
    if (signature.size() == 0) {
      return #err("Signature must not be empty");
    };
    let existing = bookings.find(func(b) { b.id == bookingId });
    switch (existing) {
      case null { #err("Booking not found") };
      case (?b) {
        if (b.paymentStatus == "paid") {
          return #err("Payment already verified");
        };
        // TODO(production): Reject here if HMAC-SHA256 verification fails.
        // For now, any non-empty signature is accepted for test-mode flows.
        let updated : Booking = {
          b with
          razorpayPaymentId = ?paymentId;
          razorpaySignature = ?signature;
          paymentStatus = "paid";
          status = "confirmed";
          paymentTimestamp = ?now;
        };
        bookings.mapInPlace(func(bk) {
          if (bk.id == bookingId) { updated } else { bk }
        });
        #ok(updated)
      };
    }
  };
};
