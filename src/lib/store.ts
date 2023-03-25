import { derived, writable } from "svelte/store";
import type { IData } from "./types";
import { clamp, screenToWorld } from "./utils/utils";
import * as vec from "./utils/vec";

const initialData: IData = {
  camera: {
    point: [0, 0],
    zoom: 1,
  },
}

function createStore() {
  const { subscribe, update } = writable<IData>(initialData);
  
  function zoomCamera(payload: { delta: number; point: number[] }) {
    update(data => {
      const { camera } = data
      const p0 = screenToWorld(payload.point, data)
      camera.zoom = clamp(
        camera.zoom - (payload.delta / 100) * camera.zoom,
        0.5,
        3
      )
      const p1 = screenToWorld(payload.point, data)
      camera.point = vec.add(camera.point, vec.sub(p1, p0))

      return data;
    });
  }
  function panCamera(payload: { delta: number[]; point: number[] }) {
    update(data => {
      const { camera } = data
      data.camera.point = vec.sub(
        camera.point,
        vec.div(payload.delta, camera.zoom)
      );

      return data;
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
  
export const store = createStore();