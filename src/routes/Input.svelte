<script lang="ts">
	import { supabase } from "$lib/supabaseClient";
    // import { onMount } from "svelte";

	let new_note_text: string = "";

	async function addNote() {
		let { data: { user } } = await supabase.auth.getUser();
    	if (!new_note_text) {
			alert("Please enter a note!");
		}

		if (!user) {
			alert("Make sure to log in!");
		}
		
		try {
			const { error } = await supabase.from("notes").insert({
				note: new_note_text,
				happy: true,
				user_id: user?.id
			});

			if (error) {
				console.log(error);
				alert(error.message);
			} else {
				console.log("Note added successfully!");
				new_note_text = "";
			}
		} catch (error) {
			console.log(error);
		}
  	}

	// onMount(async () => {
		
	// });
</script>

<section>
	<h1>Add note:</h1>
	<input type="text" bind:value={new_note_text}>
	<button on:click={addNote}>Add Note</button>
</section>