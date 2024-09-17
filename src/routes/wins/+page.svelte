<svelte:head>
	<title>GFRIEND Timeline</title>
	<meta name="description" content="GFRIEND Timeline" />
</svelte:head>
<script>
	import Chart from '../../lib/components/Chart.svelte';
	import '../../app.css';
</script>
<section>
<Chart />

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
