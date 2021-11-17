import { api_url } from '@/settings.ts';
import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
	baseURL: api_url,
	headers: {
		"Content-type": "application/json",
		"app_token": "some_access_token_is_here",
	},
});

export default apiClient;
