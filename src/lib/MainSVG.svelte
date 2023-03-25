<script lang="ts">
export let forwardRef: SVGSVGElement;
</script>

<svg
  bind:this={forwardRef}
  on:wheel
  on:pointerdown
  on:pointermove
  on:pointerup
>
  <slot />
</svg>

<style>
svg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  touch-action: "none";
  z-index: 100;
}
</style>