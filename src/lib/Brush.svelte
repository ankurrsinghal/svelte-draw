<script lang="ts">
import { brushStore } from "./writables/brush";
</script>

{#if $brushStore}
<rect
  x={$brushStore.minX}
  y={$brushStore.minY}
  width={$brushStore.width}
  height={$brushStore.height}
/>
{/if}

<style>
rect {
  fill: var(--brush-fill);
  stroke: var(--brush-stroke);
}
</style>