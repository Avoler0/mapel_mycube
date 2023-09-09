<script lang="ts">
  import { mapleApi } from '$lib/Api/mapleOpenApi';
  import { apiKey } from '$lib/stores/apiKeyStore';
  import { dateSelect } from '$lib/stores/calendarStore';
  import { all_cube_result, cubeClear, cube_ready, cube_result } from '$lib/stores/cubeStore';
	import localeKr from 'air-datepicker/locale/ko';
  import { createPopper } from '@popperjs/core';
  import AirDatepicker from 'air-datepicker'
  import 'air-datepicker/air-datepicker.css'
  import { onMount } from 'svelte';
  import { dateArray } from '$lib/utils/date';

  let start = {
    date:null as Date | null,
    format:null as String | null
  };
  let end = {
    date:null as Date | null,
    format:null as String | null
  };

  let dateReady = false;

  onMount(() => {
    new AirDatepicker('#calendar',{
      classes:'w-full',
      container:'#cco',
      inline:false,
      startDate: '2022-01-11',
      range: true,
      multipleDatesSeparator: ' - ',
      locale: localeKr,
      minDate:new Date(2010,5,13),
      // minDate:new Date(2023,4,5),
      maxDate:new Date(),
      dateFormat(date) {
        return date.toLocaleString('kr', {
            year: 'numeric',
            day: '2-digit',
            month: 'long'
        });
    },
      onSelect:(data) => {
        const {date,formattedDate, datepicker} = data as {date:Date[],formattedDate:String[]};

        start.date = date[0];
        start.format = formattedDate[0];

        end.date = date[1];
        end.format = formattedDate[1]

        if(start.format && end.format) dateReady = true;
        else dateReady = false;
      },
    })
    
    const calendarContain:HTMLDivElement | null = document.querySelector('.air-datepicker')
    const calendarDayShortName:HTMLDivElement | null = document.querySelector('.air-datepicker-body--day-names')
    const navYearTitle:HTMLDivElement | null = document.querySelector('.air-datepicker-nav--title')
    
    const selectYear:HTMLDivElement | null = document.querySelector('.air-datepicker-cell.-year-')
    
    calendarContain!.style.setProperty('--adp-width','100%');
    calendarContain!.style.height = '380px';
    
    calendarContain!.style.setProperty('--adp-font-size','1.3rem');
    calendarContain!.style.setProperty('--adp-cell-border-radius','0');
    calendarContain!.style.setProperty('--adp-year-cell-height','110px');
    calendarContain!.style.setProperty('--adp-month-cell-height','70px');
    calendarContain!.style.setProperty('--adp-day-cell-height','50px');

    calendarDayShortName!.style.fontSize = '1.1rem';
    calendarDayShortName!.style.fontWeight = 'bold'
    
    navYearTitle!.style.fontSize = '1.3rem'
    calendarDayShortName!.style.fontWeight = '500'
  })
  
  const handleMapleApi = () => mapleApi(start.date,end.date,$apiKey)

  const handleApiRemove = () => {
    apiKey.set('');
  }
  const consoleGoGo = () => {
    console.log($cube_ready)
	}
</script>




<div id="date-set" class={`${$cube_ready && 'active'} h-fit mx-auto text-center transition-all`}>
  <div class="mb-4">
    <h3 class="text-4xl font-bold">날짜 설정</h3>
  </div>
  <div class="w-full h-2/6 mb-4">
    <section class="w-fit m-auto">
      <div id="calendar" class="w-96 border-b-0" />
      <div class="flex justify-around h-8 p-1 mt-2 content-box border border-gray-400 rounded ">
        {#if dateReady}
          <span class="float-right mr-0.5">{start.format}</span>
          <span>~</span>
          <span class="float-left ml-0.5">{end.format}</span>
        {/if}
      </div>
    </section>
  </div>
  <div class="flex flex-col w-full text-center items-center font-bold">
    <button class="inline-block w-full border mb-2 p-4 bg-cyan-50 w-48" on:click={handleMapleApi}>
			확인
		</button>
		<button class="inline-block w-full border mb-2 p-4 bg-cyan-50 w-48" on:click={handleApiRemove}>
			API 키 삭제
		</button>
    <button class="ddd inline-block w-full border mb-2 p-4 bg-cyan-50 w-48" on:click={cubeClear}>
			다시 하기
		</button>
		<button class="ddd inline-block w-full border p-4 bg-cyan-50 w-48" on:click={consoleGoGo}>
			리설
		</button>
  </div>
</div>

<style>
  @keyframes fadeInDown {
      0% {
          opacity: 0;
          transform: translate3d(0, 50%, 0);
      }
      to {
          opacity: 1;
          transform: translateZ(0);
      }
  }
  #date-set.active{
    animation: fadeInDown 1s;
    
  }
</style>