import { writable } from "svelte/store";

export const cube_result = writable({});
export const all_cube_result = writable({});
export const cube_ready = writable(false);

export const cubeClear = () => {
  cube_result.set({})
  all_cube_result.set({})
  cube_ready.set(false)
}