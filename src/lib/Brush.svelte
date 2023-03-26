<script lang="ts">
import { brushSeletor } from "./writables/brush";

const bounds = brushSeletor(state => state.bounds);
</script>

{#if $bounds}
<rect
  x={$bounds.minX}
  y={$bounds.minY}
  width={$bounds.width}
  height={$bounds.height}
/>
{/if}

<style>
rect {
  fill: var(--brush-fill);
  stroke: var(--brush-stroke);
}
</style>