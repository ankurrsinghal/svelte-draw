<script lang="ts">
import { store } from "./store";

$: zoom = $store.camera.zoom
$: point = $store.camera.point
</script>

<g transform="scale({zoom}) translate({point[0]} {point[1]})">
  <slot />
</g>