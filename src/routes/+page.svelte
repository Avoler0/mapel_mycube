<script>
  import { apiKey } from '$lib/stores/apiKeyStore.ts';
  import { redCube,blackCube } from '$lib/stores/cubeStore.ts';
	import axios from 'axios'

	export let data;
	const { price,mapleCubeUrl,startDate,endDate } = data;
	let key = '';
	let ok = false;
	// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjIwMTk0NTk4OSIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzA4Njg3MDc0LCJpYXQiOjE2OTMxMzUwNzQsIm5iZiI6MTY5MzEzNTA3NCwic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.KD4zOLZhkgAtSiq90upefiqy2clxTfFFSLtj9dHimmw
	// let api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjE2ODMxNTI4NyIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzA4NjI2NTMyLCJpYXQiOjE2OTMwNzQ1MzIsIm5iZiI6MTY5MzA3NDUzMiwic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.6eVFGnPrxoJJUg9tfTG5QBrWGQdWznW8t-BaH_3Amn4';

	const handleClick = (e) => {
		apiKey.set(key)
	}
	const maple = async (i) => {
		await axios.get(mapleCubeUrl,{
			timeout:1000,
			headers:{
				Authorization:$apiKey
			},
			params:{
				count:1000,
				date:datePlus(i),
				cursor:''
		}})
	}
	const mapleApi = async () => {
		const diff = dateDiff()

		if(diff < 0) alert('날짜 다시 설정해라');

		let rc = 0;
		let bc = 0;
		let err = 0
		
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
			response.forEach((res)=>{
				if(res.status === 'rejected') return;

				const { cube_histories } = res.value.data;

				cube_histories.forEach((element) => {
					if(element.cube_type === '레드 큐브'){
						redCube.update(e => e + 1)
					}else if(element.cube_type === '블랙 큐브'){
						blackCube.update(e => e + 1)
					}
				});
			})

			ok = true;
		})
		.catch((err)=>{
			console.log('에러',err)
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
			<button on:click={handleClick}>
				클릭
			</button>
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
	</div>

	{#if ok}
		<div>
			<div>큐브 사용 횟수</div>
			<div>
				<div>레드 큐브</div>
				<div>횟수 : {$redCube}</div>
				<div>가격 : {$redCube * price.redCube}</div>
			</div>
			<div>
				<div>블랙 큐브</div>
				<div>횟수 : {$blackCube}</div>
				<div>가격 : {$redCube * price.blackCube}</div>
			</div>
		</div>
	{/if}
	{/if}
</div>


