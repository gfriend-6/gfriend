<script>
    import { Footer, FooterCopyright, FooterLinkGroup, FooterLink,} from 'flowbite-svelte';
  </script>
    <div class="w-full bg-gfriend-blue-500">
    <Footer color="primary" class="w-4/5 place-self-center mx-auto my-3">
    <div class="sm:flex sm:items-center sm:justify-between">
        <div class="overflow-hidden">
            <h2 class="self-center">Made With:</h2>
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-black sm:mt-0">
        <FooterLink href="https://tailwindcss.com/" target="_blank">Tailwind CSS</FooterLink>
        <FooterLink href="https://svelte.dev/">Svelte</FooterLink>
        <FooterLink href="https://flowbite-svelte.com/">Flowbite Svelte</FooterLink>
        <FooterLink href="/">Contact</FooterLink>
        </FooterLinkGroup>
    </div>
    <FooterLinkGroup ulClass="flex flex-wrap items-center mt-3 text-sm text-black sm:mt-0">
      <FooterLink href="https://x.com/TerrifiedPigeon" target="_blank">Contact</FooterLink>
    </FooterLinkGroup>
    </div>
  </Footer>
  </div>