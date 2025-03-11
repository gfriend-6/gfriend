import { c as create_ssr_component, a as compute_rest_props, g as getContext, b as spread, e as escape, d as escape_attribute_value, f as escape_object, h as add_attribute, i as subscribe, s as setContext, v as validate_component } from "../../chunks/ssr.js";
/* empty css               */
import { F as Frame, i as is_void } from "../../chunks/Frame.js";
import { twMerge } from "tailwind-merge";
import { w as writable } from "../../chunks/exports.js";
import { p as page } from "../../chunks/stores.js";
function sineIn(t) {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;
  else return 1 - v;
}
const ToolbarButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "name", "ariaLabel", "size", "href"]);
  let { color = "default" } = $$props;
  let { name = void 0 } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { size = "md" } = $$props;
  let { href = void 0 } = $$props;
  const background = getContext("background");
  const colors = {
    dark: "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
    gray: "text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",
    red: "text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",
    yellow: "text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",
    green: "text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",
    indigo: "text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",
    purple: "text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",
    pink: "text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",
    blue: "text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",
    primary: "text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",
    default: "focus:ring-gray-400 hover:bg-gray-100"
  };
  const sizing = {
    xs: "m-0.5 rounded-sm focus:ring-1 p-0.5",
    sm: "m-0.5 rounded focus:ring-1 p-0.5",
    md: "m-0.5 rounded-lg focus:ring-2 p-1.5",
    lg: "m-0.5 rounded-lg focus:ring-2 p-2.5"
  };
  let buttonClass;
  const svgSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-5 h-5"
  };
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  buttonClass = twMerge(
    "focus:outline-none whitespace-normal",
    sizing[size],
    colors[color],
    color === "default" && (background ? "dark:hover:bg-gray-600" : "dark:hover:bg-gray-700"),
    $$props.class
  );
  return `${href ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      {
        "aria-label": escape_attribute_value(ariaLabel ?? name)
      }
    ],
    {}
  )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</a>` : `<button${spread(
    [
      { type: "button" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      {
        "aria-label": escape_attribute_value(ariaLabel ?? name)
      }
    ],
    {}
  )}>${name ? `<span class="sr-only">${escape(name)}</span>` : ``} ${slots.default ? slots.default({ svgSize: svgSizes[size] }) : ``}</button>`} `;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["footerType"]);
  let { footerType = void 0 } = $$props;
  let footerClass = twMerge(footerType === "sitemap" && "bg-gray-800", footerType === "socialmedia" && "p-4 bg-white sm:p-6 dark:bg-gray-800", footerType === "logo" && "p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800", footerType === "default" && "p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800", $$props.class);
  if ($$props.footerType === void 0 && $$bindings.footerType && footerType !== void 0) $$bindings.footerType(footerType);
  return `<footer${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(footerClass)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</footer> `;
});
const FooterLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["liClass", "aClass", "href", "target"]);
  let { liClass = "me-4 last:me-0 md:me-6" } = $$props;
  let { aClass = "hover:underline" } = $$props;
  let { href = "" } = $$props;
  let { target = void 0 } = $$props;
  let liCls = twMerge(liClass, $$props.classLi);
  let aCls = twMerge(aClass, $$props.classA);
  if ($$props.liClass === void 0 && $$bindings.liClass && liClass !== void 0) $$bindings.liClass(liClass);
  if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0) $$bindings.aClass(aClass);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  return `<li${add_attribute("class", liCls, 0)}><a${spread(
    [
      escape_object($$restProps),
      { href: escape_attribute_value(href) },
      { class: escape_attribute_value(aCls) },
      { target: escape_attribute_value(target) }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a></li> `;
});
const FooterLinkGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ulClass"]);
  let { ulClass = "text-gray-600 dark:text-gray-400" } = $$props;
  if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0) $$bindings.ulClass(ulClass);
  return `<ul${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(ulClass, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</ul> `;
});
const NavContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["fluid"]);
  let { fluid = false } = $$props;
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0) $$bindings.fluid(fluid);
  return `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("mx-auto flex flex-wrap justify-between items-center ", fluid ? "w-full" : "container", $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div> `;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["fluid"]);
  let $hidden, $$unsubscribe_hidden;
  let { fluid = false } = $$props;
  let hidden = writable(true);
  $$unsubscribe_hidden = subscribe(hidden, (value) => $hidden = value);
  setContext("navHidden", hidden);
  let toggle = () => hidden.update((hidden2) => !hidden2);
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0) $$bindings.fluid(fluid);
  {
    {
      $$restProps.color = $$restProps.color ?? "navbar";
    }
  }
  $$unsubscribe_hidden();
  return `${validate_component(Frame, "Frame").$$render(
    $$result,
    Object.assign({}, { tag: "nav" }, $$restProps, {
      class: twMerge("px-2 sm:px-4 py-2.5 w-full", $$props.class)
    }),
    {},
    {
      default: () => {
        return `${validate_component(NavContainer, "NavContainer").$$render($$result, { fluid }, {}, {
          default: () => {
            return `${slots.default ? slots.default({ hidden: $hidden, toggle, NavContainer }) : ``}`;
          }
        })}`;
      }
    }
  )} `;
});
const NavBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href"]);
  let { href = "" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  return `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("flex items-center", $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a> `;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
  let { size = "24" } = $$props;
  let { color = "currentColor" } = $$props;
  let { variation = "outline" } = $$props;
  let { ariaLabel = "bars 3" } = $$props;
  let viewBox;
  let svgpath;
  let svgoutline = `<path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> `;
  let svgsolid = `<path fill="${color}" clip-rule="evenodd" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path> `;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0) $$bindings.variation(variation);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    switch (variation) {
      case "outline":
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
        break;
      case "solid":
        svgpath = svgsolid;
        viewBox = "0 0 24 24";
        break;
      default:
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
    }
  }
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { role: "button" },
      { tabindex: "0" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value($$props.class)
      },
      escape_object($$restProps),
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { fill: "none" },
      { viewBox: escape_attribute_value(viewBox) },
      { "stroke-width": "2" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg> `;
});
let btnClass = "ms-3 md:hidden";
const NavHamburger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["menuClass", "onClick"]);
  let { menuClass = "h-6 w-6 shrink-0" } = $$props;
  let { onClick = void 0 } = $$props;
  getContext("navHidden") ?? writable(true);
  if ($$props.menuClass === void 0 && $$bindings.menuClass && menuClass !== void 0) $$bindings.menuClass(menuClass);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name: "Open main menu" }, $$restProps, { class: twMerge(btnClass, $$props.class) }), {}, {
    default: () => {
      return `${validate_component(Menu, "Menu").$$render(
        $$result,
        {
          class: twMerge(menuClass, $$props.classMenu)
        },
        {},
        {}
      )}`;
    }
  })} `;
});
const NavLi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let liClass;
  let $$restProps = compute_rest_props($$props, ["href", "activeClass", "nonActiveClass"]);
  let { href = "" } = $$props;
  let { activeClass = void 0 } = $$props;
  let { nonActiveClass = void 0 } = $$props;
  const context = getContext("navbarContext") ?? {};
  const activeUrlStore = getContext("activeUrl");
  let navUrl = "";
  activeUrlStore.subscribe((value) => {
    navUrl = value;
  });
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0) $$bindings.nonActiveClass(nonActiveClass);
  active = navUrl ? href === navUrl : false;
  liClass = twMerge(
    "block py-2 pe-4 ps-3 md:p-0 rounded md:border-0",
    active ? activeClass ?? context.activeClass : nonActiveClass ?? context.nonActiveClass,
    $$props.class
  );
  return `<li>${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        {
          role: escape_attribute_value(href ? void 0 : "link")
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps),
        { class: escape_attribute_value(liClass) }
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}</li> `;
});
const NavUl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activeUrl",
    "divClass",
    "ulClass",
    "hidden",
    "slideParams",
    "activeClass",
    "nonActiveClass"
  ]);
  let $hiddenStore, $$unsubscribe_hiddenStore;
  let { activeUrl = "" } = $$props;
  let { divClass = "w-full md:block md:w-auto" } = $$props;
  let { ulClass = "flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium" } = $$props;
  let { hidden = void 0 } = $$props;
  let { slideParams = {
    delay: 250,
    duration: 500,
    easing: sineIn
  } } = $$props;
  let { activeClass = "text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent" } = $$props;
  let { nonActiveClass = "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" } = $$props;
  const activeUrlStore = writable("");
  setContext("navbarContext", { activeClass, nonActiveClass });
  setContext("activeUrl", activeUrlStore);
  let hiddenStore = getContext("navHidden");
  $$unsubscribe_hiddenStore = subscribe(hiddenStore, (value) => $hiddenStore = value);
  let _hidden;
  let _divClass;
  let _ulClass;
  if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0) $$bindings.activeUrl(activeUrl);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
  if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0) $$bindings.ulClass(ulClass);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
  if ($$props.slideParams === void 0 && $$bindings.slideParams && slideParams !== void 0) $$bindings.slideParams(slideParams);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0) $$bindings.nonActiveClass(nonActiveClass);
  {
    {
      activeUrlStore.set(activeUrl);
    }
  }
  _hidden = hidden ?? $hiddenStore ?? true;
  _divClass = twMerge(divClass, $$props.class);
  _ulClass = twMerge(
    ulClass,
    // 'divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700',
    $$props.classUl
  );
  $$unsubscribe_hiddenStore();
  return `${!_hidden ? `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { role: "button" },
      { tabindex: "0" }
    ],
    {}
  )}>${validate_component(Frame, "Frame").$$render(
    $$result,
    {
      tag: "ul",
      border: true,
      rounded: true,
      color: "navbarUl",
      class: _ulClass
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}</div>` : `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { hidden: _hidden || null }
    ],
    {}
  )}><ul${add_attribute("class", _ulClass, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>`} `;
});
const logo = "data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%2020010904//EN'%20'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3e%3csvg%20version='1.0'%20xmlns='http://www.w3.org/2000/svg'%20width='360.000000pt'%20height='360.000000pt'%20viewBox='0%200%20360.000000%20360.000000'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cg%20transform='translate(0.000000,360.000000)%20scale(0.100000,-0.100000)'%20fill='%23000000'%20stroke='none'%3e%3cpath%20d='M1730%202863%20l1%20-378%2035%20-38%2036%20-39%2034%2033%2034%2033%200%20383%200%20383%20-70%200%20-70%200%200%20-377z'/%3e%3cpath%20d='M947%203002%20l-227%20-227%2078%20-78%2078%20-78%2052%2052%2053%2052%20-28%2029%20-27%2029%20126%20126%20127%20127%20246%20-246%20245%20-246%200%20102%200%20101%20-243%20243%20c-133%20133%20-244%20242%20-247%20242%20-3%200%20-108%20-102%20-233%20-228z'/%3e%3cpath%20d='M2300%203105%20c-68%20-68%20-122%20-126%20-120%20-128%203%20-1%2035%20-15%2071%20-29%20l67%20-25%20103%20103%20104%20104%20-50%2050%20-50%2050%20-125%20-125z'/%3e%3cpath%20d='M1596%202959%20c-22%20-5%20-41%20-11%20-43%20-12%20-1%20-2%2024%20-30%2057%20-62%20l60%20-59%200%2072%20c0%2080%202%2079%20-74%2061z'/%3e%3cpath%20d='M1932%202898%20l3%20-71%2065%20-13%20c134%20-27%20284%20-90%20383%20-160%2026%20-19%2051%20-34%2055%20-34%204%200%2029%2022%2056%2049%20l47%2048%20-53%2038%20c-69%2050%20-195%20117%20-280%20149%20-58%2021%20-238%2066%20-268%2066%20-7%200%20-10%20-26%20-8%20-72z'/%3e%3cpath%20d='M2420%202515%20l-360%20-360%2050%20-50%2050%20-50%20310%20310%20310%20310%20127%20-127%20128%20-128%20-54%20-54%20-53%20-54%2028%20-72%2028%20-71%20123%20123%20c68%2067%20122%20126%20121%20130%20-2%204%20-103%20108%20-225%20231%20l-222%20223%20-361%20-361z'/%3e%3cpath%20d='M1207%202815%20c-179%20-107%20-320%20-249%20-423%20-426%20l-36%20-61%2053%20-54%2052%20-53%2043%2076%20c103%20181%20226%20304%20407%20407%20l76%2043%20-52%2051%20c-29%2029%20-55%2052%20-57%2052%20-3%20-1%20-31%20-16%20-63%20-35z'/%3e%3cpath%20d='M1942%202748%20c-8%20-8%20-12%20-48%20-12%20-112%20l0%20-101%2090%2090%20c50%2049%2090%2093%2090%2096%200%207%20-118%2039%20-143%2039%20-7%200%20-18%20-5%20-25%20-12z'/%3e%3cpath%20d='M1112%202487%20l-52%20-52%20193%20-193%20192%20-192%2053%2053%2052%2052%20-193%20193%20-192%20192%20-53%20-53z'/%3e%3cpath%20d='M2667%202482%20l-48%20-48%2047%20-70%20c116%20-172%20185%20-423%20170%20-619%20l-6%20-81%2059%20-58%20c32%20-32%2061%20-54%2064%20-49%2015%2025%2029%20199%2024%20300%20-12%20224%20-84%20434%20-210%20616%20-22%2031%20-43%2057%20-46%2057%20-4%200%20-28%20-22%20-54%20-48z'/%3e%3cpath%20d='M415%202470%20l-50%20-50%20313%20-313%20312%20-312%20-77%20-77%20-77%20-77%2018%20-76%20c10%20-41%2021%20-75%2024%20-75%204%200%2076%2069%20160%20153%20l153%20154%20-338%20337%20c-185%20185%20-349%20348%20-363%20361%20l-26%2025%20-49%20-50z'/%3e%3cpath%20d='M2570%201955%20c-85%20-85%20-152%20-156%20-150%20-159%2019%20-20%20665%20-667%20689%20-690%20l31%20-30%2045%2044%20c25%2024%2045%2049%2045%2055%200%205%20-138%20148%20-307%20317%20l-308%20308%2077%2077%2076%2078%20-18%2073%20c-9%2040%20-19%2075%20-22%2077%20-2%202%20-73%20-65%20-158%20-150z'/%3e%3cpath%20d='M642%201999%20c-30%20-154%20-21%20-332%2023%20-504%2029%20-112%20110%20-287%20176%20-378%20l42%20-59%2048%2048%20c27%2027%2049%2052%2049%2056%200%204%20-16%2030%20-35%2057%20-52%2072%20-121%20225%20-146%20321%20-16%2063%20-22%20126%20-25%20240%20l-4%20155%20-59%2059%20-59%2059%20-10%20-54z'/%3e%3cpath%20d='M1135%201230%20l-310%20-310%20-127%20127%20-128%20128%2053%2053%2054%2054%20-26%2069%20c-14%2038%20-28%2069%20-31%2069%20-3%200%20-61%20-55%20-128%20-123%20l-123%20-123%20228%20-227%20228%20-227%20359%20360%20360%20359%20-45%2049%20c-24%2028%20-46%2050%20-49%2051%20-3%201%20-145%20-138%20-315%20-309z'/%3e%3cpath%20d='M2105%201490%20l-50%20-50%20193%20-193%20192%20-192%2052%2053%2053%2052%20-190%20190%20c-104%20105%20-192%20190%20-195%20190%20-3%200%20-28%20-23%20-55%20-50z'/%3e%3cpath%20d='M2729%201338%20c-30%20-72%20-132%20-209%20-217%20-289%20-73%20-69%20-218%20-170%20-275%20-192%20-7%20-3%2011%20-28%2040%20-58%2048%20-49%2054%20-52%2077%20-41%20157%2071%20417%20331%20488%20487%2011%2024%208%2030%20-37%2075%20-27%2028%20-52%2050%20-56%2050%20-4%200%20-13%20-15%20-20%20-32z'/%3e%3cpath%20d='M1641%201026%20l-154%20-154%2039%20-11%20c21%20-6%2057%20-14%2079%20-19%20l40%20-9%2078%2076%2077%2076%20308%20-308%20c169%20-169%20312%20-307%20317%20-307%206%200%20111%20101%20235%20225%20l225%20225%20-75%2075%20c-41%2041%20-77%2075%20-80%2075%20-4%200%20-29%20-22%20-57%20-49%20l-51%20-49%2029%20-28%2029%20-28%20-122%20-123%20c-68%20-68%20-127%20-123%20-131%20-123%20-5%200%20-147%20137%20-315%20305%20-168%20168%20-308%20305%20-311%20305%20-4%200%20-76%20-69%20-160%20-154z'/%3e%3cpath%20d='M1117%20932%20c-26%20-26%20-47%20-51%20-47%20-54%200%20-13%20122%20-90%20209%20-133%20153%20-75%20297%20-113%20466%20-122%2098%20-5%20291%209%20304%2023%203%202%20-22%2031%20-54%2064%20l-59%2060%20-76%20-6%20c-138%20-12%20-350%2029%20-493%2095%20-34%2015%20-93%2049%20-131%2075%20-38%2025%20-69%2046%20-70%2046%20-1%200%20-23%20-22%20-49%20-48z'/%3e%3cpath%20d='M1181%20566%20l-103%20-104%2048%20-46%20c27%20-25%2051%20-46%2054%20-46%203%200%2061%2055%20128%20123%20l123%20123%20-68%2027%20c-38%2015%20-71%2027%20-73%2027%20-3%200%20-52%20-47%20-109%20-104z'/%3e%3c/g%3e%3c/svg%3e";
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeUrl;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  activeUrl = $page.url.pathname;
  $$unsubscribe_page();
  return `<div class="w-full bg-accent-3">${validate_component(Navbar, "Navbar").$$render(
    $$result,
    {
      color: "primary",
      class: "w-4/5 place-self-center mx-auto"
    },
    {},
    {
      default: () => {
        return `${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/" }, {}, {
          default: () => {
            return `<img${add_attribute("src", logo, 0)} class="me-3 h-6 sm:h-9" alt="logo"> <span class="self-center whitespace-nowrap text-xl font-semibold text-black" data-svelte-h="svelte-ic01rq">Eye of the Storm</span>`;
          }
        })} ${validate_component(NavHamburger, "NavHamburger").$$render($$result, {}, {}, {})} ${validate_component(NavUl, "NavUl").$$render(
          $$result,
          {
            activeUrl,
            activeClass: "font-bold text-accent-1",
            nonActiveClass: "text-accent-5 hover:text-white"
          },
          {},
          {
            default: () => {
              return `${validate_component(NavLi, "NavLi").$$render($$result, { href: "/" }, {}, {
                default: () => {
                  return `Home`;
                }
              })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/timeline" }, {}, {
                default: () => {
                  return `Timeline`;
                }
              })}`;
            }
          }
        )}`;
      }
    }
  )}</div>`;
});
const Footer_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="w-full bg-accent-2">${validate_component(Footer, "Footer").$$render(
    $$result,
    {
      color: "primary",
      class: "w-4/5 place-self-center mx-auto my-max"
    },
    {},
    {
      default: () => {
        return `<div class="sm:flex sm:items-center sm:justify-between"><div class="overflow-hidden"><h2 class="self-center" data-svelte-h="svelte-kk4ps2">Made With:</h2> ${validate_component(FooterLinkGroup, "FooterLinkGroup").$$render(
          $$result,
          {
            ulClass: "flex flex-wrap items-center mt-3 text-sm text-black sm:mt-0"
          },
          {},
          {
            default: () => {
              return `${validate_component(FooterLink, "FooterLink").$$render(
                $$result,
                {
                  href: "https://tailwindcss.com/",
                  target: "_blank"
                },
                {},
                {
                  default: () => {
                    return `Tailwind CSS`;
                  }
                }
              )} ${validate_component(FooterLink, "FooterLink").$$render($$result, { href: "https://svelte.dev/" }, {}, {
                default: () => {
                  return `Svelte`;
                }
              })} ${validate_component(FooterLink, "FooterLink").$$render($$result, { href: "https://flowbite-svelte.com/" }, {}, {
                default: () => {
                  return `Flowbite Svelte`;
                }
              })}`;
            }
          }
        )}</div> ${validate_component(FooterLinkGroup, "FooterLinkGroup").$$render(
          $$result,
          {
            ulClass: "flex flex-wrap items-center mt-3 text-sm text-black sm:mt-0"
          },
          {},
          {
            default: () => {
              return `${validate_component(FooterLink, "FooterLink").$$render(
                $$result,
                {
                  href: "https://x.com/TerrifiedPigeon",
                  target: "_blank"
                },
                {},
                {
                  default: () => {
                    return `Contact`;
                  }
                }
              )}`;
            }
          }
        )}</div>`;
      }
    }
  )}</div>`;
});
const css = {
  code: ".app.svelte-1e7kqks{display:flex;flex-direction:column;min-height:100vh}main.svelte-1e7kqks{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:72rem;margin:0 auto;box-sizing:border-box}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n\\timport '../app.css';\\n\\timport Nav from '../lib/components/Nav.svelte';\\n\\timport Footer from '../lib/components/Footer.svelte';\\n<\/script>\\n<header>\\n\\t<Nav />\\n</header>\\n<div class=\\"app bg-background\\">\\n\\t<main>\\n\\t\\t<slot />\\n\\t</main>\\n</div>\\n<footer>\\n\\t<Footer />\\n</footer>\\n<style>\\n\\t.app {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tmin-height: 100vh;\\n\\t}\\n\\n\\tmain {\\n\\t\\tflex: 1;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tpadding: 1rem;\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: 72rem;\\n\\t\\tmargin: 0 auto;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\n</style>\\n"],"names":[],"mappings":"AAiBC,mBAAK,CACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,KACb,CAEA,mBAAK,CACJ,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UACb"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<header>${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}</header> <div class="app bg-background svelte-1e7kqks"><main class="svelte-1e7kqks">${slots.default ? slots.default({}) : ``}</main></div> <footer>${validate_component(Footer_1, "Footer").$$render($$result, {}, {}, {})} </footer>`;
});
export {
  Layout as default
};
