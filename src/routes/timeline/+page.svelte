<script>
  import {
    Timeline,
    TimelineItem,
    Badge,
    Card,
    Checkbox,
    Button,
    DropdownDivider, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { AngleRightOutline, ChevronDownOutline } from "flowbite-svelte-icons";
  import { hybe_timeline } from "../../lib/data/hybe-timeline.js";
  let timeline_events = hybe_timeline["events"];
  $: values = {
    'GFriend': true,
    'NewJeans': true,
    'LE SSERAFIM': true,
    'Team N': true,
    'Team S': true,
    'Min Hee-Jin': true,
    'HYBE': true,
    'BigHit': true,
    'Belift': true,
    'Source Music': true,
    'Pledis': true,
    'KOZ': true,
    'ADOR': true,
  };
  const static_all = {
    'GFriend': true,
    'NewJeans': true,
    'LE SSERAFIM': true,
    'Team N': true,
    'Team S': true,
    'Min Hee-Jin': true,
    'HYBE': true,
    'BigHit': true,
    'Belift': true,
    'Source Music': true,
    'Pledis': true,
    'KOZ': true,
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
  function resetF() {
    values = {
    'GFriend': true,
    'NewJeans': true,
    'LE SSERAFIM': true,
    'Team N': true,
    'Team S': true,
    'Min Hee-Jin': true,
    'HYBE': true,
    'BigHit': true,
    'Belift': true,
    'Source Music': true,
    'Pledis': true,
    'KOZ': true,
    'ADOR': true,
    }
    update()
  }
  function clearF() {
    values = {
    'GFriend': false,
    'NewJeans': false,
    'LE SSERAFIM': false,
    'Team N': false,
    'Team S': false,
    'Min Hee-Jin': false,
    'HYBE': false,
    'BigHit': false,
    'Belift': false,
    'Source Music': false,
    'Pledis': false,
    'KOZ': false,
    'ADOR': false,
    }
    update()
  }
  function allF() {
    let placeholder = true
    for (let val in values) {
      if (values[val] != static_all[val] && placeholder === true) {
        placeholder = false
      }
    }
    if (placeholder) {
      clearF()
    } else {
      resetF()
    }
  }
  function toggleF(...args) {
    clearF()
    for (let arg in args) {
      values[args[arg]] = true
    }
  }
</script>
<div class="overflow-hidden -mt-5">

<!-- Filters -->
  <Card class="float-right mt-5 space-y-2">
    <div>
      Groups
      <Checkbox checked={values["GFriend"]} on:change={() => switchVal("GFriend")}>GFriend</Checkbox>
      <Checkbox checked={values["NewJeans"]} on:change={() => switchVal("NewJeans")}>NewJeans</Checkbox
      >
      <Checkbox checked={values["LE SSERAFIM"]} on:change={() => switchVal("LE SSERAFIM")}
        >LE SSERAFIM</Checkbox
      >
    </div>
    <div>
      Trainee Groups
      <Checkbox checked={values["Team N"]} on:change={() => switchVal("Team N")}>Team N</Checkbox>
      <Checkbox checked={values["Team S"]} on:change={() => switchVal("Team S")}>Team S</Checkbox>
    </div>
    <div>
      People
      <Checkbox checked={values["Min Hee-Jin"]} on:change={() => switchVal("Min Hee-Jin")}
        >Min Hee-Jin</Checkbox
      >
    </div>
    <div>
      Companies
      <Checkbox checked={values["Source Music"]} on:change={() => switchVal("Source Music")}
        >Source Music</Checkbox
      >
      <Checkbox checked={values["ADOR"]} on:change={() => switchVal("ADOR")}>ADOR</Checkbox>
    </div>
    <div class="flex place-content-center space-x-4">
      <Button color="red" on:click={allF} class="w-1/3 h-10 ">Toggle All</Button>
      <Button on:click={update} class="w-1/3 h-10">Filter</Button>
    </div>
    <DropdownDivider class="bg-black"/>
    <Button>Presets<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" /></Button>
    <Dropdown>
      <DropdownItem on:click={() => toggleF('Min Hee-Jin')}>Min Hee-Jin</DropdownItem>
      <DropdownItem on:click={() => toggleF('NewJeans', 'Team N')}>NewJeans</DropdownItem>
    </Dropdown>
  </Card>

<Card size="lg" class="float-left mt-5">
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
</div>
