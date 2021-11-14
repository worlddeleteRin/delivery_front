import { Commit, ActionContext } from 'vuex';
import { UserDataService } from '@/api/user';

const user_order_status_colors = {
	"awaiting_confirmation": "black",
	"awaiting_cooking": "black",
	"awaiting_payment": "black",
	"awaiting_shipment": "green",
	"in_progress": "blue",
	"incomplete": "black",
	"completed": "#00c304",
	"cancelled": "#00c304"
}
const user_authorize_states = {
	NEED_LOGIN: "NEED_LOGIN",
	NEED_PASSWORD: "NEED_PASSWORD",
	NEED_REGISTER: "NEED_REGISTER",
	RESTORE_ACCOUNT: "RESTORE_ACCOUNT",
	VERIFY_ACCOUNT: "VERIFY_ACCOUNT",
}
const user_login_info_default = {
	user_authorize_state: user_authorize_states.NEED_LOGIN,
	user_phone: '',
	user_phone_mask: '+7',
	user_password: '',
	user_password_repeat: '',
	restore_code: '',
	verify_code: '',
}

export default {
  state: {
	user: null,
	delivery_addresses: null,
	user_access_token: null,
	user_order_status_colors: user_order_status_colors,
	user_orders: null,
	user_authorized: false,
	user_authorize_states: user_authorize_states,
	user_login_info: user_login_info_default,
  },
  getters: {
  },
  mutations: {
	setUserDeliveryAddresses(state: Record<string,any>, addresses: Array<Record<string,any>>) {
		state.delivery_addresses = addresses
	},
	setUserAuthorized(state: Record<string, any>, is_authorized: boolean) {
		state.user_authorized = is_authorized 
	},
	setUserAccessToken(state: Record<string,any>, access_token: string) {
		state.user_access_token = access_token;
	},
	resetUserLoginInfo(state: Record<string,any>) {
		state.user_login_info.user_password = ''
		state.user_login_info.user_password_repeat = ''
		state.user_login_info.restore_code = ''
		state.user_login_info.verify_code = ''
	},
	setUserLoginInfo(state: Record<string, any>, new_user_login_info: Record<string, any>) {
		state.user_login_info = { ...new_user_login_info }
	},
	setUserInfo(state: Record<string,any>, user_info: Record<string,any>) {
		state.user = user_info
	},
	setUserOrders(state: Record<string,any>, user_orders: Array<Record<string,any>>) {
		state.user_orders = user_orders;
	},
  },
  actions: {
	async isAuthorized({state}: {state: Record<string,any>}) {
		if (!state.user_access_token) {
			return false
		}
		return true
	},
	async getUserOrdersAPI(context: ActionContext<any,any>) {
		const response: Record<string,any> = 
		await UserDataService.getUserOrders(context.state.user_access_token)
		if (response && response.status == 200) {
			context.commit('setUserOrders', response.data.orders)
			return true
		}
		return false
	},
	async deleteUserDeliveryAddressAPI({commit, state}: {commit: Commit, state: Record<string,any>}, address_id: string) {
		if (!state.user_access_token) {
			return false
		}
		const resp_data: Record<string,any> = 
		await UserDataService.deleteUserDeliveryAddress(state.user_access_token, address_id)
		if (resp_data) {
			if (resp_data.data) {
				commit('setUserDeliveryAddresses', resp_data.data)
			}
			return true
		} else {
			return false
		}	
	},
	async createUserDeliveryAddressAPI({commit, state}: {commit: Commit, state: Record<string,any>}, new_address: Record<string,any>) {
		if (!state.user_access_token) {
			return false
		}
		const resp_data: Record<string,any> = 
		await UserDataService.createUserDeliveryAddress(state.user_access_token, new_address)
		if (resp_data) {
			if (resp_data.data) {
				commit('setUserDeliveryAddresses', resp_data.data)
			}
			return true
		} else {
			return false
		}	
	},
	async getUserDeliveryAddressAPI({commit, state}: {commit: Commit, state: Record<string,any>}) {
		if (!state.user_access_token) {return false}
		const resp_data: Record<string,any> = 
		await UserDataService.getUserDeliveryAddress(state.user_access_token)
		if (resp_data) {
			if (resp_data.data) {
				commit('setUserDeliveryAddresses', resp_data.data)
			}
			return true
		} else {
			return false
		}	
	},
	async restoreUserLoginAPI({state}: {state: Record<string,any>}) {
		const username = state.user_login_info.user_phone
		const resp_data: Record<string,any> = 
		await UserDataService.restoreUserLogin(username)
		if (resp_data) {
			return true
		} else {
			return false
		}	
	},
	async restoreUserLoginValidateAPI({commit, state}: {commit: Commit, state: Record<string,any>}) {
		const username = state.user_login_info.user_phone
		const otp_code = state.user_login_info.restore_code
		const resp_data: Record<string,any> = 
		await UserDataService.restoreUserLoginVerify(username, otp_code)
		if (resp_data) {
			const access_token = resp_data.data.access_token
			commit('setUserAccessToken', access_token) 
			localStorage.setItem("user_access_token", access_token)
			return true
		} else {
			return false
		}	
	},
	// updates user name, request API
	async updateUserInfoAPI({commit, state}: { commit: Commit, state: Record<string,any>}, user_info: Record<string,any>) {
		const resp_data: Record<string,any> = 
		await UserDataService.updateUserInfo(state.user_access_token, user_info)
		if (resp_data) {
			commit('setUserInfo', resp_data.data)	
			return true
		} else {
			return false
		}
	},
	async changeUserPasswordAPI({commit, state}: {commit: Commit, state: Record<string,any>}) {
		const new_password = state.user_login_info.user_password
		const resp_data: Record<string,any> = 
		await UserDataService.updatePassword(state.user_access_token, new_password)
		if (resp_data) {
			commit('setUserInfo', resp_data.data)	
			return true
		} else {
			return false
		}
	},
	async registerUserAPI({state}: {state: Record<string,any>}) {
		const username = state.user_login_info.user_phone 
		const password = state.user_login_info.user_password
		const resp: Record<string,any> = await UserDataService.register(username, password)
        console.log('response is', resp)
		if (resp.status == 200) {
			return { "is_registered": true, "msg": ""}
		} 
		return {"is_registered": false, "msg": resp?.data?.detail}
	},
	async registerVerifyUserAPI({commit, state}: {commit: Commit, state: Record<string,any>}) {
		const username = state.user_login_info.user_phone 
		const password = state.user_login_info.user_password
		const otp = state.user_login_info.verify_code
		const resp_data: Record<string,any> = await UserDataService.registerVerify(username, password, otp)
		if (resp_data) {
			commit('setUserInfo', resp_data.data.user)
			commit('setUserAccessToken', resp_data.data.access_token)
			localStorage.setItem("user_access_token", resp_data.data.access_token)
			return true
		}
		return false
	},
	async logoutUser({commit}: {commit: Commit}) {
		commit('setUserAccessToken', null)	
		commit('setUserAuthorized', false)
		commit('setUserInfo', null)
		localStorage.removeItem('user_access_token')
	},
    async getUserMeAPI(
        context: ActionContext<any,any>
    ) {
		const access_token = localStorage.getItem("user_access_token")
		if (!access_token) {
			return null
		}
		const resp_data: Record<string,any> = await UserDataService.getUserMe(access_token)
		if (resp_data.token_valid && resp_data.user_data) {
			context.commit('setUserInfo', resp_data.user_data)
        }
    },
	async checkUserAuth({commit}: {commit: Commit}) {
		const access_token = localStorage.getItem("user_access_token")
//		const test_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMiIsImV4cCI6MTYyOTk3NjA3Nn0.tBJxanC48a1-PbA3GfBrStrUIVFN_mkgLrmDe0vfsz4"
//		commit('setUserAccessToken', test_token)	
//		localStorage.setItem("user_access_token", test_token)
//		localStorage.removeItem("user_access_token")
		if (!access_token) {
			return null
		}
		commit('setUserAccessToken', access_token)
		const resp_data: Record<string,any> = await UserDataService.getUserMe(access_token)
		if (resp_data.token_valid && resp_data.user_data) {
			commit('setUserAuthorized', true)
			commit('setUserInfo', resp_data.user_data)
		} else {
			// if token is no longer valid, remove saved access token and make user not authorized
			commit('setUserAuthorized', false)
			commit('setUserInfo', null)
			commit('setUserAccessToken', null)
			localStorage.removeItem("user_access_token")
		}
	},
	async getAuthorizeTokenAPI({commit, state}: {commit: Commit, state: Record<string,any>},) {
		const username = state.user_login_info.user_phone
		const password = state.user_login_info.user_password
		const resp_data: Record<string,any> = await UserDataService.getAuthorizeToken(username, password)
		if (!resp_data) {
			return false
		}
		const access_token = resp_data.data.access_token
		commit('setUserAccessToken', access_token)
		localStorage.setItem('user_access_token', access_token)
		return true
	},
	async checkUserExistAPI({state}: Record<string,any>) {
		const username = state.user_login_info.user_phone
		const resp_data: Record<string,any> = await UserDataService.checkExistVerifiedUser(username)
		if (resp_data) {
			return resp_data.data.exist_verified
		}
		return false
	},

	// validators
	validateCheckAccount(context : ActionContext<any,any>) {
		const v_info = {
			is_valid: false,
			v_msg: '',
		}
		if (context.state.user_login_info.user_phone.length != 11) {	
				v_info.v_msg = 'Корректно введите номер телефона'	
				return v_info 
		}
		v_info.is_valid = true
		return v_info;
	},
	validateCheckPassword(context: ActionContext<any,any>) {
		const v_info = {
			is_valid: false,
			v_msg: '',
		}
		if (context.state.user_login_info.user_password.length == 0) {	
				v_info.v_msg = 'Введите Ваш пароль'	
				return v_info 
		}
		v_info.is_valid = true
		return v_info;
	},
	validateCheckRegister(context: ActionContext<any,any>) {
		const password = context.state.user_login_info.user_password
		const password_repeat = context.state.user_login_info.user_password_repeat
		const v_info = {
			is_valid: false,
			v_msg: '',
		}
		if (password.length  == 0 || password_repeat.length == 0) {	
			v_info.v_msg = 'Заполните поля паролей'	
			return v_info 
		}
		if (password != password_repeat) {
			v_info.v_msg = 'Введенные пароли на совпадают'
			return v_info
		}
		if (password.length < 6 || password_repeat.length < 6) {
			v_info.v_msg = "Длина пароля должна быть не менее 6 символов"
			return v_info 
		}
		v_info.is_valid = true
		return v_info
	},
	validateCheckRestore(context: ActionContext<any,any>) {
		const v_info = {
			is_valid: false,
			v_msg: '',
		}
		if (context.state.user_login_info.restore_code.length == 0) {	
				v_info.v_msg = 'Введите код, высланный Вам по смс'	
				return v_info 
		}
		v_info.is_valid = true
		return v_info
	},
	validateCheckVerify(context: ActionContext<any,any>) {
		const v_info = {
			is_valid: false,
			v_msg: '',
		}
		if (context.state.user_login_info.verify_code.length == 0) {	
				v_info.v_msg = 'Введите код, высланный Вам по смс'	
				return v_info 
		}
		v_info.is_valid = true
		return 'asdf'
	},

  },
}
