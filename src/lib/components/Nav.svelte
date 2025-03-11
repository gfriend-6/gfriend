<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import logo from '$lib/images/logo.png';

  $: activeUrl = $page.url.pathname;
</script>
<div class="w-full bg-primary-2">
<Navbar class="w-4/5 place-self-center mx-auto bg-primary-2">
  <NavBrand href="/">
    <img src={logo} class="me-3 size-16 sm:size-8" alt="logo"/>
    <span class="self-center whitespace-nowrap text-xl font-semibold text-black">Eye of the Storm</span>
  </NavBrand>
  <NavHamburger />
  <NavUl {activeUrl} activeClass="font-bold text-primary-3" nonActiveClass="text-accent-5 hover:text-white">
    <NavLi href="/">Home</NavLi>
    <NavLi href="/timeline">Timeline</NavLi>
  </NavUl>
</Navbar>
</div>
