<script  lang="ts">

  import AllCubeList from '$lib/component/AllCubeList.svelte';
  import CharacterList from '$lib/component/CharacterList.svelte';
	import { apiKey } from '$lib/stores/apiKeyStore.ts';
  import { all_cube_result,cube_result,cube_ready } from '$lib/stores/cubeStore.ts';
	import axios from 'axios'
  import InitApiKey from '$lib/component/InitApiKey.svelte';
  import SelectCalendar from '$lib/component/SelectCalendar.svelte';
  import CubeList from '$lib/component/CubeList.svelte';

	export let data;
	const { price,mapleCubeUrl,startDate,endDate } = data;
	let cubeShow = false;

</script>
<div class='h-full text-center'>
	{#if !$apiKey}
		<InitApiKey />
	{:else}
		<div class="h-full border">
			<div class="flex flex-1 justify-between pt-8">
				<SelectCalendar />
				{#if $cube_ready}
					<div class="h-full  m-auto text-center">
						<CubeList />
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>


