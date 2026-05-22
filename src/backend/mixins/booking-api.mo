import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import BookingTypes "../types/booking";
import BookingLib "../lib/booking";
import DormantFeatures "../lib/dormant-features";

mixin (
  bookings : List.List<BookingLib.Booking>,
  bookingCounter : Common.Counter,
  admins : List.List<Principal>,
) {
  public shared ({ caller }) func createBooking(input : BookingTypes.BookingInput) : async Common.Result<Nat, Text> {
    if (DormantFeatures.loginEnabled and caller.isAnonymous()) {
      return #err("Must be authenticated to book");
    };
    let id = bookingCounter.value;
    ignore BookingLib.create(bookings, id, caller, input);
    bookingCounter.value += 1;
    #ok(id)
  };

  public shared query ({ caller }) func getUserBookings() : async [BookingTypes.Booking] {
    if (not DormantFeatures.loginEnabled) {
      return [];
    };
    BookingLib.getByUser(bookings, caller)
  };

  public shared ({ caller }) func cancelBooking(id : Nat) : async Common.Result<Bool, Text> {
    if (not DormantFeatures.loginEnabled) {
      return #err(DormantFeatures.loginDisabledMessage());
    };
    BookingLib.cancel(bookings, id, caller)
  };

  public shared ({ caller }) func getAllBookings() : async Common.Result<[BookingTypes.Booking], Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    #ok(BookingLib.getAll(bookings))
  };

  public shared ({ caller }) func updateBookingStatus(id : Nat, status : Text) : async Common.Result<Bool, Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    if (BookingLib.updateStatus(bookings, id, status)) { #ok(true) }
    else { #err("Booking not found") }
  };

  // Initiates a payment for bookingId by generating a Razorpay-compatible order ID
  // and storing it in the booking record. amount is in paise (rupees × 100),
  // currency should be "INR".
  // Returns Ok(orderId) — the frontend passes this to the Razorpay checkout modal.
  // TODO(production): This will delegate to a real Razorpay order creation HTTP outcall.
  public shared ({ caller }) func initPayment(bookingId : Nat, amount : Nat, currency : Text) : async Common.Result<Text, Text> {
    if (not DormantFeatures.paymentEnabled) {
      return #err(DormantFeatures.paymentDisabledMessage());
    };
    if (caller.isAnonymous()) {
      return #err("Must be authenticated");
    };
    BookingLib.initPayment(bookings, bookingId, amount, currency)
  };

  // Verifies a completed Razorpay payment by storing paymentId + signature and
  // transitioning the booking to paid/confirmed status.
  // signature is the razorpay_signature value from the Razorpay handler callback.
  // TODO(production): Real HMAC-SHA256 verification must be added in BookingLib.verifyPayment
  // before this is used in production. See lib/booking.mo for details.
  public shared ({ caller }) func verifyPayment(bookingId : Nat, paymentId : Text, signature : Text) : async Common.Result<BookingTypes.Booking, Text> {
    if (not DormantFeatures.paymentEnabled) {
      return #err(DormantFeatures.paymentDisabledMessage());
    };
    if (caller.isAnonymous()) {
      return #err("Must be authenticated");
    };
    let nowNat = Time.now().toNat();
    BookingLib.verifyPayment(bookings, bookingId, paymentId, signature, nowNat)
  };
};
