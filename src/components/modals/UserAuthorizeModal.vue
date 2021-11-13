<template>

<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40"
	@click="closeModalClick"
>
</div>

<transition 
	enter-active-class="transition ease-out duration-200" 
	enter-from-class="opacity-0 scale-90" 
	enter-to-class="opacity-100 scale-100" 
	leave-active-class="transition ease-in duration-1000" 
	leave-from-class="scale-100" 
	leave-to-class="scale-0"
>
	<div 
	v-if="is_mounted"
	class="fixed z-50 w-11/12 bg-white rounded-lg top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 max-w-[600px]">
		<div class="flex flex-col items-center px-5 py-8 md:px-12">

			<ModalLoadingFull 
				v-if="is_loading"
			/>
				
			<!-- user login -->
			<user-login-component
				v-if="user_login_info_local.user_authorize_state == userAuthorizeStates.NEED_LOGIN"
				@user-login="loginCheckAccount"
				@user-login-info="updateUserLoginInfo"
				:userLoginInfo="user_login_info_local"
				@toast-error="errorToast"
				@toast-success="successToast"
			/>
			<!-- eof user login -->

			<!-- user register -->
			<user-register-component
				v-if="user_login_info_local.user_authorize_state == userAuthorizeStates.NEED_REGISTER"
				@user-login-info="updateUserLoginInfo"
				@user-register="userRegister"
				:userLoginInfo="user_login_info_local"
				@toast-error="errorToast"
				@toast-success="successToast"
			/>
			<!-- user register -->

			<!-- need password -->
			<user-login-password-component
				v-if="user_login_info_local.user_authorize_state == userAuthorizeStates.NEED_PASSWORD"
				@user-login-info="updateUserLoginInfo"
				@login-check-password="loginCheckPassword"
				@go-restore-account="goLoginRestoreAccount"
				:userLoginInfo="user_login_info_local"
				@toast-error="errorToast"
				@toast-success="successToast"
			/>
			<!-- eof need password -->

			<!-- login restore account -->
			<user-login-restore-account-component
				v-if="user_login_info_local.user_authorize_state == userAuthorizeStates.RESTORE_ACCOUNT"
				:userLoginInfo="user_login_info_local"
				@user-login-info="updateUserLoginInfo"
				@login-check-restore="restoreAccountVerify"
				@toast-error="errorToast"
				@toast-success="successToast"
				@go-login="goLoginAccount"
			/>
			<!-- eof login restore account -->

			<!-- login verify account -->
			<user-login-verify-account-component
				v-if="user_login_info_local.user_authorize_state == userAuthorizeStates.VERIFY_ACCOUNT"
				:userLoginInfo="user_login_info_local"
				@user-login-info="updateUserLoginInfo"
				@user-register-verify="userRegisterVerify"
				@toast-error="errorToast"
				@toast-success="successToast"
				@go-login="goLoginAccount"
			/>
			<!-- eof login verify account -->

		</div>
	</div>
		

</transition>
	

</template>

<script lang="ts">

