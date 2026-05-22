// Dormant features — set to `true` and redeploy canister to revive.
// Keep in sync with trekora/src/.env (VITE_ENABLE_*).
module {
  public let emiEnabled : Bool = false;
  public let loginEnabled : Bool = false;
  public let paymentEnabled : Bool = false;

  public func loginDisabledMessage() : Text {
    "Login is temporarily disabled"
  };

  public func paymentDisabledMessage() : Text {
    "Payment gateway is temporarily disabled"
  };
};
