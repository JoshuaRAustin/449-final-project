<script lang="ts">
	import { supabase } from "$lib/supabaseClient";

	let new_note_text: string = "";

	async function addNote(happy: boolean) {
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
				happy,
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
</script>

<section>
	<h2>Add note</h2>
	<input type="text" bind:value={new_note_text}>
	<button on:click={async () => await addNote(true)}>:&rpar;</button>
	<button on:click={async () => await addNote(false)}>:&lpar;</button>
</section>