import { onMounted, ref, reactive, defineComponent, defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
// toast import
import { createToast } from 'mosha-vue-toastify';

// import user login component
const UserLoginComponent = defineAsyncComponent( () => import(/* webpackChunkName: "authorize-modal-user-login" */ '@/components/login/UserLoginComponent.vue'));
const UserRegisterComponent = defineAsyncComponent( () => import(/* webpackChunkName: "authorize-modal-user-register" */ '@/components/login/UserRegisterComponent.vue'));
const UserLoginPasswordComponent = defineAsyncComponent( () => import(/* webpackChunkName: "authorize-modal-user-login-password" */ '@/components/login/UserLoginPasswordComponent.vue'));
const UserLoginRestoreAccountComponent = defineAsyncComponent( () => import(/* webpackChunkName: "authorize-modal-user-login-restore-account" */ '@/components/login/UserLoginRestoreAccountComponent.vue'));
const UserLoginVerifyAccountComponent = defineAsyncComponent( () => import(/* webpackChunkName: "authorize-modal-user-login-verify-account" */ '@/components/login/UserLoginVerifyAccountComponent.vue'));
// modal loading
import ModalLoadingFull from '@/components/loaders/ModalLoadingFull.vue';

export default defineComponent({
	name: "UserAuthorizeModal",
	components: {
		UserLoginComponent,
		UserRegisterComponent,
		UserLoginPasswordComponent,
		UserLoginRestoreAccountComponent,
		UserLoginVerifyAccountComponent,
		// modal loading
		ModalLoadingFull,
	},
	props: {
		userLoginInfo: {
			type: Object,
			required: true,
			default: null,
		},
		userAuthorizeStates: {
			type: Object,
			required: true,
			default: null,
		},
	},
	emits: ['close-modal', 'user-login-info', 'user-authorized'],
	setup (props, {emit}) {
		// store and router
		const store = useStore()
		const router = useRouter()
		// computed
		const after_authorized_route_to = computed(() => store.state.modals.after_authorized_route_to);
		// toast 
		const inputErrorToast = (title: string) => {
			createToast(
				title, {
					'type': 'danger',
					'showIcon': true,
					'hideProgressBar': true,	
				}
			);
		};
		const inputSuccessToast = (title: string) => {
			createToast(
				title, {
					'type': 'success',
					'showIcon': true,
					'hideProgressBar': true,
				}
			);
		};

		var errorToast = (title: string) => inputErrorToast(title)
		var successToast =  (title: string) => inputSuccessToast(title)
		
		const is_loading = ref(false)

		const is_mounted = ref(false)

		var user_login_info_local =  reactive(
			props.userLoginInfo
		)
		
		onMounted(() => {
			is_mounted.value = true
		})
		const setLoading = (is_true: boolean) => {
			is_loading.value = is_true 
		}

		var closeModalClick = () => {
			// close modal and set modal state to NEED_LOGIN
			emit('close-modal')	
			user_login_info_local.user_authorize_state = props.userAuthorizeStates.NEED_LOGIN
			updateUserLoginInfo()
		}

		var updateUserLoginInfo = () => emit("user-login-info", user_login_info_local)

		var updateUserLoginInfoLocal = (new_user_login_info: Record<string,any>) => {
			user_login_info_local = { ...new_user_login_info }
			updateUserLoginInfo()
		}

		var goLoginRestoreAccount = async () => {
			setLoading(true)
			// need to send otp code to restore account access, go to restore account modal,
			// if code is successfully sent and save in db
			const is_otp_sent = await store.dispatch("restoreUserLoginAPI")
			setLoading(false)
			if (is_otp_sent) {
				user_login_info_local.user_authorize_state = props.userAuthorizeStates.RESTORE_ACCOUNT
			} else {
				return errorToast("Возникла ошибка при отправке кода восстановления. Попробуйте позже")
			}
		}

		var goLoginAccount = () => {
			user_login_info_local.user_authorize_state = props.userAuthorizeStates.NEED_LOGIN
			updateUserLoginInfo()
		}

		var userRegister = async () => {
			setLoading(true)
			const validate_info = await store.dispatch('validateCheckRegister')	
			if (!validate_info.is_valid) {
				setLoading(false)
				return inputErrorToast(validate_info.v_msg)
			} else {
				const registered_response = await store.dispatch('registerUserAPI')
				if (registered_response?.is_registered) {
					user_login_info_local.user_authorize_state = props.userAuthorizeStates.VERIFY_ACCOUNT
					setLoading(false)
					// return successToast('register is valid, can go verify with sms code')
				} else {
					setLoading(false)
                    let msg = ""
                    if (registered_response?.msg) {
                        msg = registered_response.msg
                    } else {
                        msg = "Возниткла ошибка, попробуйте позже"
                    }
					return errorToast(msg)
				}
				// set modal state to VERIFY_ACCOUNT, to send and verify code
			}
		}


		var loginCheckAccount = async () => {
			setLoading(true)
			const validate_info = await store.dispatch('validateCheckAccount')	
			if (!validate_info.is_valid) {
				setLoading(false)
				return inputErrorToast(validate_info.v_msg)
			} else {
				// need to check, if accounts exist
				// go to register, if account exist
				const user_exist = await store.dispatch('checkUserExistAPI')
				if (user_exist) {
					user_login_info_local.user_authorize_state = props.userAuthorizeStates.NEED_PASSWORD
				} else {
					user_login_info_local.user_authorize_state = props.userAuthorizeStates.NEED_REGISTER
				}
				// go to type password, if accounts not exist
				updateUserLoginInfo()
				setLoading(false)
			}
		}
		var loginCheckPassword = async () => {
			setLoading(true)
			const validate_info = await store.dispatch('validateCheckPassword')	
			if (!validate_info.is_valid) {
				setLoading(false)
				return inputErrorToast(validate_info.v_msg)
			} else {
				// need to send data on server and check, if password is corrent
				// if password corrent, server will respond token, need to save it and
				// authorize
				const is_authorized: boolean = await store.dispatch('getAuthorizeTokenAPI')
				// display error, if password is not correct
				if (is_authorized) {
					emit('user-authorized')
					setLoading(false)
					return successToast('Вы успешно авторизованы!')
				} else {
					setLoading(false)
					return inputErrorToast("Неверный пароль")
				}
			}
		}

		var userRegisterVerify = async () => {
			setLoading(true)
			const validate_info = await store.dispatch('validateCheckVerify')	
			if (!validate_info.is_valid) {
				setLoading(false)
				return inputErrorToast(validate_info.v_msg)
			} else {
				// need to send verify code on server
				// create account and login user, if code is right
				// show errorToast, if code is not right
				const is_verified = await store.dispatch("registerVerifyUserAPI")
                console.log('is verified is', is_verified)
				if (is_verified) {
					await store.dispatch("checkUserAuth")
					router.push(after_authorized_route_to.value)
					emit('close-modal')
					setLoading(false)
					return successToast('Аккаунт успешно создан!')
				} else {
					setLoading(false)
					return errorToast('Неверный код')
				}

			}
		}

		var restoreAccountVerify = async () => {
			setLoading(true)
			const validate_info = await store.dispatch('validateCheckRestore')	
			if (!validate_info.is_valid) {
				setLoading(false)
				return inputErrorToast(validate_info.v_msg)
			} else {
				const is_authorized = await store.dispatch("restoreUserLoginValidateAPI")
				if (is_authorized) {
					await store.dispatch("checkUserAuth")
					router.push(after_authorized_route_to.value)
					emit('close-modal')
					setLoading(false)
					return successToast('Восстановлен доступ! Установите новый пароль в настройках профиля.')
				} else {
					setLoading(false)
					return errorToast('Неверный код')
				}
			}
		}


		return {
			// ref
			is_loading,
			// reactive
			user_login_info_local,
			// computed
			is_mounted,
			// functions
			restoreAccountVerify,
			closeModalClick,
			updateUserLoginInfo,
			userRegister,
			loginCheckAccount,
			loginCheckPassword,
			userRegisterVerify,
			goLoginRestoreAccount,
			goLoginAccount,
			errorToast,
			successToast,
		}
	}
});
</script>
