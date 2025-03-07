import { c as create_ssr_component, v as validate_component, k as each, e as escape, h as add_attribute } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { T as Timeline, a as TimelineItem, h as hybe_timeline } from "../../../../chunks/timeline.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let timeline_events = hybe_timeline["events"];
  return `<div class="overflow-hidden -mt-5">${validate_component(Card, "Card").$$render($$result, { size: "lg", class: "float-left mt-5" }, {}, {
    default: () => {
      return `${validate_component(Timeline, "Timeline").$$render($$result, { order: "default" }, {}, {
        default: () => {
          return `${each(timeline_events, (item) => {
            return `${validate_component(TimelineItem, "TimelineItem").$$render(
              $$result,
              {
                title: item["title"],
                date: item["date"],
                desc: item["text"] || item["sources"].length != 0 ? true : false
              },
              {},
              {
                default: () => {
                  return `<p class="mb-4 text-base font-normal text-gray-500 text-sm"><br> ${escape(item["text"])} ${item["notes"] != "" ? `<br><i>Note: ${escape(item["notes"])}</i>` : ``} ${item["text"] != "" ? `<br><br>` : ``} ${item["sources"].length != 0 ? `<small>Sources:
            ${each(item["sources"], (source) => {
                    return `<a class="text-primary-600"${add_attribute("href", source, 0)} target="_blank">(${escape(item["sources"].indexOf(source) + 1)})</a>`;
                  })} </small>` : ``}</p> `;
                }
              }
            )}`;
          })}`;
        }
      })}`;
    }
  })}</div>`;
});
export {
  Page as default
};
