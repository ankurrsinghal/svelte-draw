<script lang="ts">
export let x: number;
export let y: number;
export let width: number;
export let height: number;
export let cursor: string;
export let corner: number;

const isTop = corner === 0 || corner === 1;
const isLeft = corner === 0 || corner === 3;

</script>
<g>
  <rect
    x={x + width * (isLeft ? -1.25 : -0.5)}
    y={y + width * (isTop ? -1.25 : -0.5)}
    width={width * 1.75}
    height={height * 1.75}
    style:cursor="grab"
    fill="transparent"
  />
  <rect
    class="corner"
    x={x + width * -0.5}
    y={y + height * -0.5}
    width={width}
    height={height}
    style:cursor={cursor}
  />
</g>

<style>
.corner {
  stroke: var(--bounds);
  fill: #fff;
  stroke-width: 2;
}
</style>