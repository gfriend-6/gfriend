<script>
  import {
    Card,
    Checkbox,
    Button,
    DropdownDivider,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import TimelineItem from "$lib/components/TimelineItem.svelte";
  import Timeline from "$lib/components/Timeline.svelte";
  import { timeline } from "$lib/data/timeline.js";
  let timeline_events = timeline["events"];

</script>

<div class="overflow-hidden -mt-5">
    <Card size="lg" class="float-left mt-5 bg-accent-1 border-accent-3">
      <h1 class="text-xl font-bold">This is a simplified version of a much more complicated timeline.</h1>
      <Timeline order="default">
        {#each timeline_events as item}
          <TimelineItem
            title={item["title"]}
            date={item["date"]}
            desc={item["text"] || item["sources"].length != 0 ? true : false}
          >
            <p class="mb-4 text-base font-normal text-primary-4 text-sm">
              {item["text"]}
              {#if item["notes"] != ""}
                <br /><br /><i>Note: {item["notes"]}</i>
              {/if}
              {#if item["text"] != ""}
                <br /><br />
              {/if}
              {#if item["sources"].length != 0}
                <span class="text-primary-3"
                  >Sources: <span class="font-bold">
                    {#each item["sources"] as source}
                      <a class="text-primary-3" href={source} target="_blank"
                        >({item["sources"].indexOf(source) + 1})</a
                      >
                    {/each}
                  </span></span
                >
              {/if}
            </p>
          </TimelineItem>
        {/each}
      </Timeline>
    </Card>
</div>
