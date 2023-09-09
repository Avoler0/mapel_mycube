<script lang="ts" >
  import * as cheerio from 'cheerio';
  import { mapleNamuWikiMarkUp } from "$lib/Api/mapleMarkUpApi";
  import ItemCubeInfo from "./ItemCubeInfo.svelte";

  export let items:any;
  let allCubeShow = false;

  const handleAllCubeShow = () => {
    allCubeShow = !allCubeShow;
  }

</script>

{#if items}
  <div class="h-96 overflow-y-scroll">
    {#each Object.entries(items) as [itemKey,value]}
      <div class="border p-2 mb-2">
        {#if itemKey === '모든 큐브'}
          <div class="flex items-end justify-between">
            <div class="text-2xl">
              {itemKey}
            </div>
            <button on:click={handleAllCubeShow}>보여주기</button>
          </div>
          {#if allCubeShow}
            <ItemCubeInfo itemInfo={value} />
          {/if}
        {:else}
          <div class="text-2xl">
            {itemKey}
          </div>
          <ItemCubeInfo itemInfo={value} />
        {/if}
      </div>
    {/each}
  </div>
{/if}