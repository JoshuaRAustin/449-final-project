<script lang="ts">
	import { supabase } from "$lib/supabaseClient";
    import { createEventDispatcher } from "svelte";
	
	const dispatch = createEventDispatcher();

	async function signOut() {
		console.log("Signing out");
		await supabase.auth.signOut();
		dispatch("signedOut");
	}
</script>

<section>
	<button class="btn btn-primary mb-3 mt-3" on:click={signOut}>Sign out</button>
</section>