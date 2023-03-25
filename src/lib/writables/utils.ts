import { derived, type Readable } from "svelte/store";

export function createStoreSelector<T>(store: Readable<T>) {
  return function selector<P>(fn: (state: T) => P): Readable<P> {
    return derived(store, $store => fn($store));
  }
}