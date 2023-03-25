import { ShapeType, type Page } from "$lib/types";
import { writable } from "svelte/store";
import { createStoreSelector } from "./utils";

const page: Page = {
  id: "page0",
  type: "page",
  name: "Page 0",
  childIndex: 0,
  shapeIds: ['shape0', 'shape1', 'shape2'],
  shapes: {
    shape0: {
      id: "shape0",
      type: ShapeType.Circle,
      name: "Shape 0",
      parentId: "page0",
      childIndex: 1,
      point: [100, 100],
      radius: 50,
      rotation: 0,
    },
    shape1: {
      id: "shape1",
      type: ShapeType.Rectangle,
      name: "Shape 1",
      parentId: "page0",
      childIndex: 1,
      point: [300, 300],
      size: [200, 200],
      rotation: 0,
    },
    shape2: {
      id: "shape2",
      type: ShapeType.Circle,
      name: "Shape 2",
      parentId: "page0",
      childIndex: 2,
      point: [200, 800],
      radius: 25,
      rotation: 0,
    },
  },
}

function createStore() {
  const { subscribe, update } = writable<Page>(page);

  return {
    subscribe,
  }
}
  
export const pageStore = createStore();
export const pageSelector = createStoreSelector(pageStore);