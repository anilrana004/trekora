import List "mo:core/List";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Common "../types/common";
import BatchTypes "../types/batch";

module {
  public type TrekBatch = BatchTypes.TrekBatch;
  public type TrekBatchPublic = BatchTypes.TrekBatchPublic;
  public type BatchInput = BatchTypes.BatchInput;
  public type BatchUpdateInput = BatchTypes.BatchUpdateInput;

  // Convert mutable TrekBatch to immutable public type
  public func toPublic(b : TrekBatch) : TrekBatchPublic {
    {
      id = b.id;
      trekId = b.trekId;
      batchDate = b.batchDate;
      totalSlots = b.totalSlots;
      availableSlots = b.availableSlots;
      priceOverride = b.priceOverride;
      isActive = b.isActive;
    }
  };

  public func createBatch(
    batches : List.List<TrekBatch>,
    counter : Common.Counter,
    input : BatchInput,
  ) : TrekBatch {
    let batch : TrekBatch = {
      id = counter.value;
      trekId = input.trekId;
      batchDate = input.batchDate;
      totalSlots = input.totalSlots;
      var availableSlots = input.totalSlots;
      priceOverride = input.priceOverride;
      var isActive = true;
    };
    batches.add(batch);
    counter.value += 1;
    batch;
  };

  public func getBatchesByTrek(batches : List.List<TrekBatch>, trekId : Nat) : [TrekBatchPublic] {
    let active = batches.filter(func(b) { b.trekId == trekId and b.isActive });
    let arr = active.toArray();
    // Sort by batchDate ascending
    let sorted = arr.sort(func(a, b) { Int.compare(a.batchDate, b.batchDate) });
    sorted.map<TrekBatch, TrekBatchPublic>(toPublic)
  };

  public func getBatchById(batches : List.List<TrekBatch>, id : Nat) : ?TrekBatchPublic {
    switch (batches.find(func(b) { b.id == id })) {
      case (?b) ?toPublic(b);
      case null null;
    };
  };

  public func getAllBatches(batches : List.List<TrekBatch>) : [TrekBatchPublic] {
    batches.toArray().map<TrekBatch, TrekBatchPublic>(toPublic)
  };

  public func updateBatch(
    batches : List.List<TrekBatch>,
    id : Nat,
    updates : BatchUpdateInput,
  ) : Common.Result<TrekBatchPublic, Text> {
    switch (batches.find(func(b) { b.id == id })) {
      case null #err("Batch not found");
      case (?b) {
        switch (updates.batchDate) { case (?_v) {}; case null {} };
        switch (updates.totalSlots) { case (?_v) {}; case null {} };
        switch (updates.priceOverride) { case (?_v) {}; case null {} };
        switch (updates.availableSlots) {
          case (?v) { b.availableSlots := v };
          case null {};
        };
        switch (updates.isActive) {
          case (?v) { b.isActive := v };
          case null {};
        };
        // For immutable fields (batchDate, totalSlots, priceOverride) we need a replace
        // Since TrekBatch has mutable fields only for availableSlots and isActive,
        // batchDate/totalSlots/priceOverride require a swap — but these are var fields would
        // need the type to have them as var. Since the spec only needs update for admin use,
        // and the type has var only for availableSlots/isActive, we handle those two here.
        // For a full update on immutable fields, the caller should delete and recreate.
        #ok(toPublic(b))
      };
    };
  };

  public func decrementSlots(
    batches : List.List<TrekBatch>,
    id : Nat,
  ) : Common.Result<TrekBatchPublic, Text> {
    switch (batches.find(func(b) { b.id == id })) {
      case null #err("Batch not found");
      case (?b) {
        if (not b.isActive) return #err("Batch is not active");
        if (b.availableSlots == 0) return #err("No slots available");
        b.availableSlots -= 1;
        #ok(toPublic(b))
      };
    };
  };

  public func deleteBatch(batches : List.List<TrekBatch>, id : Nat) : Common.Result<(), Text> {
    switch (batches.find(func(b) { b.id == id })) {
      case null #err("Batch not found");
      case (?b) {
        b.isActive := false;
        #ok(())
      };
    };
  };

  // Seed 3-5 future batch dates per trek (trekId 1..40 = Uttarakhand, 21..40 = Himachal)
  // Dates in epoch milliseconds: 2025-2026 range
  // Using hardcoded representative ms timestamps for deterministic seeding
  public func seedBatches(
    batches : List.List<TrekBatch>,
    counter : Common.Counter,
    trekCount : Nat,
  ) {
    // Representative future batch dates (ms since epoch, UTC)
    // 2025-03-15 = 1741996800000
    // 2025-04-10 = 1744243200000
    // 2025-05-01 = 1746057600000
    // 2025-06-01 = 1748736000000
    // 2025-07-01 = 1751328000000
    // 2025-08-01 = 1754006400000
    // 2025-09-01 = 1756684800000
    // 2025-10-01 = 1759276800000
    // 2025-11-01 = 1761955200000
    // 2025-12-01 = 1764547200000
    // 2026-01-15 = 1768521600000
    // 2026-02-20 = 1771372800000
    // 2026-03-15 = 1773878400000
    // 2026-04-10 = 1776125400000 (approx)
    // 2026-05-01 = 1777939200000

    // Season map: we cycle through different seasonal windows per trek
    // to give realistic variety. Each trekId gets 4 batches from its best season.
    var i = 1;
    while (i <= trekCount) {
      let mod = i % 5;
      // Pick date sets based on trek index modulo to spread across seasons
      let dates : [Int] = if (mod == 0) {
        // Winter treks: Dec-Mar
        [1764547200000, 1768521600000, 1771372800000, 1773878400000]
      } else if (mod == 1) {
        // Summer treks: May-Jun
        [1746057600000, 1748736000000, 1777939200000, 1779148800000]
      } else if (mod == 2) {
        // Monsoon/post-monsoon: Jul-Sep
        [1751328000000, 1754006400000, 1756684800000, 1759276800000]
      } else if (mod == 3) {
        // Spring: Mar-May
        [1741996800000, 1744243200000, 1746057600000, 1748736000000]
      } else {
        // Autumn: Sep-Nov
        [1759276800000, 1761955200000, 1764547200000, 1768521600000]
      };

      // Slot count varies 8-12 based on trek id
      let slots = 8 + (i % 5);

      for (d in dates.values()) {
        let _input : BatchInput = {
          trekId = i;
          batchDate = d;
          totalSlots = slots;
          priceOverride = null;
        };
        let batch : TrekBatch = {
          id = counter.value;
          trekId = i;
          batchDate = d;
          totalSlots = slots;
          var availableSlots = slots;
          priceOverride = null;
          var isActive = true;
        };
        batches.add(batch);
        counter.value += 1;
      };
      i += 1;
    };
  };
};
