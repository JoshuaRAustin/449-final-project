<script lang="ts">
	import NoteList from './NoteList.svelte'
	import Input from './Input.svelte'
    import SignUp from './SignUp.svelte';
    import SignOut from './SignOut.svelte';
    import { supabase } from '$lib/supabaseClient';
	import type { UserResponse } from '@supabase/supabase-js'
    import { writable, type Writable } from 'svelte/store';

	let userPromise: Writable<Promise<UserResponse>> = writable(supabase.auth.getUser());

	function updateUser() {
		userPromise.set(supabase.auth.getUser());
	}
</script>

<h1>Wholesome notes</h1>

{#await $userPromise}
	<p>Loading...</p>
{:then { data: { user }, error }}
	{#if error}
		<SignUp on:signedIn={updateUser} on:signedUp={updateUser} />
	{:else}
		<NoteList />
		<SignOut on:signedOut={updateUser} />
	{/if}
{:catch error}
	<SignUp on:signedIn={updateUser} on:signedUp={updateUser} />
{/await}
