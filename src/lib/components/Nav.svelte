<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  $: activeUrl = $page.url.pathname;
</script>
<div class="w-full bg-gfriend-blue-500">
<Navbar color="primary" class="w-4/5 place-self-center mx-auto">
  <NavBrand href="/">
    <img src="https://i.imgur.com/TModnbu.png" class="me-3 h-6 sm:h-9" alt="GFRIEND Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold text-black">gfriend-6.github.io</span>
  </NavBrand>
  <NavHamburger />
  <NavUl {activeUrl} activeClass="text-gfriend-purple-500" nonActiveClass="hover:text-gfriend-purple-500">
    <NavLi href="/">Home</NavLi>
    <NavLi class="cursor-pointer">
      Profiles<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 inline" />
    </NavLi>
    <Dropdown class="w-44 z-20">
      <DropdownItem href="/profile">GFRIEND</DropdownItem>
      <DropdownItem href="/newjeans">NewJeans</DropdownItem>
      <DropdownItem href="/lesserafim">LE SSERAFIM</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/source-music">Source Music</DropdownItem>
      <DropdownItem href="/ador">ADOR</DropdownItem>
      <DropdownItem href="/hybe">HYBE</DropdownItem>
    </Dropdown>
    <NavLi class="cursor-pointer">
      Achivements<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 inline" />
    </NavLi>
    <Dropdown class="w-44 z-20">
      <DropdownItem href="/wins">Music Show Wins</DropdownItem>
      <DropdownItem href="/accomplishments">Accomplishments</DropdownItem>
    </Dropdown>
    <NavLi href="/timeline">Timeline</NavLi>
  </NavUl>
</Navbar>
</div>