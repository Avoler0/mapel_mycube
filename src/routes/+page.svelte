<script  lang="ts">

  import AllCubeList from '$lib/component/AllCubeList.svelte';
  import CharacterList from '$lib/component/CharacterList.svelte';
	import { apiKey } from '$lib/stores/apiKeyStore.ts';
  import { all_cube_result,cube_result,cube_ready } from '$lib/stores/cubeStore.ts';
	import axios from 'axios'
  import InitApiKey from '$lib/component/InitApiKey.svelte';
  import SelectCalendar from '$lib/component/SelectCalendar.svelte';

	export let data;
	const { price,mapleCubeUrl,startDate,endDate } = data;
	let cubeShow = false;

</script>
<div>
	{#if !$apiKey}
		<InitApiKey />
	{:else}
		<SelectCalendar />
		{#if $cube_ready}
			<div class="w-2/6 h-2/6 m-auto text-center mt-6">
				<AllCubeList />
				<CharacterList />
			</div>
		{/if}
	{/if}
</div>


