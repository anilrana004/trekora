import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { TrekInput } from "../../backend.d.ts";
import TrekFormModal from "../../components/admin/TrekFormModal";
import { Skeleton } from "../../components/ui/skeleton";
import { useAdminTreks } from "../../hooks/useAdminTreks";
import { type BackendTrek, useTreks } from "../../hooks/useTreks";

const DIFFICULTIES = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Difficult",
  "Difficult-Extreme",
  "Extreme",
] as const;

const PAGE_SIZE = 10;

type ModalState =
  | { mode: "closed" }
  | { mode: "create"; prefill?: Partial<TrekInput> }
  | { mode: "edit"; trek: BackendTrek };

export default function AdminTreksPage() {
  const { data: treks = [], isLoading } = useTreks();
  const { createTrek, updateTrek, deleteTrek } = useAdminTreks();

  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const [deleteTarget, setDeleteTarget] = useState<BackendTrek | null>(null);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return treks.filter((t) => {
      const matchSearch =
        !search || t.name.toLowerCase().includes(search.toLowerCase());
      const matchState = stateFilter === "all" || t.state === stateFilter;
      const matchDiff = diffFilter === "all" || t.difficulty === diffFilter;
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && t.isActive) ||
        (statusFilter === "inactive" && !t.isActive);
      return matchSearch && matchState && matchDiff && matchStatus;
    });
  }, [treks, search, stateFilter, diffFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allPageSelected =
    paginated.length > 0 && paginated.every((t) => selected.has(String(t.id)));

  function toggleSelect(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleSelectAll() {
    if (allPageSelected) {
      setSelected((s) => {
        const next = new Set(s);
        for (const t of paginated) next.delete(String(t.id));
        return next;
      });
    } else {
      setSelected((s) => {
        const next = new Set(s);
        for (const t of paginated) next.add(String(t.id));
        return next;
      });
    }
  }

  function openEdit(trek: BackendTrek) {
    setModal({ mode: "edit", trek });
  }
  function openDuplicate(trek: BackendTrek) {
    setModal({
      mode: "create",
      prefill: {
        name: `${trek.name} (Copy)`,
        slug: `${trek.slug}-copy`,
        state: trek.state,
        duration: trek.duration,
        altitude: trek.altitude,
        difficulty: trek.difficulty,
        price: trek.price,
        distance: trek.distance,
        startPoint: trek.startPoint,
        endPoint: trek.endPoint,
        category: trek.category,
        bestSeason: trek.bestSeason,
        description: trek.description,
        image: trek.image,
        images: [...trek.images],
        trekType: trek.trekType,
        isActive: false,
        isFeatured: false,
        rating: trek.rating,
        reviewCount: trek.reviewCount,
      },
    });
  }

  function handleSubmit(input: TrekInput) {
    if (modal.mode === "create") {
      createTrek.mutate(input, {
        onSuccess: () => {
          toast.success("Trek created!");
          setModal({ mode: "closed" });
        },
        onError: (err) => toast.error(err.message),
      });
    } else if (modal.mode === "edit") {
      updateTrek.mutate(
        { id: modal.trek.id, input },
        {
          onSuccess: () => {
            toast.success("Trek updated!");
            setModal({ mode: "closed" });
          },
          onError: (err) => toast.error(err.message),
        },
      );
    }
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteTrek.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Trek deleted");
        setDeleteTarget(null);
      },
      onError: (err) => {
        toast.error(err.message);
        setDeleteTarget(null);
      },
    });
  }

  async function bulkActivate(active: boolean) {
    const ids = [...selected].map(BigInt);
    await Promise.all(
      ids.map((id) => {
        const trek = treks.find((t) => t.id === id);
        if (!trek) return Promise.resolve();
        const input: TrekInput = {
          name: trek.name,
          slug: trek.slug,
          state: trek.state,
          duration: trek.duration,
          altitude: trek.altitude,
          difficulty: trek.difficulty,
          price: trek.price,
          distance: trek.distance,
          startPoint: trek.startPoint,
          endPoint: trek.endPoint,
          category: trek.category,
          bestSeason: trek.bestSeason,
          description: trek.description,
          image: trek.image,
          images: [...trek.images],
          trekType: trek.trekType,
          isActive: active,
          isFeatured: trek.isFeatured,
          rating: trek.rating,
          reviewCount: trek.reviewCount,
        };
        return updateTrek.mutateAsync({ id: trek.id, input });
      }),
    );
    toast.success(
      `${selected.size} treks ${active ? "activated" : "deactivated"}`,
    );
    setSelected(new Set());
  }

  async function bulkDelete() {
    const ids = [...selected].map(BigInt);
    await Promise.all(ids.map((id) => deleteTrek.mutateAsync(id)));
    toast.success(`${selected.size} treks deleted`);
    setSelected(new Set());
  }

  const isPending = createTrek.isPending || updateTrek.isPending;

  const selectCls =
    "px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white";
  const selectStyle = {
    border: "1px solid var(--ew-gray-mid)",
    color: "var(--ew-text)",
  };

  return (
    <div className="space-y-5" data-ocid="admin.treks.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Trek Manager
          </h2>
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            {filtered.length} of {treks.length} treks
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModal({ mode: "create" })}
          className="btn-primary"
          data-ocid="admin.treks.add_button"
        >
          + Add New Trek
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-card flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search trek name…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className={`flex-1 min-w-[180px] ${selectCls}`}
          style={selectStyle}
          data-ocid="admin.treks.search_input"
        />
        <select
          value={stateFilter}
          onChange={(e) => {
            setStateFilter(e.target.value);
            setPage(1);
          }}
          className={selectCls}
          style={selectStyle}
          data-ocid="admin.treks.state.select"
        >
          <option value="all">All States</option>
          <option value="uttarakhand">Uttarakhand</option>
          <option value="himachal">Himachal Pradesh</option>
        </select>
        <select
          value={diffFilter}
          onChange={(e) => {
            setDiffFilter(e.target.value);
            setPage(1);
          }}
          className={selectCls}
          style={selectStyle}
          data-ocid="admin.treks.difficulty.select"
        >
          <option value="all">All Difficulties</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className={selectCls}
          style={selectStyle}
          data-ocid="admin.treks.status.select"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Bulk bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl px-4 py-3 flex items-center gap-3 flex-wrap"
            style={{ background: "var(--ew-footer)" }}
            data-ocid="admin.treks.bulk_bar"
          >
            <span className="text-sm font-semibold text-white">
              {selected.size} selected
            </span>
            <button
              type="button"
              onClick={() => void bulkActivate(true)}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white transition-colors"
              style={{ background: "var(--ew-green)" }}
              data-ocid="admin.treks.bulk_activate_button"
            >
              Activate
            </button>
            <button
              type="button"
              onClick={() => void bulkActivate(false)}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors"
              style={{ background: "var(--ew-gray-dark)", color: "white" }}
              data-ocid="admin.treks.bulk_deactivate_button"
            >
              Deactivate
            </button>
            <button
              type="button"
              onClick={() => void bulkDelete()}
              className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white transition-colors"
              style={{ background: "var(--ew-red)" }}
              data-ocid="admin.treks.bulk_delete_button"
            >
              Delete Selected
            </button>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="ml-auto text-xs transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
              data-ocid="admin.treks.bulk_clear_button"
            >
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: "var(--ew-gray-lt)" }}>
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                    style={{ accentColor: "var(--ew-orange)" }}
                    data-ocid="admin.treks.select_all.checkbox"
                    aria-label="Select all"
                  />
                </th>
                {[
                  "Trek Name",
                  "State",
                  "Difficulty",
                  "Price",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left font-medium ${h === "Price" ? "text-right" : ""} ${h === "Status" || h === "Actions" ? "text-center" : ""}`}
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                ["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                  <tr
                    key={sk}
                    style={{ borderBottom: "1px solid var(--ew-gray-lt)" }}
                  >
                    <td className="px-4 py-3" colSpan={7}>
                      <Skeleton className="h-5 w-full" />
                    </td>
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center"
                    style={{ color: "var(--ew-gray-dark)" }}
                    data-ocid="admin.treks.empty_state"
                  >
                    No treks found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((trek, i) => {
                  const rowIdx = (page - 1) * PAGE_SIZE + i + 1;
                  const isSelected = selected.has(String(trek.id));
                  return (
                    <tr
                      key={String(trek.id)}
                      className="transition-colors"
                      style={{
                        background: isSelected
                          ? "var(--ew-orange-lt)"
                          : "white",
                        borderBottom: "1px solid var(--ew-gray-lt)",
                      }}
                      data-ocid={`admin.trek.row.${rowIdx}`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(String(trek.id))}
                          className="rounded border-gray-300"
                          style={{ accentColor: "var(--ew-orange)" }}
                          aria-label={`Select ${trek.name}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={trek.image}
                            alt={trek.name}
                            className="w-8 h-8 rounded-lg object-cover hidden sm:block"
                          />
                          <div>
                            <p
                              className="font-semibold truncate max-w-[180px]"
                              style={{ color: "var(--ew-text)" }}
                            >
                              {trek.name}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "var(--ew-gray-dark)" }}
                            >
                              {String(trek.duration)}d · {String(trek.altitude)}
                              m
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-4 py-3 capitalize"
                        style={{ color: "var(--ew-text-lt)" }}
                      >
                        {trek.state === "himachal" ? "Himachal" : "Uttarakhand"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLORS[trek.difficulty] ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {trek.difficulty}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 text-right font-semibold"
                        style={{ color: "var(--ew-orange)" }}
                      >
                        ₹{Number(trek.price).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={
                            trek.isActive
                              ? {
                                  background: "rgba(46,125,50,0.1)",
                                  color: "var(--ew-green)",
                                }
                              : {
                                  background: "var(--ew-gray-lt)",
                                  color: "var(--ew-gray-dark)",
                                }
                          }
                        >
                          {trek.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() => openEdit(trek)}
                            className="text-xs font-semibold transition-colors px-2 py-1 rounded"
                            style={{
                              color: "var(--ew-orange)",
                              background: "var(--ew-orange-lt)",
                            }}
                            data-ocid={`admin.trek.edit_button.${rowIdx}`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => openDuplicate(trek)}
                            className="text-xs font-medium transition-colors"
                            style={{ color: "var(--ew-gray-dark)" }}
                            data-ocid={`admin.trek.duplicate_button.${rowIdx}`}
                          >
                            Dup
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(trek)}
                            className="text-xs font-semibold transition-colors px-2 py-1 rounded"
                            style={{
                              color: "var(--ew-red)",
                              background: "var(--ew-red-lt)",
                            }}
                            data-ocid={`admin.trek.delete_button.${rowIdx}`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && filtered.length > PAGE_SIZE && (
          <div
            className="px-4 py-3 flex items-center justify-between text-sm"
            style={{ borderTop: "1px solid var(--ew-gray-lt)" }}
          >
            <span style={{ color: "var(--ew-gray-dark)" }}>
              Page {page} of {totalPages} · {filtered.length} results
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors"
                style={{
                  border: "1px solid var(--ew-gray-mid)",
                  color: "var(--ew-text)",
                }}
                data-ocid="admin.treks.pagination_prev"
              >
                ← Prev
              </button>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors"
                style={{
                  border: "1px solid var(--ew-gray-mid)",
                  color: "var(--ew-text)",
                }}
                data-ocid="admin.treks.pagination_next"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      <TrekFormModal
        open={modal.mode !== "closed"}
        trek={modal.mode === "edit" ? modal.trek : null}
        onClose={() => setModal({ mode: "closed" })}
        onSubmit={handleSubmit}
        isPending={isPending}
      />

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            data-ocid="admin.trek.delete.dialog"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-elevated"
            >
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "var(--ew-text)" }}
              >
                Delete Trek
              </h3>
              <p
                className="text-sm mb-5"
                style={{ color: "var(--ew-text-lt)" }}
              >
                Are you sure you want to delete{" "}
                <strong>{deleteTarget.name}</strong>? This cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="btn-secondary"
                  style={{ borderRadius: "8px" }}
                  data-ocid="admin.trek.delete.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleteTrek.isPending}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-60 transition-colors"
                  style={{ background: "var(--ew-red)" }}
                  data-ocid="admin.trek.delete.confirm_button"
                >
                  {deleteTrek.isPending ? "Deleting…" : "Delete Trek"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DIFF_COLORS: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  "Easy-Moderate": "bg-lime-100 text-lime-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  "Moderate-Difficult": "bg-orange-100 text-orange-700",
  Difficult: "bg-red-100 text-red-700",
  "Difficult-Extreme": "bg-purple-100 text-purple-700",
  Extreme: "bg-purple-200 text-purple-800",
};
