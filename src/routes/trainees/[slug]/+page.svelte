<script>
    import {
        Card,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Modal,
        Carousel,
        Button,
    } from "flowbite-svelte";
    import { ArrowUpRightFromSquareSolid } from "flowbite-svelte-icons";
    import { trainees } from "$lib/data/trainees.js";
    import { page } from "$app/stores";
    import { Youtube } from "svelte-youtube-lite";

    function loadTrainee(url) {
        for (let i in trainees) {
            if (
                trainees[i]["name"].toLowerCase() ===
                url.replace("_", " ").toLowerCase()
            ) {
                return trainees[i];
            }
        }
    }
    let clickOutsideModal;
    let index;
</script>

<div class="overflow-hidden -mt-5">
    <Card size="xl" class="float-left mt-5 bg-secondary-1 border-secondary-3">
        <div class="grid gap-4 md:grid-cols-3 grid-cols-1">
            <div>
                <Table
                    class="w-full"
                    color="custom"
                    customeColor="bg-primary-200"
                >
                    <TableHead
                        class="bg-primary-700 text-white border-black border-2"
                    >
                        <TableHeadCell
                            colspan="2"
                            align="center"
                            class="text-xl normal-case tracking-wider"
                            >{loadTrainee($page.params.slug).name} ({loadTrainee(
                                $page.params.slug,
                            ).kr})</TableHeadCell
                        >
                    </TableHead>
                    <TableBody
                        tableBodyClass="divide-y-2 divide-black border-2 border-black"
                    >
                        {#if loadTrainee($page.params.slug).pictures.length > 0}
                            <TableBodyRow>
                                <TableBodyCell colspan="2">
                                    <div class="w-full grid place-items-end">
                                        <Button
                                            on:click={() =>
                                                (clickOutsideModal = true)}
                                            color="dark"
                                            class="opacity-50 z-10 rounded-none"
                                            ><ArrowUpRightFromSquareSolid
                                                color="white"
                                            /></Button
                                        >
                                    </div>
                                    <div class="-mt-10">
                                        <Carousel
                                            images={loadTrainee(
                                                $page.params.slug,
                                            ).pictures}
                                            bind:index
                                            let:Indicators
                                        >
                                            <Indicators />
                                        </Carousel>
                                    </div>
                                </TableBodyCell>
                            </TableBodyRow>
                        {/if}
                        {#if loadTrainee($page.params.slug).year}
                            <TableBodyRow color="custom">
                                <TableBodyCell class="bg-primary-500"
                                    >Birth Year</TableBodyCell
                                >
                                <TableBodyCell class="bg-primary-300"
                                    >{loadTrainee($page.params.slug)
                                        .year}</TableBodyCell
                                >
                            </TableBodyRow>
                        {/if}
                        {#if loadTrainee($page.params.slug).joined}
                            <TableBodyRow color="custom">
                                <TableBodyCell class="bg-primary-500"
                                    >Joined</TableBodyCell
                                >
                                <TableBodyCell class="bg-primary-300"
                                    >{loadTrainee($page.params.slug).joined}
                                </TableBodyCell>
                            </TableBodyRow>
                        {/if}
                        {#if loadTrainee($page.params.slug).left}
                            <TableBodyRow color="custom">
                                <TableBodyCell class="bg-primary-500"
                                    >Left</TableBodyCell
                                >
                                <TableBodyCell class="bg-primary-300"
                                    >{loadTrainee($page.params.slug).left}
                                </TableBodyCell>
                            </TableBodyRow>
                        {/if}
                    </TableBody>
                </Table>
            </div>
            <div class="col-span-2">
            </div>
            </div>
        <div class="grid gap-4 md:grid-cols-4 grid-cols-1 py-2">
                {#each loadTrainee($page.params.slug).videos as vid}
                    <Youtube
                        id={vid}
                        thumbnail="mqdefault"
                        showTitle={false}
                    />
                {/each}
        </div>
        <Modal
            bind:open={clickOutsideModal}
            autoclose
            outsideclose
            dismissable={false}
            bodyClass="p-0 md:p-0"
            color="none"
            align="center"
            shadow={false}
        >
            <img
                class="opacity-100"
                src={`${loadTrainee($page.params.slug)["pictures"][index]["src"]}`}
                alt={loadTrainee($page.params.slug)["pictures"][index]["alt"]}
            />
        </Modal>
        <br />
        <hr class="h-1 bg-black rounded-sm w-4/5 mx-auto" />
        <br />
        {#each loadTrainee($page.params.slug).srcs as srcs, i}
            <h3 id={i + 1}>[{i + 1}] {srcs}</h3>
        {/each}
        {#each loadTrainee($page.params.slug).notes as note, i}
            <h3 id={i + 1}>[{i + 1}] {note}</h3>
        {/each}
    </Card>
</div>
