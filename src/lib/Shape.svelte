<script lang="ts">
  import { ShapeType, type Point } from "$lib/types";
  import { getPointerEventInfo } from "$lib/utils/utils";
  import { brushSeletor, brushStore } from "$lib/writables/brush";
	import Circle from "./shapes/Circle/Circle.svelte";
	import Dot from "./shapes/Dot/Dot.svelte";
	import Polyline from "./shapes/Polyline/Polyline.svelte";
	import Rectangle from "./shapes/Rectangle/Rectangle.svelte";
	import { pageSelector } from "./writables/page";
  
  
  export let shapeId: string;

  const shape = pageSelector((page) => {
    return page.shapes[shapeId]
  });

  $: type = $shape.type;
  
  function onPointerDown(e: PointerEvent) {
    e.stopPropagation();
    brushStore.actions.pointedShape({ id: shapeId, ...getPointerEventInfo(e) });
  }
  
  function onPointerMove(e: PointerEvent) {
  }
  
  function onPointerUp(e: PointerEvent) {
    e.stopPropagation();
    brushStore.actions.stoppedPointingShape({ id: shapeId, ...getPointerEventInfo(e) });
  }
  
  function onPointerEnter(e: PointerEvent) {
    brushStore.actions.hoveredShape({ id: shapeId, ...getPointerEventInfo(e) });
  }
  
  function onPointeeLeave(e: PointerEvent) {
    brushStore.actions.unHoveredShape({ id: shapeId, ...getPointerEventInfo(e) });
  }
  
  const isSelected = brushSeletor(state => state.selectedIds.has(shapeId));
  </script>
  
  <g
    class={$isSelected ? 'selected' : ''}
    transform={`translate(${$shape.point})`}
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}
    on:pointerenter={onPointerEnter}
    on:pointerleave={onPointeeLeave}
  >
    <defs>
      {#if type === ShapeType.Rectangle}
        <Rectangle props={$shape} />
      {:else if type === ShapeType.Circle}
        <Circle props={$shape} />
      {:else if type === ShapeType.Dot}
        <Dot props={$shape} />
      {:else if type === ShapeType.Polyline}
        <Polyline props={$shape} />
      {/if}
    </defs>
    <use xlink:href={"#" + shapeId} class="hover-indicator" />
    <use xlink:href={"#" + shapeId} {...$shape.style} />
    <use xlink:href={"#" + shapeId} class="indicator" />
  </g>
  
  <style>
.hover-indicator {
  fill: none;
  stroke: transparent;
  stroke-width: 8;
  pointer-events: all;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.indicator {
  fill: none;
  stroke: transparent;
  stroke-width: 1;
  pointer-events: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

g .hover-indicator {
  opacity: 0;
}
  
g:hover .hover-indicator {
  opacity: 1;
  stroke: var(--hint);
}

g.selected .indicator {
  stroke: var(--selected);
}
  </style>