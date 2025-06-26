<script lang="ts">
	import type { PageData } from './$types';
	import Toast from '$lib/components/Toast.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let { data } = $props<{ data: PageData }>();

	// Form state
	let amount = $state(1000);
	let phoneNumber = $state('');
	let isAnonymous = $state(false);
	let isSubmitting = $state(false);

	// UI state
	let showToast = $state(false);
	let toastMessage = $state('');
	let toastType = $state<'success' | 'error' | 'warning' | 'info'>('info');

	// Predefined amounts
	const predefinedAmounts = [500, 1000, 2000, 5000];

	function showNotification(
		message: string,
		type: 'success' | 'error' | 'warning' | 'info' = 'info'
	) {
		toastMessage = message;
		toastType = type;
		showToast = true;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		isSubmitting = true;

		try {
			const response = await fetch('/api/process-payment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					amount,
					phone: phoneNumber,
					projectId: data.project.id,
					isAnonymous
				})
			});

			const result = await response.json();

			if (response.ok) {
				// Redirect to thank you page with transaction details
				window.location.href = `/thank-you?txn=${result.transactionId}`;
			} else {
				throw new Error(result.error || 'Payment failed');
			}
		} catch (error) {
			if (error instanceof Error) {
				showNotification(`Payment error: ${error.message}`, 'error');
			} else {
				showNotification('An unknown error occurred.', 'error');
			}
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Donate to {data.project.title} | Donation Platform</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-lg">
		<!-- Progress indicator -->
		<div class="mb-8">
			<div class="mb-4 flex items-center justify-center space-x-4">
				<div class="flex items-center">
					<div
						class="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white"
					>
						1
					</div>
					<span class="text-primary-600 ml-2 text-sm font-medium">Amount</span>
				</div>
				<div class="h-0.5 w-16 bg-neutral-300"></div>
				<div class="flex items-center">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300 text-sm font-medium text-neutral-500"
					>
						2
					</div>
					<span class="ml-2 text-sm font-medium text-neutral-500">Payment</span>
				</div>
				<div class="h-0.5 w-16 bg-neutral-300"></div>
				<div class="flex items-center">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300 text-sm font-medium text-neutral-500"
					>
						3
					</div>
					<span class="ml-2 text-sm font-medium text-neutral-500">Complete</span>
				</div>
			</div>
		</div>

		<div class="card animate-fade-in p-8">
			<div class="mb-8 text-center">
				<h1 class="font-display mb-2 text-3xl font-bold text-neutral-800">
					Support {data.project.title}
				</h1>
				<p class="text-neutral-600">Every contribution makes a difference</p>
			</div>

			<form onsubmit={handleSubmit} class="space-y-6">
				<div>
					<label for="amount" class="form-label">Select Amount (KES)</label>
					<div class="mb-4 grid grid-cols-2 gap-3">
						{#each predefinedAmounts as presetAmount}
							<button
								type="button"
								class="rounded-lg border-2 px-4 py-3 font-medium transition-all duration-200 {amount ===
								presetAmount
									? 'border-primary-500 bg-primary-50 text-primary-700'
									: 'hover:border-primary-300 hover:bg-primary-50 border-neutral-300'}"
								onclick={() => (amount = presetAmount)}
							>
								KES {presetAmount.toLocaleString()}
							</button>
						{/each}
					</div>
					<input
						type="number"
						bind:value={amount}
						min="10"
						class="form-input text-lg font-semibold"
						placeholder="Enter custom amount"
						required
					/>
					<p class="mt-2 text-sm text-neutral-500">Minimum donation: KES 10</p>
				</div>

				<div>
					<label for="phone" class="form-label">M-Pesa Phone Number</label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<span class="text-sm text-neutral-500">📱</span>
						</div>
						<input
							id="phone"
							type="tel"
							bind:value={phoneNumber}
							placeholder="e.g. 254712345678"
							class="form-input pl-10"
							required
						/>
					</div>
					<p class="mt-2 text-sm text-neutral-500">Enter your M-Pesa registered phone number</p>
				</div>

				<div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
					<label class="flex cursor-pointer items-start space-x-3">
						<input
							type="checkbox"
							bind:checked={isAnonymous}
							class="text-primary-600 focus:ring-primary-500 mt-1 h-4 w-4 rounded border-neutral-300 focus:ring-2 focus:ring-offset-2"
						/>
						<div>
							<span class="font-medium text-neutral-800">Make my donation anonymous</span>
							<p class="text-sm text-neutral-600">Your name won't be displayed publicly</p>
						</div>
					</label>
				</div>

				<div class="pt-4">
					<button
						type="submit"
						class="btn-secondary shadow-large w-full transform py-4 text-lg font-semibold transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							<div class="flex items-center justify-center space-x-2">
								<div class="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
								<span>Processing...</span>
							</div>
						{:else}
							<div class="flex items-center justify-center space-x-2">
								<span>💳</span>
								<span>Donate KES {amount.toLocaleString()} via M-Pesa</span>
							</div>
						{/if}
					</button>

					<div class="mt-4 text-center">
						<p class="text-sm text-neutral-500">🔒 Secure payment powered by M-Pesa</p>
					</div>
				</div>
			</form>
		</div>
	</div>
</main>

{#if showToast}
	<Toast message={toastMessage} type={toastType} onClose={() => (showToast = false)} />
{/if}
