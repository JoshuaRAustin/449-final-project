<script lang="ts">
	import type { PostgrestResponse } from "@supabase/supabase-js";
	import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
	
	const notes: Writable<{ note: string, happy: boolean }[]> = writable([]);
	let newNote: string = "";
	let fetchError: boolean = false;
	const jokeMessage: Writable<string> = writable("");

	async function addNote(happy: boolean) {
		let { data: { user } } = await supabase.auth.getUser();
    	if (!newNote) {
			alert("Please enter a note!");
		}

		if (!user) {
			alert("Make sure to log in!");
		}
		
		const { error } = await supabase.from("notes").insert({
			note: newNote,
			happy,
			user_id: user?.id
		});

		if (error) {
			console.log(error);
			fetchError = true;
		} else {
			console.log("Note added successfully!");
			newNote = "";
			let { data: notesRows, error } = await getNotes();
			if (notesRows) {
				notes.set(notesRows);

				if (!happy) {
					let jokeFetch = await fetch("https://geek-jokes.sameerkumar.website/api?format=json");
					let jokeJson = await jokeFetch.json();
					jokeMessage.set(jokeJson.joke);
				}
			} else {
				fetchError = true;
			}
		}
  	}

	async function getNotes() {
		const { data: notesRows, error }: PostgrestResponse<{ note: string, happy: boolean }> = await supabase.from("notes").select("note, happy");

		if (error) {
			console.log(error);
			return { data: null, error: error }
		} else {
			return { data: notesRows, error: null }
		}
	}

	onMount(async () => {
		let { data: notesRows, error } = await getNotes();
		if (notesRows) {
			notes.set(notesRows);
		} else {
			fetchError = true;
		}
	});
</script>
<section>
	<h2>Add note</h2>
	<input type="text" bind:value={newNote}>
	<button on:click={async () => await addNote(true)}>:&rpar;</button>
	<button on:click={async () => await addNote(false)}>:&lpar;</button>
	{#if $jokeMessage}
		<p>{$jokeMessage}</p>
	{/if}
	<h2>Notes</h2>
	<ol>
		{#each $notes as note}
			<li>{note.note} - {note.happy ? ":)" : ":("}</li>
		{/each}
	</ol>
</section>
