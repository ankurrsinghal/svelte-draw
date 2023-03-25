import type { Camera } from "$lib/types";
import { derived, writable, type Readable } from "svelte/store";
import { clamp, screenToWorld } from "../utils/utils";
import * as vec from "../utils/vec";
import { createStoreSelector } from "./utils";

const camera = {
  point: [0, 0],
  zoom: 1,
};

function createCameraStore() {
  const { subscribe, update } = writable<Camera>(camera);
  
  function zoomCamera(payload: { delta: number; point: number[] }) {
    update(camera => {
      const p0 = screenToWorld(payload.point, camera)
      camera.zoom = clamp(
        camera.zoom - (payload.delta / 100) * camera.zoom,
        0.5,
        3
      )
      const p1 = screenToWorld(payload.point, camera)
      camera.point = vec.add(camera.point, vec.sub(p1, p0))

      return camera;
    });
  }
  function panCamera(payload: { delta: number[]; point: number[] }) {
    update(camera => {
      camera.point = vec.sub(
        camera.point,
        vec.div(payload.delta, camera.zoom)
      );

      return camera;
    })
  };

  return {
    subscribe,
    actions: {
      zoomCamera,
      panCamera,
    }
  }
}
  
export const cameraStore = createCameraStore();
export const cameraSeletor = createStoreSelector(cameraStore);