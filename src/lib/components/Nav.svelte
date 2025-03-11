<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import logo from '$lib/images/logo.svg';

  $: activeUrl = $page.url.pathname;
</script>
<div class="w-full bg-accent-3">
<Navbar color="primary" class="w-4/5 place-self-center mx-auto">
  <NavBrand href="/">
    <img src={logo} class="me-3 h-6 sm:h-9" alt="logo"/>
    <span class="self-center whitespace-nowrap text-xl font-semibold text-black">Eye of the Storm</span>
  </NavBrand>
  <NavHamburger />
  <NavUl {activeUrl} activeClass="font-bold text-accent-1" nonActiveClass="text-accent-5 hover:text-white">
    <NavLi href="/">Home</NavLi>
    <NavLi href="/timeline">Timeline</NavLi>
  </NavUl>
</Navbar>
</div>