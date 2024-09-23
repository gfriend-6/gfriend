<!-- Modified Version of https://flowbite-svelte.com/docs/components/timeline -->

<script>import { twMerge } from "tailwind-merge";
    let olClasses = "relative border-s border-black dark:border-gray-700"
    </script>
    
    <ol class={twMerge(olClasses, $$props.class)}>
      <slot />
    </ol>
    
    <!--
    @component
    [Go to docs](https://flowbite-svelte.com/)
    ## Props
    @prop export let order: 'default' | 'vertical' | 'horizontal' | 'activity' | 'group' = 'default';
    -->
    