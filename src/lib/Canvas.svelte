<script lang="ts">
import MainGroup from "./MainGroup.svelte";
import MainSVG from "./MainSVG.svelte";
import { store } from "./store";

function handleWheel(e: WheelEvent) {
  e.preventDefault()

  if (e.ctrlKey) {
    store.actions.zoomCamera({
      delta: e.deltaY,
      point: [e.pageX, e.pageY],
    });
    return
  }

  store.actions.panCamera({
    delta: [e.deltaX, e.deltaY],
    point: [e.pageX, e.pageY],
  });
}

</script>
<MainSVG on:wheel={handleWheel}>
  <MainGroup>
    <circle cx={100} cy={100} r={50} />
    <circle cx={500} cy={500} r={200} />
    <circle cx={200} cy={800} r={100} />
  </MainGroup>
</MainSVG>