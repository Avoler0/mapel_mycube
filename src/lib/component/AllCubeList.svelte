<script lang="ts" >
  import { all_cube_result } from "$lib/stores/cubeStore";
</script>

<div class="border p-2 text-left mb-4">
  <div class="text-3xl font-bold">전체 사용 큐브 목록</div>
  <div class="mt-2">
    {#each Object.entries($all_cube_result) as [key,value]}
      <div>
        <div class="flex">
          <div class="mr-2">{key}:</div>
          <div>{value}</div>
        </div>
        
      </div>
    {/each}
  </div>
</div>