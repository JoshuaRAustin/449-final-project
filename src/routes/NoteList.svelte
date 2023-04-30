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
				notes.set(notesRows.reverse());

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
			notes.set(notesRows.reverse());
		} else {
			fetchError = true;
		}
	});
</script>
<section>
	<h2>Add note</h2>
	<div class="input-group">
		<textarea class="form-control" bind:value={newNote} />
	</div>
	<div class="btn-group mt-3 mb-3 d-flex">
		<button class="btn btn-warning" on:click={async () => await addNote(true)}>😃</button>
		<button class="btn btn-primary" on:click={async () => await addNote(false)}>😞</button>
	</div>
	{#if $jokeMessage}
		<p>{$jokeMessage}</p>
	{/if}
	<h2>Notes</h2>
	<ol class="list-group">
		{#each $notes as note}
			<li class="list-group-item" style="border: 5px var({note.happy ? "--bs-warning-border-subtle" : "--bs-primary-border-subtle"}) solid">{note.note}</li>
		{/each}
	</ol>
</section>
