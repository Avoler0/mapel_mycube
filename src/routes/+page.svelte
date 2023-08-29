<script  lang="ts">
  import AllCubeList from '$lib/component/AllCubeList.svelte';
  import CharacterList from '$lib/component/CharacterList.svelte';
import { apiKey } from '$lib/stores/apiKeyStore.ts';
  import { all_cube_result,cube_result } from '$lib/stores/cubeStore.ts';
	import axios from 'axios'

	export let data;
	const { price,mapleCubeUrl,startDate,endDate } = data;
	let key = '';
	let cubeShow = false;
	let show = {};
	const nameApiKey = {
		dlgustn: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjIwMTk0NTk4OSIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzA4Njg3MDc0LCJpYXQiOjE2OTMxMzUwNzQsIm5iZiI6MTY5MzEzNTA3NCwic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.KD4zOLZhkgAtSiq90upefiqy2clxTfFFSLtj9dHimmw',
		wjddbstj: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjE2ODMxNTI4NyIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzA4NjI2NTMyLCJpYXQiOjE2OTMwNzQ1MzIsIm5iZiI6MTY5MzA3NDUzMiwic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.6eVFGnPrxoJJUg9tfTG5QBrWGQdWznW8t-BaH_3Amn4',
		rlarjs: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjY3NTQxMTI1IiwiYXV0aF9pZCI6IjIiLCJleHAiOjE3MDg3MTk2NTAsImlhdCI6MTY5MzE2NzY1MCwibmJmIjoxNjkzMTY3NjUwLCJzZXJ2aWNlX2lkIjoiNDMwMDExMzk3IiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIn0.-SnBX14WH6KIWheQ9UpaUbLc8JS6wKYEJ9kF8NKLedQ',
		wkddytpq: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjUzNzQyMDQ3NiIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzA4NzgxMDE3LCJpYXQiOjE2OTMyMjkwMTcsIm5iZiI6MTY5MzIyOTAxNywic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.ykto1jlYK3kRjYK-iCe4HrewaJwi40M_DvXiiXzVwso'
	}
	
	const handleApiSetOnClick = () => {
		apiKey.set(key)
	}

	const handleApiRemove = () => {
		apiKey.set('')
	}

	const promptApiKeyName = () => {
		const name = prompt('API 이름 입력')

		apiKey.set(nameApiKey[name])
	}


	const mapleApi = async () => {
		const diff = dateDiff()

		if(diff < 0) alert('날짜 다시 설정해라');
		
		Promise.allSettled(
			 [...Array(parseInt(diff))].map((_,i)=>{
			return axios.get('https://public.api.nexon.com/openapi/maplestory/v1/cube-use-results',{
				headers:{
					Authorization:$apiKey
				},
				params:{
					count:1000,
					date:datePlus(i),
					cursor:''
			}})
		}))
		.then((response)=>{
			const result = response.reduce((prev:any,next:any)=>{
					if(next.status === 'rejected') return prev;
					if(next.value.data.cube_histories.length === 0 ) return prev;
						

					const { cube_histories } = next.value.data;
					cube_histories.forEach((element) => {
						const {character_name,cube_type,item_equip_part,target_item,potential_option_grade} = element;

						if(prev.length === 0) prev = { '모든 큐브':{} };
						if(!prev['모든 큐브'][cube_type]) prev['모든 큐브'][cube_type] = 0;
						if(!prev[character_name]) prev[character_name] = { '모든 큐브': {} };
						if(!prev[character_name]['모든 큐브'][cube_type]) prev[character_name]['모든 큐브'][cube_type] = 0;
						if(!prev[character_name][target_item]) prev[character_name][target_item] = {};
						if(!prev[character_name][target_item][cube_type]) prev[character_name][target_item][cube_type] = 0;

						prev['모든 큐브'][cube_type]++;
						prev[character_name]['모든 큐브'][cube_type]++;
						prev[character_name][target_item][cube_type]++;

					},{})

					return prev;
				}, [])

				all_cube_result.set(result['모든 큐브'])
				delete result['모든 큐브']
				cube_result.set(result);
				console.log('리설트',result)
			
		})
		.catch((err)=>{
			console.log('에러',err)
		})
		.finally(()=>{
			
			cubeShow = true;
			console.log('파이널리 실행',cubeShow)
		})
		
		
	}
	
	const dateDiff = () => {
		const start = new Date(startDate.year,startDate.month,startDate.day)
		const end = new Date(endDate.year,endDate.month,endDate.day)
		const diffDate = (end.getTime() - start.getTime()) / (1000*60*60*24);

		return diffDate;
	}

	const datePlus = (day) => {
		const start = new Date(startDate.year,startDate.month,startDate.day)
		const plusDate = new Date(start.getFullYear(),start.getMonth(),start.getDate()+day)
		const plusMonth = plusDate.getMonth() === 0 ? 12 : plusDate.getMonth()

		return plusDate.getFullYear()+"-"+String(plusMonth).padStart(2,'0')+"-"+String(plusDate.getDate()).padStart(2,'0');
	}

	const consoleGoGo = () => {
		Object.entries(cubeRe).forEach(([key,value])=>{
			console.log('키',key,'밸류',value)
		})
	}

	const chShow = (key) => {
		show = {};
		if(show[key]) show[key] = false;
		else show[key] = true;
	}
