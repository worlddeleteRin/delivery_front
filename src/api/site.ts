import apiClient from "./api_client";

class SiteDataServiceClass {
	async getSessionId(): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"session", 
		).catch((error) => {
			return error.response 
		});
		return response 
	}
	async getStocks(): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"/site/stocks", 
		).catch((error) => {
			return error.response 
		});
		return response 
	}
	async getCommonInfo(): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"/site/common-info", 
		).catch((error) => {
			return error.response 
		});
		return response 
	}
}

export const SiteDataService = new SiteDataServiceClass()
