import { all_cube_result, cube_ready, cube_result } from "$lib/stores/cubeStore";
import { dateDiff, datePlus } from "$lib/utils/date";
import axios from "axios";

export const mapleApi = async (startDate,endDate,apiKey) => {
    if(!startDate || !endDate) return alert('날짜 다시 설정해라');

		const diff = dateDiff(startDate,endDate)

		if(diff < 0) alert('날짜 다시 설정해라');
		

		Promise.allSettled(
			 [...Array(parseInt(diff))].map((_,i)=>{
			return axios.get('https://public.api.nexon.com/openapi/maplestory/v1/cube-use-results',{
				headers:{
					Authorization:apiKey
				},
				params:{
					count:1000,
					date:datePlus(startDate,i),
					cursor:''
			}})
		}))
		.then((response)=>{
			const result = response.reduce((prev:any,next:any)=>{
					if(next.status === 'rejected') return prev;
					if(next.value.data.cube_histories.length === 0 ) return prev;
						

					const { cube_histories } = next.value.data;
					cube_histories.forEach((element:any) => {
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
			alert('큐브 데이터를 불러오는 중 에러 발생...')
      location.reload()
		})
		.finally(()=>{
      cube_ready.set(true);
		})
		
		
	}