<script lang="ts">
import MainGroup from "./MainGroup.svelte";
import MainSVG from "./MainSVG.svelte";
	import Page from "./Page.svelte";
import { cameraStore } from "./writables/camera";

function handleWheel(e: WheelEvent) {
  e.preventDefault()

  if (e.ctrlKey) {
    cameraStore.actions.zoomCamera({
      delta: e.deltaY,
      point: [e.pageX, e.pageY],
    });
    return
  }

  cameraStore.actions.panCamera({
    delta: [e.deltaX, e.deltaY],
    point: [e.pageX, e.pageY],
  });
}

</script>
<MainSVG on:wheel={handleWheel}>
  <MainGroup>
    <Page />
  </MainGroup>
</MainSVG>