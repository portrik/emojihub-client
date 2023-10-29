export async function request<Response>(path: string): Promise<Error | Response> {
	try {
		const response = await fetch(path);
		const content = await response.text();

		if (!response.ok) {
			throw new Error(content);
		}

		return JSON.parse(content) as Response;
	} catch (error) {
		return error as Error;
	}
}
