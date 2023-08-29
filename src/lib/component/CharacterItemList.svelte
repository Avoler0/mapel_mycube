<script lang="ts" >
  import ItemCubeInfo from "./ItemCubeInfo.svelte";

  export let items:any;
  let allCubeShow = false;

  const handleAllCubeShow = () => {
    allCubeShow = !allCubeShow;
  }
</script>

<div>
  {#each Object.entries(items) as [key2,value2]}
    <div class="border p-2 mb-2">
      {#if key2 === '모든 큐브'}
        <div class="flex items-end justify-between">
          <div class="text-2xl">
            {key2}
          </div>
          <button on:click={handleAllCubeShow}>보여주기</button>
        </div>
        {#if allCubeShow}
          <ItemCubeInfo itemInfo={value2} />
        {/if}
      {:else}
        <div class="text-2xl">
          {key2}
        </div>
        <ItemCubeInfo itemInfo={value2} />
      {/if}
    </div>
  {/each}
</div>