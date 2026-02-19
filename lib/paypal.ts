// REST API base URL (must be api-m.sandbox.paypal.com or api-m.paypal.com, not sandbox.paypal.com)
function getPayPalApiBase(): string {
	const url = process.env.PAYPAL_API_URL || ''
	if (url.includes('api-m.')) return url
	if (url.includes('sandbox')) return 'https://api-m.sandbox.paypal.com'
	if (url) return 'https://api-m.paypal.com'
	return 'https://api-m.sandbox.paypal.com'
}
const base = getPayPalApiBase()

export const paypal = {
	createOrder: async function createOrder(price: number) {
		const accessToken = await generateAccessToken()
		const url = `${base}/v2/checkout/orders`
		const response = await fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				intent: 'CAPTURE',
				purchase_units: [
					{
						amount: {
							currency_code: 'GBP',
							value: price,
						},
					},
				],
			}),
		})
		return handleResponse(response)
	},
	capturePayment: async function capturePayment(orderId: string) {
		const accessToken = await generateAccessToken()
		const url = `${base}/v2/checkout/orders/${orderId}/capture`
		const response = await fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
				Prefer: 'return=representation',
			},
		})

		return handleResponse(response)
	},
}

async function generateAccessToken() {
	const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env
	const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET).toString(
		'base64',
	)
	const response = await fetch(`${base}/v1/oauth2/token`, {
		method: 'post',
		body: 'grant_type=client_credentials',
		headers: {
			Authorization: `Basic ${auth}`,
		},
	})

	const jsonData = await handleResponse(response)
	return jsonData.access_token
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleResponse(response: any) {
	if (response.status === 200 || response.status === 201) {
		return response.json()
	}

	const text = await response.text()
	let errorMessage = text
	try {
		const json = JSON.parse(text)
		const detail =
			json.details?.[0]?.description ??
			json.message ??
			json.error_description
		if (detail) errorMessage = detail
	} catch {
		// use raw text
	}
	throw new Error(errorMessage)
}
