import { j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { H as House, w as ChevronRight } from "./icons-DrFRvHmE.js";
function BreadcrumbNav({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://eternawings.com"
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.label,
        ...item.href ? { item: `https://eternawings.com${item.href}` } : {}
      }))
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(schema) }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        "aria-label": "Breadcrumb",
        className: "flex items-center flex-wrap gap-1 py-2.5 px-0 text-xs",
        style: { color: "var(--ew-gray-dark)" },
        "data-ocid": "breadcrumb.nav",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "flex items-center gap-1 hover:text-[color:var(--ew-red)] transition-colors",
              style: { textDecoration: "none", color: "var(--ew-text-lt)" },
              "data-ocid": "breadcrumb.home_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 11, "aria-hidden": "true" }),
                "Home"
              ]
            }
          ),
          items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 11, "aria-hidden": "true" }),
              isLast || !item.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-medium",
                  style: {
                    color: isLast ? "var(--ew-red)" : "var(--ew-text-lt)"
                  },
                  "aria-current": isLast ? "page" : void 0,
                  children: item.label
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: item.href,
                  className: "hover:text-[color:var(--ew-red)] transition-colors",
                  style: { textDecoration: "none", color: "var(--ew-text-lt)" },
                  children: item.label
                }
              )
            ] }, item.label);
          })
        ]
      }
    )
  ] });
}
export {
  BreadcrumbNav as B
};
