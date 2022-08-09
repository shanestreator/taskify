const request = {
	async get(url: string) {
		const result = await fetch(url)
		return await result.json()
	},
	async post(url: string, data: any) {
		console.log('request data: ', data)
		const result = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		return await result.json()
	},
	async put(url: string, data: any) {
		const result = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		return await result.json()
	},
	async delete(url: string) {
		console.log({ url })
		const result = await fetch(url, {
			method: 'DELETE'
		})
		return await result.json()
	}
}

export default request
