<script lang="ts">
  import type { CircleShape } from "$lib/types";
  export let props: CircleShape;
  const { id, point, radius } = props;
</script>
  
<circle
  id={id}
  cx={radius}
  cy={radius}
  r={radius}
/>