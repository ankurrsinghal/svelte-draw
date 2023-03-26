<script lang="ts">
export let x: number;
export let y: number;
export let width: number;
export let height: number;
</script>

<rect
  class="horizontal-edge"
  x={x}
  y={y - height / 2}
  width={width}
  height={height}
/>

<style>
.horizontal-edge {
  stroke: none;
  fill: none;
  cursor: ns-resize;
}
</style>