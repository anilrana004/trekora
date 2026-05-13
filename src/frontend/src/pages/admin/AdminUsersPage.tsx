const USERS = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    bookings: 3,
    joined: "Jan 2024",
    city: "Delhi",
    role: "user",
  },
  {
    id: 2,
    name: "Priya Negi",
    email: "priya@gmail.com",
    phone: "9898989898",
    bookings: 1,
    joined: "Mar 2024",
    city: "Mumbai",
    role: "user",
  },
  {
    id: 3,
    name: "Vikram Singh",
    email: "vikram@yahoo.com",
    phone: "9765432109",
    bookings: 5,
    joined: "Dec 2023",
    city: "Bangalore",
    role: "admin",
  },
  {
    id: 4,
    name: "Anita Rawat",
    email: "anita@hotmail.com",
    phone: "9654321098",
    bookings: 2,
    joined: "Feb 2024",
    city: "Jaipur",
    role: "user",
  },
  {
    id: 5,
    name: "Sunita Mehta",
    email: "sunita@corp.in",
    phone: "9543210987",
    bookings: 4,
    joined: "Nov 2023",
    city: "Pune",
    role: "user",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6" data-ocid="admin.users.page">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            User Manager
          </h2>
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            {USERS.length} registered users
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead style={{ background: "var(--ew-gray-lt)" }}>
            <tr>
              {[
                "Name",
                "Email",
                "City",
                "Bookings",
                "Role",
                "Joined",
                "Actions",
              ].map((h, ci) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-left font-medium ${ci === 3 ? "text-center" : ""} ${ci === 4 ? "text-center" : ""} ${ci === 6 ? "text-center" : ""}`}
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
            {USERS.map((user, i) => (
              <tr
                key={user.id}
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
                data-ocid={`admin.user.row.${i + 1}`}
              >
                <td
                  className="px-4 py-3 font-semibold"
                  style={{ color: "var(--ew-text)" }}
                >
                  {user.name}
                </td>
                <td
                  className="px-4 py-3"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {user.email}
                </td>
                <td
                  className="px-4 py-3"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {user.city}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--ew-orange-lt)",
                      color: "var(--ew-orange)",
                    }}
                  >
                    {user.bookings}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={
                      user.role === "admin"
                        ? {
                            background: "var(--ew-red-lt)",
                            color: "var(--ew-red)",
                          }
                        : {
                            background: "var(--ew-gray-lt)",
                            color: "var(--ew-gray-dark)",
                          }
                    }
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>
                <td
                  className="px-4 py-3"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {user.joined}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    className="text-xs font-semibold hover:underline transition-colors"
                    style={{ color: "var(--ew-orange)" }}
                    data-ocid={`admin.user.view_button.${i + 1}`}
                  >
                    View History
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
