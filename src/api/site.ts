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
	async getMainSliders(): Promise<any> {
		const response: Record<string,any> = await apiClient.get(
		"/site/main-sliders", 
		).catch((error) => {
			return error.response 
		});
		return response 
	}
	async requestCallAPI(
        request_call_info: Record<string,any>
    ): Promise<any> {
		const response: Record<string,any> = await apiClient.post(
		"/site/request-call", 
        {...request_call_info}
		).catch((error) => {
			return error.response 
		});
		return response 
	}

}

export const SiteDataService = new SiteDataServiceClass()
