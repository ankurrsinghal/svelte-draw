import type { Bounds, Camera, Page, Point } from "$lib/types";
import {ShapeType} from '$lib/types';
import { intersectCircleBounds, intersectPolylineBounds } from "$lib/utils/intersections";
import shapeUtils from "$lib/utils/shapes";
import { derived, writable, type Readable } from "svelte/store";
import { clamp, getBoundsFromPoints, screenToWorld, getPointerEventInfo, boundsContained, boundsCollide } from "../utils/utils";
import * as vec from "../utils/vec";
import { createStoreSelector } from "./utils";

interface SelectionToolProps {
  bounds?: Bounds;
  selectedIds: Set<string>;
}

function createBrushStore() {
  const { subscribe, set, update } = writable<SelectionToolProps>({ bounds: undefined, selectedIds: new Set() });

  let origin: Point | undefined;

  function deselectAllShapes() {
    update(state => {
      state.selectedIds.clear();
      return state;
    });
  }

  function startBrush(point: ReturnType<typeof getPointerEventInfo>, camera: Camera) {
    if (!point.shiftKey) {
      deselectAllShapes();
    }
    origin = screenToWorld(point.point, camera);
  }

  function updateBrush(point: ReturnType<typeof getPointerEventInfo>, camera: Camera, page: Page) {
    if (origin) {
      const brushBounds = getBoundsFromPoints(origin, screenToWorld(point.point, camera));
      const selectedIds = Object.values(page.shapes).filter(shape => {
        switch (shape.type) {
          case ShapeType.Dot: {
            const bounds = shapeUtils[shape.type].getBounds(shape)

            return boundsContained(bounds, brushBounds) || intersectCircleBounds(shape.point, 4, brushBounds).length > 0
          }
          case ShapeType.Circle: {
            const bounds = shapeUtils[shape.type].getBounds(shape)

            return boundsContained(bounds, brushBounds) || intersectCircleBounds(
              vec.addScalar(shape.point, shape.radius),
              shape.radius,
              brushBounds
            ).length > 0
          }
          case ShapeType.Rectangle: {
            const bounds = shapeUtils[shape.type].getBounds(shape)

            return boundsContained(bounds, brushBounds) || boundsCollide(bounds, brushBounds)
          }
          case ShapeType.Polyline: {
            const bounds = shapeUtils[shape.type].getBounds(shape)
            const points = shape.points.map((point) =>
              vec.add(point, shape.point)
            )

            return boundsContained(bounds, brushBounds) || intersectPolylineBounds(points, brushBounds).length > 0;
          }
          default: {
            return undefined
          }
        }
      }).map(shape => shape.id);

      update(state => {
        state.bounds = brushBounds;
        state.selectedIds = new Set(selectedIds);
        return state;
      });
    }
  }

  function doneBrush(point: ReturnType<typeof getPointerEventInfo>) {
    origin = undefined;
    update(state => {
      state.bounds = undefined;
      return state;
    });
  }

  function cancelBrush(point: ReturnType<typeof getPointerEventInfo>) {

  }

  function pointedShape({ id, shiftKey }) {
    if (shiftKey) {
      update(state => {
        if (state.selectedIds.has(id)) {
          state.selectedIds.delete(id);
        } else {
          state.selectedIds.add(id);
        }
        return state;
      });
    } else {
      update(state => {
        state.selectedIds = new Set([id]);
        return state;
      });
    }
  }

  function stoppedPointingShape() {

  }

  function hoveredShape() {

  }

  function unHoveredShape() {
    
  }

  return {
    subscribe,
    actions: {
      startBrush,
      updateBrush,
      doneBrush,
      cancelBrush,
      pointedShape,
      stoppedPointingShape,
      hoveredShape,
      unHoveredShape,
    }
  }
}
  
export const brushStore = createBrushStore();
export const brushSeletor = createStoreSelector(brushStore);