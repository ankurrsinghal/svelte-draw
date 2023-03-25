import type { Bounds, Camera, Point } from "$lib/types";
import { derived, writable, type Readable } from "svelte/store";
import { clamp, getBoundsFromPoints, screenToWorld, getPointerEventInfo } from "../utils/utils";
import * as vec from "../utils/vec";
import { createStoreSelector } from "./utils";


function createBrushStore() {
  const { subscribe, set, update } = writable<Bounds | undefined>(undefined);

  let origin: Point | undefined;

  function startBrush(point: ReturnType<typeof getPointerEventInfo>, camera: Camera) {
    origin = screenToWorld(point.point, camera);
  }

  function updateBrush(point: ReturnType<typeof getPointerEventInfo>, camera: Camera) {
    if (origin) {
      const bounds = getBoundsFromPoints(origin, screenToWorld(point.point, camera));
      set(bounds);
    }
  }

  function doneBrush(point: ReturnType<typeof getPointerEventInfo>) {
    origin = undefined;
    set(undefined);
  }

  function cancelBrush(point: ReturnType<typeof getPointerEventInfo>) {

  }

  return {
    subscribe,
    actions: {
      startBrush,
      updateBrush,
      doneBrush,
      cancelBrush
    }
  }
}
  
export const brushStore = createBrushStore();
export const brushSeletor = createStoreSelector(brushStore);