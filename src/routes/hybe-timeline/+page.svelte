<script>
  import {
    Timeline,
    TimelineItem,
    Badge,
    Card,
    Checkbox,
    Button
  } from "flowbite-svelte";
  import { AngleRightOutline } from "flowbite-svelte-icons";
  import { hybe_timeline } from "../../lib/data/hybe-timeline.js";
  let timeline_events = hybe_timeline["events"];
  $: values = {
    'GFRIEND': true,
    'NewJeans': true,
    'LE SSERAFIM': true,
    'Team N': true,
    'Team S': true,
    'Min Hee-Jin': true,
    'Yuju': false,
    'Yerin': false,
    'Sowon': false,
    'SinB': false,
    'Eunha': false,
    'Umji': false,
    'Minji': false,
    'Hanni': false,
    'Danielle': false,
    'Haerin': false,
    'Hyein': false,
    'Chaewon': false,
    'Sakura': false,
    'Yunjin': false,
    'Kazuha': false,
    'Eunchae': false,
    'Garam': false,
    'Source Music': true,
    'ADOR': true,
  };
  /**
   * @param {string} val
   */
  function switchVal(val) {
    values[val] = !values[val]
  }
  function checkCheckbox(label) {
    let showItem = false;
    for (let labelVar in label) {
      if (values[label[labelVar]]) {
        showItem = true;
      }
    }
    return showItem;
  }
  let update_var = 0
  function update() {
    update_var += 1
  }
</script>

<Card size="xl" horizontal class="lg:space-x-16 md:space-x-8">
  <div>
    Groups
    <Checkbox checked on:change={() => switchVal("GFRIEND")}>GFRIEND</Checkbox>
    <Checkbox checked on:change={() => switchVal("NewJeans")}>NewJeans</Checkbox
    >
    <Checkbox checked on:change={() => switchVal("LE SSERAFIM")}
      >LE SSERAFIM</Checkbox
    >
  </div>
  <div>
    Trainee Groups
    <Checkbox checked on:change={() => switchVal("Team N")}>Team N</Checkbox>
    <Checkbox checked on:change={() => switchVal("Team S")}>Team S</Checkbox>
  </div>
  <div>
    People
    <Checkbox checked on:change={() => switchVal("Min Hee-Jin")}
      >Min Hee-Jin</Checkbox
    >
  </div>
  <div>
    Companies
    <Checkbox checked on:change={() => switchVal("Source Music")}
      >Source Music</Checkbox
    >
    <Checkbox checked on:change={() => switchVal("ADOR")}>ADOR</Checkbox>
  </div>
  <Button on:click={update} class="w-1/4 h-10 self-center">Filter</Button>
</Card>
<br />
<Card size="xl">
  {#key update_var}
  <Timeline order="vertical">
    {#each timeline_events as item}
      {#if checkCheckbox(item["labels"])}
        <TimelineItem title={item["title"]} date={item["date"]}>
          <svelte:fragment slot="icon">
            <span
              class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white"
            >
              <AngleRightOutline class="w-4 h-4 text-primary-600" />
            </span>
          </svelte:fragment>
          <div class="flex space-x-1">
            {#each item["labels"] as tag}
              {#if hybe_timeline["labels"]["groups"].includes(tag)}
                <Badge color="purple">{tag}</Badge>
              {/if}
              {#if hybe_timeline["labels"]["people"].includes(tag)}
                <Badge color="blue">{tag}</Badge>
              {/if}
              {#if hybe_timeline["labels"]["companies"].includes(tag)}
                <Badge color="red">{tag}</Badge>
              {/if}
            {/each}
          </div>
          <p class="mb-4 text-base font-normal text-gray-500">
            {item["text"]}
            {#if item["notes"]}
              <br /><br /><small>Note: {item["notes"]}</small>
            {/if}
            {#if item["sources"].length != 0}
              <br />
              {#each item["sources"] as source}
                <a class="text-primary-600" href={source} target="_blank"
                  >({item["sources"].indexOf(source) + 1})</a
                >
              {/each}
            {/if}
          </p>
        </TimelineItem>
      {/if}
    {/each}
  </Timeline>
  {/key}
</Card>
