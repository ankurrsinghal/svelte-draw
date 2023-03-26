<script lang="ts">
export let x: number;
export let y: number;
export let width: number;
export let height: number;
</script>

<rect
  class="veertical-edge"
  x={x - width / 2}
  y={y}
  width={width}
  height={height}
/>

<style>
.veertical-edge {
  stroke: none;
  fill: none;
  cursor: ew-resize;
}
</style>