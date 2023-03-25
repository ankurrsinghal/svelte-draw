<script lang="ts">
import { cameraStore } from "./writables/camera";


const camera = cameraStore;

$: zoom = $camera.zoom
$: point = $camera.point
</script>

<g transform="scale({zoom}) translate({point[0]} {point[1]})">
  <slot />
</g>