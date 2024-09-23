<!-- Modified Version of https://flowbite-svelte.com/docs/components/timeline -->
<script>
    import { ChevronDownOutline } from "flowbite-svelte-icons";
    import collapse from 'svelte-collapse'
    let open = false
    export let desc = false
    export let title = "";
    export let date = "";
    const liClasses = "mb-10 ms-4"
    const divClasses = "absolute w-3 h-3 bg-primary-600 rounded-full mt-1.5 -start-1.5 border border-white"
    const timeClasses = "mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-500"
    const h3Cls = "text-lg font-semibold text-gray-900 dark:text-white"
    </script>
    
    <li class={liClasses}>
      <div class={divClasses}></div>
        <time class={timeClasses}>{date}</time>
    
      {#if title}
      <div>
      <h3 class={h3Cls}>
        {#if desc}
        <button on:click={() => open = !open} class="justify-between flex">
            {title}
            <div class="justify-center ms-2 items-center w-6 h-6 bg-gray-200 rounded-full">
            <ChevronDownOutline class="w-6 h-6 ms-0 text-black" />
            </div>
        </button>
        {:else}
            {title}
        {/if}
        </h3>
        </div>
      {/if}
    
    <div use:collapse={{open}}>
        <slot></slot>
    </div>
    </li>
    <!--
    @component
    [Go to docs](https://flowbite-svelte.com/)
    ## Props
    @prop export let title: string = '';
    @prop export let date: string = '';
    @prop export let svgClass: string = 'w-3 h-3 text-primary-600 dark:text-primary-400';
    -->
    