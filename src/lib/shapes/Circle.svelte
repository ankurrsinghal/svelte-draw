<script lang="ts">
  import type { CircleShape } from "$lib/types";
  export let props: CircleShape;
  const { point, radius } = props;
</script>
  
<circle cx={point[0]} cy={point[1]} r={radius} fill="black" />