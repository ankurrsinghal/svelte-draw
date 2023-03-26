<script lang="ts">
import Brush from "./Brush.svelte";
import MainGroup from "./MainGroup.svelte";
import MainSVG from "./MainSVG.svelte";
import Page from "./Page.svelte";
import { getPointerEventInfo } from "./utils/utils";
import { brushStore } from "./writables/brush";
import { cameraStore } from "./writables/camera";
	import { pageStore } from "./writables/page";

let canvasRef: SVGSVGElement;

function handleWheel(e: WheelEvent) {
  e.preventDefault()

  if (e.ctrlKey) {
    cameraStore.actions.zoomCamera({
      delta: e.deltaY,
      ...getPointerEventInfo(e)
    });
    return
  }

  cameraStore.actions.panCamera({
    delta: [e.deltaX, e.deltaY],
    ...getPointerEventInfo(e)
  });
}

const handlePointerDown = (e: PointerEvent) => {
  canvasRef.setPointerCapture(e.pointerId)
  brushStore.actions.startBrush(getPointerEventInfo(e), $cameraStore);
}

const handlePointerMove = (e: PointerEvent) => {
  brushStore.actions.updateBrush(getPointerEventInfo(e), $cameraStore, $pageStore);
}

const handlePointerUp = (e: PointerEvent) => {
  canvasRef.releasePointerCapture(e.pointerId)
  brushStore.actions.doneBrush(getPointerEventInfo(e));
}
</script>
<MainSVG
  bind:forwardRef={canvasRef}
  on:wheel={handleWheel}
  on:pointerdown={handlePointerDown}
  on:pointermove={handlePointerMove}
  on:pointerup={handlePointerUp}
>
  <MainGroup>
    <Page />
    <Brush />
  </MainGroup>
</MainSVG>