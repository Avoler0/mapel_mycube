<script lang="ts" >
  export let itemInfo:any;

  
</script>

<div>
  {#each Object.entries(itemInfo) as [key3,value3]}
    <div class="flex">
      <div class="mr-2">{key3}:</div>
      <div>{value3}</div>
    </div>
  {/each}
</div>