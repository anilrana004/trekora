import Common "common";

module {
  public type Booking = {
    id : Nat;
    bookingRef : Text;
    userId : Principal;
    itemType : Text;
    itemId : Nat;
    itemName : Text;
    batchDate : Common.Timestamp;
    groupSize : Nat;
    totalAmount : Nat;
    advanceAmount : Nat;
    status : Text;
    travelerName : Text;
    email : Text;
    phone : Text;
    createdAt : Common.Timestamp;
    // Payment fields
    paymentStatus : Text;
    razorpayOrderId : ?Text;
    razorpayPaymentId : ?Text;
    razorpaySignature : ?Text;
    paymentProvider : Text;
    paymentTimestamp : ?Nat;
  };

  public type BookingInput = {
    itemType : Text;
    itemId : Nat;
    itemName : Text;
    batchDate : Common.Timestamp;
    groupSize : Nat;
    totalAmount : Nat;
    advanceAmount : Nat;
    travelerName : Text;
    email : Text;
    phone : Text;
  };
};
