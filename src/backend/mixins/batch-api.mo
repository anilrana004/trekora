import List "mo:core/List";
import Common "../types/common";
import BatchTypes "../types/batch";
import BatchLib "../lib/batch";

mixin (
  batches : List.List<BatchLib.TrekBatch>,
  batchCounter : Common.Counter,
) {
  // ── Public queries ──────────────────────────────────────────────────────────

  public query func getTrekBatches(trekId : Nat) : async [BatchLib.TrekBatchPublic] {
    BatchLib.getBatchesByTrek(batches, trekId)
  };

  public query func getBatchById(id : Nat) : async ?BatchLib.TrekBatchPublic {
    BatchLib.getBatchById(batches, id)
  };

  public query func getAllBatches() : async [BatchLib.TrekBatchPublic] {
    BatchLib.getAllBatches(batches)
  };

  // ── Admin update functions ──────────────────────────────────────────────────

  public func createBatch(
    trekId : Nat,
    batchDate : Common.Timestamp,
    totalSlots : Nat,
    priceOverride : ?Nat,
  ) : async Common.Result<BatchLib.TrekBatchPublic, Text> {
    let input : BatchTypes.BatchInput = {
      trekId;
      batchDate;
      totalSlots;
      priceOverride;
    };
    let batch = BatchLib.createBatch(batches, batchCounter, input);
    #ok(BatchLib.toPublic(batch))
  };

  public func updateBatch(
    id : Nat,
    availableSlots : ?Nat,
    isActive : ?Bool,
  ) : async Common.Result<BatchLib.TrekBatchPublic, Text> {
    let updates : BatchTypes.BatchUpdateInput = {
      batchDate = null;
      totalSlots = null;
      availableSlots;
      priceOverride = null;
      isActive;
    };
    BatchLib.updateBatch(batches, id, updates)
  };

  public func deleteBatch(id : Nat) : async Common.Result<(), Text> {
    BatchLib.deleteBatch(batches, id)
  };
};
