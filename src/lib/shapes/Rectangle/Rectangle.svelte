<script lang="ts">
  import type { RectangleShape } from "$lib/types";
  export let props: RectangleShape;
  const { id, point, size } = props;
</script>

<rect id={id} width={size[0]} height={size[1]} />