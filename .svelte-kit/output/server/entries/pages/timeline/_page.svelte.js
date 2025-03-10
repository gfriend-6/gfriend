import { c as create_ssr_component, a as compute_rest_props, g as getContext, b as spread, d as escape_attribute_value, f as escape_object, h as add_attribute, k as compute_slots, j as each, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import { i as is_void } from "../../../chunks/Frame.js";
import { twMerge } from "tailwind-merge";
import { C as Card } from "../../../chunks/Card.js";
import { b as DropdownDivider, D as Dropdown, a as DropdownItem } from "../../../chunks/DropdownItem.js";
import { T as Timeline, a as TimelineItem } from "../../../chunks/Timeline.js";
import { C as ChevronDownOutline } from "../../../chunks/ChevronDownOutline.js";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "pill",
    "outline",
    "size",
    "href",
    "type",
    "color",
    "shadow",
    "tag",
    "checked",
    "disabled"
  ]);
  const group = getContext("group");
  let { pill = false } = $$props;
  let { outline = false } = $$props;
  let { size = group ? "sm" : "md" } = $$props;
  let { href = void 0 } = $$props;
  let { type = "button" } = $$props;
  let { color = group ? outline ? "dark" : "alternative" : "primary" } = $$props;
  let { shadow = false } = $$props;
  let { tag = "button" } = $$props;
  let { checked = void 0 } = $$props;
  let { disabled = false } = $$props;
  const colorClasses2 = {
    alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white dark:hover:bg-gray-700",
    blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
    dark: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
    green: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
    light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
    primary: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
    purple: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
    red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
    yellow: "text-white bg-yellow-400 hover:bg-yellow-500 ",
    none: ""
  };
  const colorCheckedClasses = {
    alternative: "text-primary-700 border dark:text-primary-500 bg-gray-100 dark:bg-gray-700 border-gray-300 shadow-gray-300 dark:shadow-gray-800 shadow-inner",
    blue: "text-blue-900 bg-blue-400 dark:bg-blue-500 shadow-blue-700 dark:shadow-blue-800 shadow-inner",
    dark: "text-white bg-gray-500 dark:bg-gray-600 shadow-gray-800 dark:shadow-gray-900 shadow-inner",
    green: "text-green-900 bg-green-400 dark:bg-green-500 shadow-green-700 dark:shadow-green-800 shadow-inner",
    light: "text-gray-900 bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:text-gray-900 dark:border-gray-700 shadow-gray-300 dark:shadow-gray-700 shadow-inner",
    primary: "text-primary-900 bg-primary-400 dark:bg-primary-500 shadow-primary-700 dark:shadow-primary-800 shadow-inner",
    purple: "text-purple-900 bg-purple-400 dark:bg-purple-500 shadow-purple-700 dark:shadow-purple-800 shadow-inner",
    red: "text-red-900 bg-red-400 dark:bg-red-500 shadow-red-700 dark:shadow-red-800 shadow-inner",
    yellow: "text-yellow-900 bg-yellow-300 dark:bg-yellow-400 shadow-yellow-500 dark:shadow-yellow-700 shadow-inner",
    none: ""
  };
  const coloredFocusClasses = {
    alternative: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
    blue: "focus-within:ring-blue-300 dark:focus-within:ring-blue-800",
    dark: "focus-within:ring-gray-300 dark:focus-within:ring-gray-700",
    green: "focus-within:ring-green-300 dark:focus-within:ring-green-800",
    light: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
    primary: "focus-within:ring-primary-300 dark:focus-within:ring-primary-800",
    purple: "focus-within:ring-purple-300 dark:focus-within:ring-purple-900",
    red: "focus-within:ring-red-300 dark:focus-within:ring-red-900",
    yellow: "focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900",
    none: ""
  };
  const coloredShadowClasses = {
    alternative: "shadow-gray-500/50 dark:shadow-gray-800/80",
    blue: "shadow-blue-500/50 dark:shadow-blue-800/80",
    dark: "shadow-gray-500/50 dark:shadow-gray-800/80",
    green: "shadow-green-500/50 dark:shadow-green-800/80",
    light: "shadow-gray-500/50 dark:shadow-gray-800/80",
    primary: "shadow-primary-500/50 dark:shadow-primary-800/80",
    purple: "shadow-purple-500/50 dark:shadow-purple-800/80",
    red: "shadow-red-500/50 dark:shadow-red-800/80 ",
    yellow: "shadow-yellow-500/50 dark:shadow-yellow-800/80 ",
    none: ""
  };
  const outlineClasses = {
    alternative: "text-gray-900 dark:text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white focus-within:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus-within:ring-gray-800",
    blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600",
    dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600",
    green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600",
    light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600",
    primary: "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600",
    purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500",
    red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600",
    yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400",
    none: ""
  };
  const sizeClasses = {
    xs: "px-3 py-2 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-base"
  };
  const hasBorder = () => outline || color === "alternative" || color === "light";
  let buttonClass;
  if ($$props.pill === void 0 && $$bindings.pill && pill !== void 0) $$bindings.pill(pill);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0) $$bindings.outline(outline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0) $$bindings.shadow(shadow);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  buttonClass = twMerge(
    "text-center font-medium",
    group ? "focus-within:ring-2" : "focus-within:ring-4",
    group && "focus-within:z-10",
    group || "focus-within:outline-none",
    "inline-flex items-center justify-center " + sizeClasses[size],
    outline && checked && "border dark:border-gray-900",
    outline && checked && colorCheckedClasses[color],
    outline && !checked && outlineClasses[color],
    !outline && checked && colorCheckedClasses[color],
    !outline && !checked && colorClasses2[color],
    color === "alternative" && (group && !checked ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-600 dark:hover:border-gray-600"),
    outline && color === "dark" && (group ? checked ? "bg-gray-900 border-gray-800 dark:border-white dark:bg-gray-600" : "dark:text-white border-gray-800 dark:border-white" : "dark:text-gray-400 dark:border-gray-700"),
    coloredFocusClasses[color],
    hasBorder() && group && "[&:not(:first-child)]:-ms-px",
    group ? pill && "first:rounded-s-full last:rounded-e-full" || "first:rounded-s-lg last:rounded-e-lg" : pill && "rounded-full" || "rounded-lg",
    shadow && "shadow-lg",
    shadow && coloredShadowClasses[color],
    disabled && "cursor-not-allowed opacity-50",
    $$props.class
  );
  return `${href && !disabled ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      { role: "button" }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a>` : `${tag === "button" ? `<button${spread(
    [
      { type: escape_attribute_value(type) },
      escape_object($$restProps),
      { disabled: disabled || null },
      {
        class: escape_attribute_value(buttonClass)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>` : `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        escape_object($$restProps),
        {
          class: escape_attribute_value(buttonClass)
        }
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`}`} `;
});
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelClass2;
  let $$restProps = compute_rest_props($$props, ["color", "defaultClass", "show"]);
  let { color = "gray" } = $$props;
  let { defaultClass = "text-sm rtl:text-right font-medium block" } = $$props;
  let { show = true } = $$props;
  let node;
  const colorClasses2 = {
    gray: "text-gray-900 dark:text-gray-300",
    green: "text-green-700 dark:text-green-500",
    red: "text-red-700 dark:text-red-500",
    disabled: "text-gray-400 dark:text-gray-500 grayscale contrast-50"
  };
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0) $$bindings.defaultClass(defaultClass);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  {
    {
      color = color;
    }
  }
  labelClass2 = twMerge(defaultClass, colorClasses2[color], $$props.class);
  return `${show ? ` <label${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(labelClass2)
      }
    ],
    {}
  )}${add_attribute("this", node, 0)}>${slots.default ? slots.default({}) : ``}</label>` : `${slots.default ? slots.default({}) : ``}`} `;
});
const colorClasses = {
  primary: "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600",
  secondary: "text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600",
  red: "text-red-600 focus:ring-red-500 dark:focus:ring-red-600",
  green: "text-green-600 focus:ring-green-500 dark:focus:ring-green-600",
  purple: "text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600",
  teal: "text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600",
  yellow: "text-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600",
  orange: "text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600",
  blue: "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600"
};
const labelClass = (inline, extraClass) => twMerge(inline ? "inline-flex" : "flex", "items-center", extraClass);
const inputClass = (custom, color, rounded, tinted, spacing, extraClass) => twMerge(
  "w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2",
  spacing,
  tinted ? "dark:bg-gray-600 dark:border-gray-500" : "dark:bg-gray-700 dark:border-gray-600",
  custom && "sr-only peer",
  "rounded",
  colorClasses[color],
  extraClass
);
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "color",
    "custom",
    "inline",
    "group",
    "choices",
    "value",
    "checked",
    "spacing",
    "groupLabelClass",
    "groupInputClass"
  ]);
  let $$slots = compute_slots(slots);
  let { color = "primary" } = $$props;
  let { custom = false } = $$props;
  let { inline = false } = $$props;
  let { group = [] } = $$props;
  let { choices = [] } = $$props;
  let { value = "on" } = $$props;
  let { checked = void 0 } = $$props;
  let { spacing = $$slots.default ? "me-2" : "" } = $$props;
  let { groupLabelClass = "" } = $$props;
  let { groupInputClass = "" } = $$props;
  let background = getContext("background");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0) $$bindings.inline(inline);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0) $$bindings.group(group);
  if ($$props.choices === void 0 && $$bindings.choices && choices !== void 0) $$bindings.choices(choices);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0) $$bindings.spacing(spacing);
  if ($$props.groupLabelClass === void 0 && $$bindings.groupLabelClass && groupLabelClass !== void 0) $$bindings.groupLabelClass(groupLabelClass);
  if ($$props.groupInputClass === void 0 && $$bindings.groupInputClass && groupInputClass !== void 0) $$bindings.groupInputClass(groupInputClass);
  return `${choices.length > 0 ? `${each(choices, ({ value: value2, label }, i) => {
    return `${validate_component(Label, "Label").$$render(
      $$result,
      {
        class: labelClass(inline, groupLabelClass),
        show: $$slots.default,
        for: `checkbox-${i}`
      },
      {},
      {
        default: () => {
          return `${escape(label)} <input${spread(
            [
              {
                id: escape_attribute_value(`checkbox-${i}`)
              },
              { type: "checkbox" },
              { value: escape_attribute_value(value2) },
              escape_object($$restProps),
              {
                class: escape_attribute_value(inputClass(custom, color, true, background, spacing, groupInputClass))
              }
            ],
            {}
          )}${~group.indexOf(value2) ? add_attribute("checked", true, 1) : ""}> ${slots.default ? slots.default({}) : ``} `;
        }
      }
    )}`;
  })}` : `${validate_component(Label, "Label").$$render(
    $$result,
    {
      class: labelClass(inline, $$props.class),
      show: $$slots.default
    },
    {},
    {
      default: () => {
        return `<input${spread(
          [
            { type: "checkbox" },
            { value: escape_attribute_value(value) },
            escape_object($$restProps),
            {
              class: escape_attribute_value(inputClass(custom, color, true, background, spacing, $$slots.default || $$props.class))
            }
          ],
          {}
        )}${add_attribute("checked", checked, 1)}> ${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`} `;
});
const hybe_timeline = {
  labels: {
    labelCategoryNames: ["groups", "other", "companies", "type"]
  },
  events: [
    {
      title: "Source Music Casts Minji",
      date: "2017",
      labels: {
        groups: [],
        other: ["Team N"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "",
      notes: "",
      sources: ["https://m.entertain.naver.com/article/433/0000106807", "https://www.koreatimes.co.kr/www/art/2025/03/398_362674.html"]
    },
    {
      title: `GFriend's 2nd Album: "Time For Us" is Released`,
      date: "January 01, 2019",
      labels: {
        group: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: ["Music"]
      },
      text: "Time For Us is release with positive reactions.",
      notes: "",
      sources: ["https://kpopreviewed.com/2019/01/14/sunrise-gfriend/"]
    },
    {
      title: `GFriend's 7th EP: "Fever Season" is Released`,
      date: "July 01, 2019",
      labels: {
        group: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: ["Music"]
      },
      text: 'Fever Season is release with mixed reactions. Some fans stating the title track "Fever" felt generaic and lacklustre.',
      notes: "This was GFriend's last release outside of HYBE and may have been a budget release as Source Music likely joined HYBE for financial support.",
      sources: ["https://www.asianjunkie.com/2019/07/01/review-gfriends-fever-provides-a-summer-vibe-but-is-disappointingly-generic/", "https://www.allkpop.com/article/2021/03/hybe-releases-the-2020-financial-report-for-sublabels-pledis-entertainment-and-source-music"]
    },
    {
      title: "Min Hee-Jin Joins BigHit (HYBE)",
      date: "July 01, 2019",
      labels: {
        groups: [],
        other: ["Team N", "Min Hee-Jin"],
        companies: ["Source Music"],
        type: []
      },
      text: 'Min Hee-Jin joined BigHit (HYBE) as its Chief Brand Officer (CBO), with one of her responsibilities being to "lead the launch of a new girl group"',
      notes: `It can be concluded that Min Hee-Jin was set to work with Souce Music's "Team N" as there were no other female trainee teams, under hybe, until 2021.`,
      sources: ["https://m.entertain.naver.com/now/article/081/0003010589"]
    },
    {
      title: `GFriend's 2nd Japanese Album: "Fallin' Light" is Released`,
      date: "November 13, 2019",
      labels: {
        groups: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: ["Music"]
      },
      text: "Fallin' Light is release with positive reactions. This is GFriend's first release uder HYBE and the debut of their mature concept.",
      notes: "",
      sources: ["https://kpopreviewed.com/2019/11/16/fallin-light-gfriend/"]
    },
    {
      title: "Source Music Casts Hanni",
      date: "November 2019",
      labels: {
        groups: [],
        other: ["Team N"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: `Hanni is cast as a Source Music trainee in November 2019 through Source Music and Bit Hit's "Plus Global Audition".`,
      notes: "",
      sources: ["https://m.entertain.naver.com/article/433/0000106807"]
    },
    {
      title: `GFriend's 8th EP: "回:Labyrinth" is Released`,
      date: "Febuary 3, 2020",
      labels: {
        groups: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: ["Music"]
      },
      text: "回:Labyrinth is release with positive reactions. This is GFriend's first Korean release uder HYBE and introduces the mature concept to their Korean fanbase.",
      notes: "",
      sources: ["https://thebiaslist.com/2020/02/04/buried-treasure-gfriend-labyrinth/"]
    },
    {
      title: "Haerin Joins Source Music",
      date: "February 2020",
      labels: {
        groups: [],
        other: ["Team N"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "Haerin first discovered in November 2019, at the time she was a trainee under another company. However in December of that year her mother reached out to Source Music and she signed with Source Music in February of 2020.",
      notes: "",
      sources: ["https://m.entertain.naver.com/article/433/0000106807"]
    },
    {
      title: `GFriend's 9th EP: "回:Song of the Sirens" is Released`,
      date: "Febuary 3, 2020",
      labels: {
        groups: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: ["Music"]
      },
      text: "回:Song of the Sirens is release with positive reactions.",
      notes: "",
      sources: ["https://kpopreviewed.com/2020/07/14/apple-gfriend/"]
    },
    {
      title: "Danielle Joins Source Music",
      date: "July 2020",
      labels: {
        groups: [],
        other: ["Team N"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "Danielle signed in July 2020 and was a former YG trainee.",
      notes: "",
      sources: ["https://m.entertain.naver.com/article/433/0000106807"]
    },
    {
      title: "Hyein Joins Source Music",
      date: "January 2021",
      labels: {
        groups: [],
        other: ["Team N"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "Hyein signed in January 2021 after the CEO of Source Music took it upon himself to persuade her parents.",
      notes: "",
      sources: ["https://m.entertain.naver.com/article/433/0000106807"]
    },
    {
      title: "Source Music Casts Eunchae",
      date: "January 9, 2021",
      labels: {
        groups: [],
        other: ["Team S"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "Eunchae leaves her dance school to join Source Music as a trainee.",
      notes: "",
      sources: ["https://magazine.weverse.io/article/view/401?lang=en&ref=main&artist=LESSERAFIM"]
    },
    {
      title: `GFriend's 3rd Album: "回:Walpurgis Night" is Released`,
      date: "November 9, 2020",
      labels: {
        group: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: ["Music"]
      },
      text: "回:Song of the Sirens is release with positive reactions.",
      notes: "",
      sources: ["https://kpopreviewed.com/2020/12/30/album-walpurgis-night-gfriend/"]
    },
    {
      title: 'Source Music Submits Trademarks for "GFriend"',
      date: "March 11, 2021",
      labels: {
        groups: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: []
      },
      text: 'Source Music Submits Trademarks for "GFriend", all of which have been rejected due to the group no longer being under Source Music.',
      notes: "",
      sources: ["https://www.koreaboo.com/news/source-music-copyright-fail-file-gfriend/"]
    },
    {
      title: "It's Reported That Sakura Will Be Going To BigHit",
      date: "March 11, 2021",
      labels: {
        groups: [],
        other: ["Team S"],
        companies: ["Source Music"],
        type: []
      },
      text: "It's reported that Sakura will be going to Bit Hit after Iz*One disbands.",
      notes: "",
      sources: ["https://m.entertain.naver.com/now/article/015/0004511578"]
    },
    {
      title: "N Teams's Debut Evaluation",
      date: "March 27, 2021",
      labels: {
        groups: [],
        other: ["Team N"],
        companies: ["Source Music"],
        type: []
      },
      text: 'N Teams Debut Evaluation was conducted with the song "Attention". In the debut evaluation Minji, Hanni, Haerin, Danielle, and Hyein can be seen along side 2 other trainees.',
      notes: "",
      sources: ["https://m.entertain.naver.com/ranking/article/433/0000106807"]
    },
    {
      title: "GFriend Learn Their Contract is Ending",
      date: "April 2021",
      labels: {
        groups: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: []
      },
      text: "Roughly a month prior to GFriend's disbandment under Source Music, GFriend were notified their contract would be ending. GFriend can be seen crying on VLIVE from April until their contract ended.",
      notes: "",
      sources: ["https://www.soompi.com/article/1515881wpp/sinb-reveals-she-didnt-know-mago-would-be-gfriends-final-round-of-promotions-says-shes-confident-they-will-reunite"]
    },
    {
      title: "Source Music Casts Garam",
      date: "May 2021",
      labels: {
        groups: [],
        other: ["Team S"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "Garam joins Source Music as a trainee.",
      notes: "",
      sources: ["https://magazine.weverse.io/article/view/401?lang=en&ref=main&artist=LESSERAFIM"]
    },
    {
      title: "Source Music Announces GFriend's Contract is Ending",
      date: "May 17, 2021",
      labels: {
        groups: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: []
      },
      text: "Source Music announced that GFriend's contract would be ending on the May 22nd despite debuting in January of 2015. Suprising everyone including most of their own staff. Additionally GFriend's upcoming schedule was deleted.",
      notes: "The members have said they were fired, with SinB saying they they didn't know MAGO would be their last comeback. In a HYBE investment report it had GFriend down for a 10th mini album in June and contract renewal in Q4 of 2021.",
      sources: ["https://weverse.io/gfriend/notice/1282", "http://www.heraldpop.com/view.php?ud=202105181644230496316_1", "https://securities.miraeasset.com/bbs/download/2084380.pdf?attachmentId=2084380"]
    },
    {
      title: "GFriend's Contract Ends",
      date: "May 22, 2021",
      labels: {
        groups: ["GFriend"],
        other: [],
        companies: ["Source Music"],
        type: []
      },
      text: "GFriend's contract under Source Music end and all members leave.",
      notes: "",
      sources: []
    },
    {
      title: "Source Music's New Team Launch Meeting",
      date: "June 18, 2021",
      labels: {
        groups: [],
        other: ["Team S"],
        companies: ["Source Music"],
        type: []
      },
      text: 'Source Music creates a new trainee team "Team S", with the plan to debut at the latest of Q1 2022 because of the "popularity of the S-Team members". This would imply Sakura and Chaewon had already begun contract talks. Additionally at this time "Team N" is still first in the debut priority however if that gets post-poned then "Team S" is to take priority.',
      notes: 'Min Hee-Jin has refered to "Team S" as "Team Sakura" several times implying that "Team S" was built around Sakura.',
      sources: ["https://m.entertain.naver.com/article/433/0000106807"]
    },
    {
      title: "Source Music Recruits Sakura and Chaewon",
      date: "August 17, 2021",
      labels: {
        groups: [],
        other: ["Team S"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "Source Music reportedly signs Chaewon and is negotiating with Sakura's Japanese management regarding her joining the agency.",
      notes: "",
      sources: ["https://www.nme.com/news/music/hybe-girl-group-reportedly-recruit-izone-kim-chae-won-miyawaki-sakura-3021027"]
    },
    {
      title: "Yunjin transfers to Source Music",
      date: "August 25, 2021",
      labels: {
        groups: [],
        other: ["Team S"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "Yunjin reportedly transfers from PLEDIS to Source Music.",
      notes: "",
      sources: ["https://www.nme.com/news/music/heo-yun-jin-produce-48-source-music-hybe-upcoming-girl-group-3028474"]
    },
    {
      title: "Source Music Signs Sakura",
      date: "September 23, 2021",
      labels: {
        groups: [],
        other: ["Team S"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "Source Music reportedly signs Sakura.",
      notes: "Sakura's final performance with HKT48 was on June 27. However it was not announced that her contract had ended until November 2021.",
      sources: ["https://www.hkt48.jp/news/2021/06/7460", "https://www.allkpop.com/article/2021/09/miyawaki-sakura-has-reportedly-finalized-her-exclusive-contract-with-source-music-x-hybe-labels", "https://www.oricon.co.jp/news/2212359/full/"]
    },
    {
      title: `HYBE's New Label "ADOR"`,
      date: "November 12, 2021",
      labels: {
        groups: [],
        other: ["Team N", "Min Hee-Jin"],
        companies: ["Source Music", "ADOR"],
        type: []
      },
      text: `HYBE's New Label "ADOR" is established with Min Hee-Jin apointed as the CEO. ADOR was set to introduce a new girl group in 2022 with the members selected from Source Music and Bit Hit's "Plus Global Audition" back in 2019.`,
      notes: "",
      sources: ["https://sports.khan.co.kr/article/202111120921003", "https://m.entertain.naver.com/now/article/081/0003010589"]
    },
    {
      title: "Source Music Recruits Kazuha",
      date: "November 2021",
      labels: {
        groups: [],
        other: ["Team S"],
        companies: ["Source Music"],
        type: ["Trainee"]
      },
      text: "Kazuha is said to have trained for approximately 6 months prior to Le Sserafim's debut, placing her recuitment in November 2021.",
      notes: "",
      sources: ["https://www.envimedia.co/7-things-to-know-about-le-sserafims-kazuha/"]
    }
  ]
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let timeline_events = hybe_timeline["events"];
  const static_all_true = {
    "Music": true,
    "Trainee": true,
    "GFriend": true,
    "NewJeans": true,
    "LE SSERAFIM": true,
    "Team N": true,
    "Team S": true,
    "Min Hee-Jin": true,
    "HYBE": true,
    "BigHit": true,
    "Belift": true,
    "Source Music": true,
    "Pledis": true,
    "KOZ": true,
    "ADOR": true
  };
  let values = JSON.parse(JSON.stringify(static_all_true));
  function checkCheckbox(label) {
    let labels = [];
    for (let labelCategoryNames in hybe_timeline["labels"]["labelCategoryNames"]) {
      for (let tag in label[hybe_timeline["labels"]["labelCategoryNames"][labelCategoryNames]]) {
        labels.push(label[hybe_timeline["labels"]["labelCategoryNames"][labelCategoryNames]][tag]);
      }
    }
    let showItem = false;
    for (let labelVar in labels) {
      if (values[labels[labelVar]]) {
        showItem = true;
      }
    }
    return showItem;
  }
  return `<div class="overflow-hidden -mt-5"> ${validate_component(Card, "Card").$$render($$result, { class: "float-right mt-5 space-y-2" }, {}, {
    default: () => {
      return `<div>Groups
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["GFriend"] }, {}, {
        default: () => {
          return `GFriend`;
        }
      })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["NewJeans"] }, {}, {
        default: () => {
          return `NewJeans`;
        }
      })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["LE SSERAFIM"] }, {}, {
        default: () => {
          return `LE SSERAFIM`;
        }
      })}</div> <div>Trainee Groups
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Team N"] }, {}, {
        default: () => {
          return `Team N`;
        }
      })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Team S"] }, {}, {
        default: () => {
          return `Team S`;
        }
      })}</div> <div>People
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Min Hee-Jin"] }, {}, {
        default: () => {
          return `Min Hee-Jin`;
        }
      })}</div> <div>Companies
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Source Music"] }, {}, {
        default: () => {
          return `Source Music`;
        }
      })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["ADOR"] }, {}, {
        default: () => {
          return `ADOR`;
        }
      })}</div> <div>Event Type
      ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Music"] }, {}, {
        default: () => {
          return `Musical Release`;
        }
      })} ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: values["Trainee"] }, {}, {
        default: () => {
          return `New Trainee`;
        }
      })}</div> <div class="flex place-content-center space-x-4">${validate_component(Button, "Button").$$render($$result, { color: "red", class: "w-1/3 h-10 " }, {}, {
        default: () => {
          return `Toggle All`;
        }
      })}</div> ${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, { class: "bg-black" }, {}, {})} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
        default: () => {
          return `Presets${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
            $$result,
            {
              class: "w-6 h-6 ms-2 text-white dark:text-white"
            },
            {},
            {}
          )}`;
        }
      })} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
            default: () => {
              return `GFriend`;
            }
          })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
            default: () => {
              return `Min Hee-Jin`;
            }
          })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
            default: () => {
              return `NewJeans`;
            }
          })}`;
        }
      })}`;
    }
  })} ${validate_component(Card, "Card").$$render($$result, { size: "lg", class: "float-left mt-5" }, {}, {
    default: () => {
      return `${validate_component(Timeline, "Timeline").$$render($$result, { order: "default" }, {}, {
        default: () => {
          return `${each(timeline_events, (item) => {
            return `${checkCheckbox(item["labels"]) ? `${validate_component(TimelineItem, "TimelineItem").$$render(
              $$result,
              {
                title: item["title"],
                date: item["date"],
                desc: item["text"] || item["sources"].length != 0 ? true : false
              },
              {},
              {
                default: () => {
                  return `<p class="mb-4 text-base font-normal text-gray-500 text-sm">${escape(item["text"])} ${item["notes"] != "" ? `<br><br><i>Note: ${escape(item["notes"])}</i>` : ``} ${item["text"] != "" ? `<br><br>` : ``} ${item["sources"].length != 0 ? `<small>Sources:
              ${each(item["sources"], (source) => {
                    return `<a class="text-primary-2"${add_attribute("href", source, 0)} target="_blank">(${escape(item["sources"].indexOf(source) + 1)})</a>`;
                  })} </small>` : ``}</p> `;
                }
              }
            )}` : ``}`;
          })}`;
        }
      })}`;
    }
  })}</div>`;
});
export {
  Page as default
};
