<script lang="ts">
	import NoteList from './NoteList.svelte'
	import Input from './Input.svelte'
    import SignUp from './SignUp.svelte';
    import { supabase } from '$lib/supabaseClient';
	// import { supabase } from '$lib/supabaseClient';
    // import { onMount } from 'svelte';

	let userPromise = supabase.auth.getUser();

	// onMount(async () => {
	// 	let { data: { user }, error } = await supabase.auth.getUser();
	// 	if (error) {
	// 		authError = error;
	// 	}
	// })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#await userPromise}
	
{:then { data: { user }, error }}
	<Input />

	<NoteList />
{:catch error}

{/await}

<SignUp />