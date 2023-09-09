<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="root">
	<Header />

	<main class="w-full max-w-screen-xl h-full flex flex-col box-border m-auto">
		<div class="p-2 h-full">
			<slot />
		</div>
	</main>

</div>

