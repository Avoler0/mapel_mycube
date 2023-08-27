<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="root">
	<Header />

	<main class="w-full max-w-screen-xl flex flex-col box-border m-auto">
			<slot />
	</main>

</div>

