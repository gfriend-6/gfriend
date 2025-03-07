<script>
    import { Checkbox, Button, DropdownDivider, Dropdown, DropdownItem } from 'flowbite-svelte';
    import Card from  '$lib/components/Card.svelte'
    import TimelineItem from '$lib/components/TimelineItem.svelte'
    import Timeline from '$lib/components/Timeline.svelte'
    import { hybe_timeline } from "$lib/data/timeline.js";
    let timeline_events = hybe_timeline["events"];
</script>
  <div class="overflow-hidden -mt-5">
    
  <Card size="lg" class="float-left mt-5" color="secondary" >
    <Timeline order="default">
      {#each timeline_events as item}
        <TimelineItem title={item["title"]} date={item["date"]} desc={(item["text"] || item["sources"].length != 0) ? true : false }>
        <p class="mb-4 text-base font-normal text-gray-500 text-sm">
            <br />
            {item["text"]}
            {#if item["notes"] != ""}
            <br /><i>Note: {item["notes"]}</i>
            {/if}
            {#if item["text"] != ""}
            <br /><br />
            {/if}
            {#if item["sources"].length != 0}
            <small>Sources:
            {#each item["sources"] as source}
                <a class="text-primary-2" href={source} target="_blank"
                >({item["sources"].indexOf(source) + 1})</a
                >
            {/each}
            </small>
            {/if}
        </p>
        </TimelineItem>
    
      {/each}
    </Timeline>
  </Card>
  </div>
  