<script lang="ts" >
  import { cube_result } from "$lib/stores/cubeStore";
  import CharacterItemList from "./CharacterItemList.svelte";

  let selectCharacter:string = Object.keys($cube_result)[0];

  const characterSelect = (e) => {
    selectCharacter = e.target.value
  }
</script>

<div class="border p-2 text-left basis-1/12 shrink-0">
  <div class="flex flex-row justify-between mb-2">
    <div class="text-3xl font-bold">캐릭터 목록</div>
    <select class="border p-1outline-0 rounded-none" on:change={characterSelect}>
      {#each Object.entries($cube_result) as [key,_,index]}
        <option value={key} selected={index === 0}>
          {key}
        </option>
      {/each}
    </select>
  </div>
  <CharacterItemList items={$cube_result[selectCharacter]}/>
</div>

<style>
  select {
    background-position: center right;
    background-repeat: no-repeat;

  }
</style>