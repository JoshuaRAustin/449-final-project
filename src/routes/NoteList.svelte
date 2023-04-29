<script lang="ts">
	import type { PostgrestResponse } from "@supabase/supabase-js";
	import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

	let notes: Array<{ note: string }> = [];

	async function loadNotes() {
		try {
			const { data, error }: PostgrestResponse<{ note: string }> = await supabase.from("notes").select("note");

			if (error) {
				console.log(error);
				alert(error.message);
			} else {
				console.log(data);
				notes = data;
			}
		} catch (error) {
			console.log(error);
		}
	}

	onMount(loadNotes);
</script>
<section>
	<h1>Notes:</h1>
	<ol>
		{#each notes as note}
			<li>{note.note}</li>
		{/each}
	</ol>
</section>
