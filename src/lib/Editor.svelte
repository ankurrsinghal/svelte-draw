<script lang="ts">
	import { onMount } from "svelte";
	import Canvas from "./Canvas.svelte";
	
	onMount(() => {
		function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // state.send("CANCELLED")
      }

      // state.send("PRESSED_KEY", getKeyboardEventInfo(e))
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // state.send("CANCELLED")
      }

      // state.send("RELEASED_KEY", getKeyboardEventInfo(e))
    }

    document.body.addEventListener("keydown", handleKeyDown)
    document.body.addEventListener("keyup", handleKeyUp)
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown)
      document.body.removeEventListener("keyup", handleKeyUp)
    }
	})
</script>

<Canvas />