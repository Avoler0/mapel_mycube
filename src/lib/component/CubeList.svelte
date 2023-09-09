<script lang="ts">
  import { all_cube_result } from "$lib/stores/cubeStore";
  import AllCubeList from "./AllCubeList.svelte";
  import CharacterList from "./CharacterList.svelte";

  
</script>

<div id="cube-list" class="m-auto w-full">
  <div class="mb-4">
    <h3 class="text-4xl font-bold">큐브 목록</h3>
  </div>
  {#if $all_cube_result}
    <div class="flex flex-col h-full border">
      <AllCubeList />
      <CharacterList />
    </div>
  {:else}
    <div class="flex-1">조회 가능한 큐브 목록이 없습니다.</div>
  {/if}
  
</div>

<style>
  @keyframes fadeInDown {
      0% {
          opacity: 0;
          transform: translate3d(0, -10%, 0);
      }
      to {
          opacity: 1;
          transform: translateZ(0);
      }
  }
  #cube-list{
    animation: fadeInDown 1s;
    
  }
</style>