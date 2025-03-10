<script>
	import '../app.css';
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>
<header>
	<Nav />
</header>
<div class="app bg-background">
	<main>
		<slot />
	</main>
</div>
<footer>
	<Footer />
</footer>
<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 72rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

</style>
