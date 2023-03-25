<svg on:wheel>
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