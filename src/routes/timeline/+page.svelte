<script>
  import { Card, Checkbox, Button, DropdownDivider, Dropdown, DropdownItem } from 'flowbite-svelte';
  import TimelineItem from '../../lib/components/TimelineItem.svelte'
  import Timeline from '../../lib/components/Timeline.svelte'
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { hybe_timeline } from "../../lib/data/timeline.js";
  let timeline_events = hybe_timeline["events"];
  const static_all_true = {
    'Music': true,
    'Trainee': true,
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
  const static_all_false = {
    'Music': false,
    'Trainee': false,
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
  };
  let values = JSON.parse(JSON.stringify(static_all_true))
  /**
   * @param {string} val
   */
  function switchVal(val) {
    values[val] = !values[val]
    update()
  }
  function checkCheckbox(label) {
    let labels = []
    for (let labelCategoryNames in hybe_timeline["labels"]["labelCategoryNames"]) {
      for (let tag in label[hybe_timeline["labels"]["labelCategoryNames"][labelCategoryNames]]) {
        labels.push(label[hybe_timeline["labels"]["labelCategoryNames"][labelCategoryNames]][tag])
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
  let update_var = 0
  function update() {
    update_var += 1
  }
  function resetF() {
    values = JSON.parse(JSON.stringify(static_all_true))
    update()
  }
  function clearF() {
    values = JSON.parse(JSON.stringify(static_all_false))
    update()
  }
  function allF() {
    let placeholder = true
    for (let val in values) {
      if (values[val] != static_all_true[val] && placeholder === true) {
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
    <div>
      Event Type
      <Checkbox checked={values["Music"]} on:change={() => switchVal("Music")}>Musical Release</Checkbox
      >
      <Checkbox checked={values["Trainee"]} on:change={() => switchVal("Trainee")}>New Trainee</Checkbox>
    </div>
    <div class="flex place-content-center space-x-4">
      <Button color="red" on:click={allF} class="w-1/3 h-10 ">Toggle All</Button>
    </div>
    <DropdownDivider class="bg-black"/>
    <Button>Presets<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" /></Button>
    <Dropdown>
      <DropdownItem on:click={() => toggleF('GFriend')}>GFriend</DropdownItem>
      <DropdownItem on:click={() => toggleF('Min Hee-Jin')}>Min Hee-Jin</DropdownItem>
      <DropdownItem on:click={() => toggleF('NewJeans', 'Team N')}>NewJeans</DropdownItem>
    </Dropdown>
  </Card>

<Card size="lg" class="float-left mt-5">
  {#key update_var}
  <Timeline order="default">
    {#each timeline_events as item}
      {#if checkCheckbox(item["labels"])}
        <TimelineItem title={item["title"]} date={item["date"]} desc={item["text"] ? true : false }>
          <p class="mb-4 text-base font-normal text-gray-500">
            {item["text"]}
            {#if item["notes"]}
              <br /><br /><i>Note: {item["notes"]}</i>
            {/if}
            {#if item["sources"].length != 0}
              <br /><small>Sources:
              {#each item["sources"] as source}
                <a class="text-primary-600" href={source} target="_blank"
                  >({item["sources"].indexOf(source) + 1})</a
                >
              {/each}
            </small>
            {/if}
          </p>
        </TimelineItem>
      {/if}
    {/each}
  </Timeline>
  {/key}
</Card>
</div>
