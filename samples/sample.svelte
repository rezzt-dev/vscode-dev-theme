<!-- muestra de svelte para revisar el resaltado de dark dev -->
<script lang="ts">
  export let name: string;
  let count = 0;
  $: doubled = count * 2;
  const pick = () => (count += 1);
</script>

<button on:click={pick} class:active={count > 0}>
  {name}: {doubled}
</button>

{#each [1, 2, 3] as step (step)}
  <p>{step}</p>
{:else}
  <p>vacío</p>
{/each}

<style>
  button { color: #eee; }
</style>
