<script lang="ts">
import type { RectangleShape } from "$lib/types";
export let props: RectangleShape;
const { point, size } = props;
</script>

<rect
  x={point[0]}
  y={point[1]}
  width={size[0]}
  height={size[1]}
  fill="black"
/>