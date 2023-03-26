<script>
import Corner from "./Corner.svelte";
import EdgeHorizontal from "./EdgeHorizontal.svelte";
import EdgeVertical from "./EdgeVertical.svelte";
import { selectedBounds } from "./writables/brush";

const p = 4;
const cp = 2 * p;
</script>

{#if $selectedBounds}
{@const { minX, minY, maxX, maxY, width, height } = $selectedBounds}
<g>
  <rect
    class="bounds"
    x={minX}
    y={minY}
    width={width}
    height={height}
    pointer-events="none"
  />
  <Corner
    x={minX}
    y={minY}
    corner={0}
    width={cp}
    height={cp}
    cursor="nwse-resize"
  />
  <Corner
    x={maxX}
    y={minY}
    corner={1}
    width={cp}
    height={cp}
    cursor="nesw-resize"
  />
  <Corner
    x={maxX}
    y={maxY}
    corner={2}
    width={cp}
    height={cp}
    cursor="nwse-resize"
  />
  <Corner
    x={minX}
    y={maxY}
    corner={3}
    width={cp}
    height={cp}
    cursor="nesw-resize"
  />
  <EdgeHorizontal
    x={minX + p}
    y={minY}
    width={Math.max(0, width - p * 2)}
    height={p}
  />
  <EdgeVertical
    x={maxX}
    y={minY + p}
    width={p}
    height={Math.max(0, height - p * 2)}
  />
  <EdgeHorizontal
    x={minX + p}
    y={maxY}
    width={Math.max(0, width - p * 2)}
    height={p}
  />
  <EdgeVertical
    x={minX}
    y={minY + p}
    width={p}
    height={Math.max(0, height - p * 2)}
  />
</g>
{/if}

<style>
.bounds {
  fill: none;
  stroke: var(--bounds);
  stroke-width: 2;
}
</style>