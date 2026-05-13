import { j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
const USERS = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    bookings: 3,
    joined: "Jan 2024",
    city: "Delhi",
    role: "user"
  },
  {
    id: 2,
    name: "Priya Negi",
    email: "priya@gmail.com",
    phone: "9898989898",
    bookings: 1,
    joined: "Mar 2024",
    city: "Mumbai",
    role: "user"
  },
  {
    id: 3,
    name: "Vikram Singh",
    email: "vikram@yahoo.com",
    phone: "9765432109",
    bookings: 5,
    joined: "Dec 2023",
    city: "Bangalore",
    role: "admin"
  },
  {
    id: 4,
    name: "Anita Rawat",
    email: "anita@hotmail.com",
    phone: "9654321098",
    bookings: 2,
    joined: "Feb 2024",
    city: "Jaipur",
    role: "user"
  },
  {
    id: 5,
    name: "Sunita Mehta",
    email: "sunita@corp.in",
    phone: "9543210987",
    bookings: 4,
    joined: "Nov 2023",
    city: "Pune",
    role: "user"
  }
];
function AdminUsersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.users.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "text-2xl font-bold",
          style: { color: "var(--ew-text)" },
          children: "User Manager"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
        USERS.length,
        " registered users"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "Name",
        "Email",
        "City",
        "Bookings",
        "Role",
        "Joined",
        "Actions"
      ].map((h, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: `px-4 py-3 text-left font-medium ${ci === 3 ? "text-center" : ""} ${ci === 4 ? "text-center" : ""} ${ci === 6 ? "text-center" : ""}`,
          style: { color: "var(--ew-text-lt)" },
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "tbody",
        {
          className: "divide-y",
          style: { borderColor: "var(--ew-gray-lt)" },
          children: USERS.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "transition-colors",
              style: { background: "transparent" },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "var(--ew-gray-lt)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "transparent";
              },
              "data-ocid": `admin.user.row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3 font-semibold",
                    style: { color: "var(--ew-text)" },
                    children: user.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3",
                    style: { color: "var(--ew-text-lt)" },
                    children: user.email
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3",
                    style: { color: "var(--ew-gray-dark)" },
                    children: user.city
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                    style: {
                      background: "var(--ew-orange-lt)",
                      color: "var(--ew-orange)"
                    },
                    children: user.bookings
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                    style: user.role === "admin" ? {
                      background: "var(--ew-red-lt)",
                      color: "var(--ew-red)"
                    } : {
                      background: "var(--ew-gray-lt)",
                      color: "var(--ew-gray-dark)"
                    },
                    children: user.role === "admin" ? "Admin" : "User"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3",
                    style: { color: "var(--ew-gray-dark)" },
                    children: user.joined
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-xs font-semibold hover:underline transition-colors",
                    style: { color: "var(--ew-orange)" },
                    "data-ocid": `admin.user.view_button.${i + 1}`,
                    children: "View History"
                  }
                ) })
              ]
            },
            user.id
          ))
        }
      )
    ] }) })
  ] });
}
export {
  AdminUsersPage as default
};
