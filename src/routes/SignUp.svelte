<script lang="ts">
	import { supabase } from "$lib/supabaseClient";

	let user_email: string;
	let user_password: string;

	async function signIn() {
		console.log(user_email);
		console.log(user_password);

		let response = await supabase.auth.signUp({
			email: user_email,
			password: user_password
		});

		console.log(response.error);
		console.log(response.data.user?.email);
	}
</script>

<section>
	<input type="email" bind:value={user_email}>
	<input type="password" bind:value={user_password}>
	<button on:click={signIn}>Sign In</button>
</section>