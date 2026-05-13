import { useState } from "react";
import { toast } from "sonner";

const PROMOS = [
  {
    id: 1,
    code: "TREK10",
    discount: "10%",
    type: "percentage",
    uses: 45,
    maxUses: 100,
    expiry: "2025-06-30",
    active: true,
  },
  {
    id: 2,
    code: "SUMMER500",
    discount: "₹500",
    type: "flat",
    uses: 23,
    maxUses: 50,
    expiry: "2025-07-31",
    active: true,
  },
  {
    id: 3,
    code: "FIRST20",
    discount: "20%",
    type: "percentage",
    uses: 89,
    maxUses: 100,
    expiry: "2025-05-31",
    active: false,
  },
];

export default function AdminPromosPage() {
  const [promos, setPromos] = useState(PROMOS);

  function togglePromo(id: number) {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    );
    toast.success("Promo status updated");
  }

  return (
    <div className="space-y-6" data-ocid="admin.promos.page">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Promo Codes
          </h2>
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            {promos.filter((p) => p.active).length} active · {promos.length}{" "}
            total
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          data-ocid="admin.promos.add_button"
        >
          + Create Promo
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead style={{ background: "var(--ew-gray-lt)" }}>
            <tr>
              {[
                "Code",
                "Discount",
                "Type",
                "Usage",
                "Expiry",
                "Status",
                "Actions",
              ].map((h, ci) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-left font-medium ${ci === 3 || ci === 5 || ci === 6 ? "text-center" : ""}`}
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className="divide-y"
            style={{ borderColor: "var(--ew-gray-lt)" }}
          >
            {promos.map((promo, i) => (
              <tr
                key={promo.id}
                className="transition-colors"
                style={{ background: "transparent" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--ew-gray-lt)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
                data-ocid={`admin.promo.row.${i + 1}`}
              >
                <td
                  className="px-4 py-3 font-mono font-bold"
                  style={{ color: "var(--ew-text)" }}
                >
                  {promo.code}
                </td>
                <td
                  className="px-4 py-3 font-semibold"
                  style={{ color: "var(--ew-orange)" }}
                >
                  {promo.discount} off
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={
                      promo.type === "percentage"
                        ? {
                            background: "var(--ew-orange-lt)",
                            color: "var(--ew-orange)",
                          }
                        : { background: "#e8f5e9", color: "var(--ew-green)" }
                    }
                  >
                    {promo.type === "percentage" ? "%" : "₹"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span style={{ color: "var(--ew-text-lt)" }}>
                    {promo.uses}/{promo.maxUses}
                  </span>
                  <div
                    className="w-full rounded-full h-1.5 mt-1"
                    style={{ background: "var(--ew-gray-mid)" }}
                  >
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${(promo.uses / promo.maxUses) * 100}%`,
                        background: "var(--ew-orange)",
                      }}
                    />
                  </div>
                </td>
                <td
                  className="px-4 py-3"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {promo.expiry}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => togglePromo(promo.id)}
                    className="text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer transition-colors"
                    style={
                      promo.active
                        ? {
                            background: "rgba(46,125,50,0.1)",
                            color: "var(--ew-green)",
                          }
                        : {
                            background: "var(--ew-gray-lt)",
                            color: "var(--ew-gray-dark)",
                          }
                    }
                    data-ocid={`admin.promo.toggle_button.${i + 1}`}
                  >
                    {promo.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => togglePromo(promo.id)}
                    className="text-xs font-semibold px-3 py-1 rounded-lg border transition-colors"
                    style={{
                      borderColor: promo.active
                        ? "var(--ew-red)"
                        : "var(--ew-green)",
                      color: promo.active ? "var(--ew-red)" : "var(--ew-green)",
                    }}
                    data-ocid={`admin.promo.action_button.${i + 1}`}
                  >
                    {promo.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
