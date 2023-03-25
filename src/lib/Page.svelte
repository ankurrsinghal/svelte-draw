<script lang="ts">
	import Shape from "./Shape.svelte";
import { pageSelector } from "./writables/page";

const currentPageShapeIds = pageSelector((state) => {
  return state.shapeIds;
});

</script>

{#each $currentPageShapeIds as id}
  <Shape shapeId={id} />
{/each}