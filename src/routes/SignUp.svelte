<script lang="ts">
	import { supabase } from "$lib/supabaseClient";
	import type { AuthError } from "@supabase/supabase-js";
    import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	
	let user_email: string;
	let user_password: string;
	let signInError: string = "";
	let signUpError: string = "";
	let checkEmailForConfirmation: boolean = false;

	$: console.log(signUpError);

	async function signUp() {

		let response = await supabase.auth.signUp({
			email: user_email,
			password: user_password
		});

		signUpError = response.error ? response.error.message : "";
		
		if (!signUpError) {
			dispatch("signedUp");
		}
	}

	async function signIn() {

		let response = await supabase.auth.signInWithPassword({
			email: user_email,
			password: user_password
		});

		signInError = response.error ? response.error.message : "";
		
		if (!signInError) {
			checkEmailForConfirmation = true;
			dispatch("signedIn");
		}
	}
</script>

<section>
	<h2>Sign in or sign up</h2>
	<div class="input-group mb-3">
		<input class="form-control" aria-label="email" placeholder="Email" type="email" bind:value={user_email}>
	</div>
	<div class="input-group mb-3">
		<input class="form-control" aria-label="Password" placeholder="Password" type="password" bind:value={user_password}>
	</div>
	<button class="btn btn-primary" on:click={signUp}>Sign Up</button>
	<button class="btn btn-primary" on:click={signIn}>Sign In</button>
	{#if signUpError}
		<p>{signUpError}</p>
	{/if}
	{#if signInError}
		<p>{signInError}</p>
	{/if}
	{#if checkEmailForConfirmation}
		<p>Check email for confirmation</p>
	{/if}
</section>