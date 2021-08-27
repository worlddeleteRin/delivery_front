import apiClient from "./api_client";

class UserDataServiceClass {		
	async getUserMe(user_access_token: string): Promise<any> {
		const response_info: Record<string,any> = {
			"token_valid": false,
			"user_data": null,
			"error_msg": null
		}
		const response: Record<string,any> = await apiClient.get("users/me", {
			headers: {
				"Authorization": `Bearer ${user_access_token}`
			}
		}).catch((error) => {
			response_info.error_msg = error.response.statusText
			return response_info
		});
		if (response.status == 200) {
			response_info.token_valid = true
			response_info.user_data = response.data
		}
		return response_info
	}
	async checkExistVerifiedUser(username: string): Promise<any> {
		const response: Record<string,any> = await apiClient.post("users/exist-verified", {
			"username": username
		}).catch(() => {
			return {}
		});
		return response
	}
	async getAuthorizeToken(username: string, password: string): Promise<any> {
		const formData = new FormData()
		formData.set('username', username)
		formData.set('password', password)
		const response: Record<string,any> = await apiClient.post("users/token", formData).catch(() => {
			return response
		});	
		return response
	}
	async register(username: string, password: string): Promise<any> {
		const response: Record<string,any> = await apiClient.post("users/register", {
			"username": username,
			"password": password,
		}).catch(() => {
			return response
		});				
		return response
	}
	async registerVerify(username: string, password: string, otp: string): Promise<any> {
		const response: Record<string,any> = await apiClient.post("users/register-verify", {
			"username": username,
			"password": password,
			"otp": otp,
		}).catch(() => {
			return response
		});				
		return response
	}
	async updatePassword(user_access_token: string, new_password: string): Promise<any> {
		const response: Record<string,any> = await apiClient.patch("users/update-password", 
			{
				"password": new_password,
			},
			{
				headers: {
					"Authorization": `Bearer ${user_access_token}`
				}
			}
		).catch(() => {
			return response
		});				
		return response
	}
	async updateUserInfo(user_access_token: string, user_info: Record<string,any>): Promise<any> {
		const response: Record<string,any> = await apiClient.patch("users/me", 
			{
				...user_info
			},
			{
				headers: {
					"Authorization": `Bearer ${user_access_token}`
				}
			}
		).catch(() => {
			return response
		});				
		return response
	}
	async restoreUserLogin(username: string): Promise<any> {
		const response: Record<string,any> = await apiClient.post("users/restore", 
			{
				"username": username
			},
			).catch(() => {
			return response
	});				
	return response
	}
	async restoreUserLoginVerify(username: string, otp_code: string): Promise<any> {
		const response: Record<string,any> = await apiClient.post("users/restore-verify", 
			{
				"username": username,
				"otp": otp_code,
			},
			).catch(() => {
			return response
	});				
	return response
	}
}

export const UserDataService = new UserDataServiceClass()
