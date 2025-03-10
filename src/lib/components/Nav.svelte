<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  $: activeUrl = $page.url.pathname;
</script>
<div class="w-full bg-accent-3">
<Navbar color="primary" class="w-4/5 place-self-center mx-auto">
  <NavBrand href="/">
    <img src="https://i.imgur.com/TModnbu.png" class="me-3 h-6 sm:h-9" alt="GFRIEND Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold text-black">Buddyville</span>
  </NavBrand>
  <NavHamburger />
  <NavUl {activeUrl} activeClass="font-bold text-accent-1" nonActiveClass="text-accent-5 hover:text-white">
    <NavLi href="/">Home</NavLi>
    <NavLi class="cursor-pointer">
      Achivements<ChevronDownOutline class="w-6 h-6 ms-2 text-accent-5 inline" />
    </NavLi>
    <Dropdown class="w-45 z-20">
      <DropdownItem href="/wins">Music Show Wins</DropdownItem>
      <DropdownItem href="/accomplishments">Accomplishments</DropdownItem>
    </Dropdown>
    <NavLi class="cursor-pointer">
      Timelines<ChevronDownOutline class="w-6 h-6 ms-2 text-accent-5 inline" />
    </NavLi>
    <Dropdown class="w-45 z-20">
      <DropdownItem href="/snapshots/1">Full</DropdownItem>
      <DropdownItem href="/snapshots/2">Source Music NGGs (2022)</DropdownItem>
      <DropdownItem href="/snapshots/3">Source Music Trainees</DropdownItem>
    </Dropdown>
  </NavUl>
</Navbar>
</div>