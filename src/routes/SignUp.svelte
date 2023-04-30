<script lang="ts">
	import { supabase } from "$lib/supabaseClient";
	import type { AuthError } from "@supabase/supabase-js";
    import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	
	let user_email: string;
	let user_password: string;
	let signInError: boolean = false;
	let signUpError: boolean = false;

	$: console.log(signUpError);

	async function signUp() {

		let response = await supabase.auth.signUp({
			email: user_email,
			password: user_password
		});

		dispatch("signedUp");

		signUpError = !(response.error === null);
		// console.log(response.data.user?.email);
		if (!signUpError) {
			dispatch("signedUp");
		}
	}

	async function signIn() {

		let response = await supabase.auth.signInWithPassword({
			email: user_email,
			password: user_password
		});

		signInError = !(response.error === null);
		// console.log(response.data.user?.email);
		if (!signInError) {
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
		<p>Sign up error</p>
	{/if}
	{#if signInError}
		<p>Sign in error</p>
	{/if}
</section>