<script lang="ts">
  import type { DotShape } from "$lib/types";
  export let props: DotShape;
  const { id, point } = props;
</script>

<circle id={id} cx={4} cy={4} r={4} />