</script>
<div>
	{#if !$apiKey}
		<div class="w-2/6 h-2/6 m-auto text-center mt-6">
			<label for="api_key">
				<span>API 키 입력</span>
				<input id="api_key"
					class="border"
					bind:value={key}
				/>
			</label>
			<button on:click={handleApiSetOnClick}>
				클릭
			</button>
			<div>
				<button on:click={promptApiKeyName}>
					이름 입력
				</button>
			</div>
			<div>
				<div>
					API 키 만들러 가기
				</div>
				<div>
					<a href="https://developers.nexon.com/Maplestory" target="_blank">사이트!</a>
				</div>
			</div>
		</div>
	{:else}
	<div class="w-2/6 h-2/6 m-auto text-center mt-12">
		<div>시작 날짜 설정</div>
		<div class="w-fit flex m-auto">
			<div class="mr-2">
				<div>년</div>
				<select bind:value={startDate.year}>
					{#each [2022,2023] as y }
						<option value={y}>
							{y}
						</option>
					{/each}
				</select>
			</div>
			<div class="mr-2">
				<div>월</div>
				<select bind:value={startDate.month}>
					{#each [...Array(parseInt(12))] as _,index }
						<option value={index+1}>
							{index+1}
						</option>
					{/each}
				</select>
			</div>
			<div >
				<div>일</div>
				<select bind:value={startDate.day}>
					{#each [...Array(parseInt(31))] as _,index }
						<option value={index+1}>
							{index+1}
						</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<div class="w-2/6 h-2/6 m-auto text-center mt-6">
		<div>끝 날짜 설정</div>
		<div class="w-fit flex m-auto">
			<div class="mr-2">
				<div>년</div>
				<select bind:value={endDate.year}>
					{#each [2022,2023] as y }
						<option value={y}>
							{y}
						</option>
					{/each}
				</select>
			</div>
			<div class="mr-2">
				<div>월</div>
				<select bind:value={endDate.month}>
					{#each [...Array(parseInt(12))] as _,index }
						<option value={index+1}>
							{index+1}
						</option>
					{/each}
				</select>
			</div>
			<div >
				<div>일</div>
				<select bind:value={endDate.day}>
					{#each [...Array(parseInt(31))] as _,index }
						<option value={index+1}>
							{index+1}
						</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<div class="text-center mt-2">
		<button class="inline-block p-4 bg-cyan-50 w-48" on:click={mapleApi}>
			확인
		</button>
		<button on:click={handleApiRemove}>
			API 키 삭제
		</button>
		<button on:click={consoleGoGo}>
			리설
		</button>
	</div>
	{#if cubeShow}
		<div class="w-2/6 h-2/6 m-auto text-center mt-6">
			<AllCubeList />
			<CharacterList />
		</div>
	{/if}
	{/if}
</div>


