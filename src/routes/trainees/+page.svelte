<script>
  import { Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, ImagePlaceholder, Modal, Carousel} from "flowbite-svelte";
  import { slide } from 'svelte/transition';
  import { trainees } from "$lib/data/trainees.js";
  let openRow
  let details
  let image
  let doubleClickModal = false
  const toggleRow = (i) => {
    openRow = openRow === i ? null : i
  }
  import { Youtube } from 'svelte-youtube-lite';
</script>

<div class="overflow-hidden -mt-5">
  <Card size="xl" class="float-left mt-5 bg-secondary-1 border-secondary-3 ">
    <Table
      hoverable={true}
      color="custom"
      customeColor="bg-primary-200"
    >
      <TableHead class="bg-primary-500 text-white">
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Years</TableHeadCell>
        <TableHeadCell>Left</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">

    {#each trainees as item, i}
      <TableBodyRow on:click={() => toggleRow(i)}>
        <TableBodyCell class="text-black">{item.name} ({item.kr})</TableBodyCell>
        <TableBodyCell class="text-black">{item.joined}</TableBodyCell>
        <TableBodyCell class="text-black">{item.left}</TableBodyCell>
      </TableBodyRow>
      {#if openRow === i}
        <TableBodyRow on:dblclick={() => {
          doubleClickModal = true;
          details = item;
        }}>
          <TableBodyCell colspan="4" class="p-0">
            <div class="px-2 py-3 flex flex-col bg-primary-100" transition:slide={{ duration: 300, axis: 'y' }}>
              <div class="grid grid-cols-5 gap-4">
                <div class="col-span-2">
                  {#if item.pictures.length > 0}
                  <Carousel images={item.pictures} let:Indicators duration="3000">
                    <Indicators />
                  </Carousel>
                  {/if}
                </div>
                <div class="col-span-3">
                  <p class="text-lg text-black px-5 font-bold">{item.name} ({item.kr})</p>
                </div>
                {#each item.videos as vid}
                  <div class="mt-3">
                    <Youtube id={vid} thumbnail="mqdefault" showTitle="{false}"/>
                  </div>
                {/each}
                </div>
            </div>
          </TableBodyCell>
        </TableBodyRow>
      {/if}
    {/each}
  </TableBody>
</Table>
</Card>
</div>
