<script lang="ts">
  import type { PolylineShape } from "$lib/types";
  export let props: PolylineShape;
  const { id, points, point } = props;
</script>

<polyline id={id} points={points.toString()} />