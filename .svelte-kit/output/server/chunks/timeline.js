import { c as create_ssr_component, h as add_attribute, e as escape, v as validate_component } from "./ssr.js";
import { C as ChevronDownOutline } from "./ChevronDownOutline.js";
import { twMerge } from "tailwind-merge";
const liClasses = "mb-10 ms-4";
const divClasses = "absolute w-3 h-3 bg-primary-2 rounded-full mt-1.5 -start-1.5 border border-white";
const timeClasses = "mb-1 text-xs font-normal leading-none text-gray-500 dark:text-gray-500";
const h3Cls = "text-md font-semibold text-gray-900 dark:text-white";
const TimelineItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { desc = false } = $$props;
  let { title = "" } = $$props;
  let { date = "" } = $$props;
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
  return `  <li${add_attribute("class", liClasses, 0)}><div${add_attribute("class", divClasses, 0)}></div> <time${add_attribute("class", timeClasses, 0)}>${escape(date)}</time> ${title ? `<div><h3${add_attribute("class", h3Cls, 0)}>${desc ? `<button class="justify-between flex">${escape(title)} <div class="justify-center ms-2 items-center w-6 h-6 bg-gray-200 rounded-full">${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render($$result, { class: "w-6 h-6 ms-0 text-black" }, {}, {})}</div></button>` : `${escape(title)}`}</h3></div>` : ``} <div>${slots.default ? slots.default({}) : ``}</div></li> `;
});
let olClasses = "relative border-s border-black dark:border-gray-700";
const Timeline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  <ol${add_attribute("class", twMerge(olClasses, $$props.class), 0)}>${slots.default ? slots.default({}) : ``}</ol> `;
});
export {
  Timeline as T,
  TimelineItem as a
};
