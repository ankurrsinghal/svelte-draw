<script lang="ts">
import Circle from "./shapes/Circle.svelte";
import Rectangle from "./shapes/Rectangle.svelte";
import { ShapeType } from "./types";
import { pageSelector } from "./writables/page";

export let shapeId: string;

const shape = pageSelector((page) => {
  return page.shapes[shapeId]
});

$: type = $shape.type;
</script>

{#if type === ShapeType.Rectangle}
  <Rectangle props={$shape} />
{:else if type === ShapeType.Circle}
  <Circle props={$shape} />
{/if}