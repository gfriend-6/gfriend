<script>
  import {
    Card,
    Checkbox,
    Button,
    DropdownDivider,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import { page, updated } from "$app/state";
  import TimelineItem from "$lib/components/TimelineItem.svelte";
  import Timeline from "$lib/components/Timeline.svelte";
  import { timeline } from "$lib/data/snapshots.js";
  function alligator() {
    let snapshots2 = [];
    for (let snapshot in timeline["events"]) {
      if (parseInt(slug) in timeline["events"][snapshot]["snapshots"]) {
        snapshots2.push(timeline["events"][snapshot]);
      }
    }
    console.log(snapshots2)
    return snapshots2
  }
  let snapshots = alligator()
  let slug = (page.params.slug);
</script>

<div class="overflow-hidden -mt-5">
  {#key slug}
    <Card size="lg" class="float-left mt-5 bg-accent-1 border-accent-3">
      <Timeline order="default">
        {#each snapshots as item}
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
  {/key}
</div>
