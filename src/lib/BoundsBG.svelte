<script lang="ts">
import { brushSeletor, brushStore, selectedBounds } from "./writables/brush";

function handlePointerDown(e: PointerEvent) {
  if (e.buttons !== 1) return;
  brushStore.pointedBounds({
    shiftKey: e.shiftKey,
    optionKey: e.altKey,
    metaKey: e.metaKey || e.ctrlKey,
    ctrlKey: e.ctrlKey,
    buttons: e.buttons,
  })
}

</script>

{#if $selectedBounds}
  {@const ({ minX, minY, width, height } = $selectedBounds) }
  <rect
    x={minX}
    y={minY}
    width={width}
    height={height}
    on:pointerdown={handlePointerDown}
  />
{/if}

<style>
rect {
  fill: var(--bounds-bg);
}
</style>