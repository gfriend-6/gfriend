import { g as getContext, c as create_ssr_component, v as validate_component, j as each, e as escape, h as add_attribute } from "../../../../chunks/ssr.js";
import { C as Card } from "../../../../chunks/Card.js";
import { s as stores } from "../../../../chunks/client.js";
import { T as Timeline, a as TimelineItem } from "../../../../chunks/Timeline.js";
({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get params() {
    return context().page.params;
  }
};
const page = page$1;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let snapshots = alligator();
  page.params.slug;
  return `<div class="overflow-hidden -mt-5">${validate_component(Card, "Card").$$render(
    $$result,
    {
      size: "lg",
      class: "float-left mt-5 bg-accent-1 border-accent-3"
    },
    {},
    {
      default: () => {
        return `${validate_component(Timeline, "Timeline").$$render($$result, { order: "default" }, {}, {
          default: () => {
            return `${each(snapshots, (item) => {
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
                    return `<p class="mb-4 text-base font-normal text-primary-4 text-sm">${escape(item["text"])} ${item["notes"] != "" ? `<br><br><i>Note: ${escape(item["notes"])}</i>` : ``} ${item["text"] != "" ? `<br><br>` : ``} ${item["sources"].length != 0 ? `<span class="text-primary-3">Sources: <span class="font-bold">${each(item["sources"], (source) => {
                      return `<a class="text-primary-3"${add_attribute("href", source, 0)} target="_blank">(${escape(item["sources"].indexOf(source) + 1)})</a>`;
                    })} </span></span>` : ``}</p> `;
                  }
                }
              )}`;
            })}`;
          }
        })}`;
      }
    }
  )}</div>`;
});
export {
  Page as default
};
