<template>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> 

	<div v-if="!critical_data_loading">
	<!-- site main header -->

		<header-component
			@open-mobile-menu="setMobileMenu(true)"
			@open-call-request="setCallRequestModal(true)"
			@open-user-authorize="setUserAuthorizeModal(true)"
			:userAuthorized="is_user_authorized"
			:logoUrl="'http://192.168.1.141:8080/logo_variant.png'"
			:cartQuantity="cart == null ? 0 : cart.line_items.length"
			class="px-3 mt-1 md:px-2 md:mt-4"
		/>
	<!-- eof site main header -->

	<!-- mobile main header -->
	<mobile-header-menu
		v-if="mobile_menu_open"
		:userAuthorized="is_user_authorized"
		@close-mobile-menu="setMobileMenu(false)"
		@open-user-authorize="setUserAuthorizeModal(true)"
	/>
	<!-- eof mobile main header -->

	<!--
	<div>
		access token is {{ user_access_token }}
	</div>
	<div>
		user is {{ user }}
	</div>
	-->

	<!-- site main router-view -->
		
	  <router-view>
	  </router-view>
	<!-- eof site main router-view -->

	</div>

	<div v-else>
		loading critical data...
	</div>

	<!-- call request popup modal -->	
	<request-call-modal
		v-if="call_request_open"
		:requestCallInfo="request_call_info"
		@close-modal="setCallRequestModal(false)" 
		@request-call="sendRequestCall"
		@request-call-info="updateRequestCallInfo"
	/>
	<!-- eof call request popup modal -->

	<!-- user authorize popup modal -->
	<user-authorize-modal
		v-if="user_authorize_open"
		@close-modal="setUserAuthorizeModal(false)"
		@user-authorized="userAuthorized"
		@user-login-info="setUserLoginInfo"
		:userLoginInfo="user_login_info"
		:userAuthorizeStates="user_authorize_states"
	/>
	<!-- eof uesr authorize popup modal -->

</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, defineAsyncComponent, onBeforeMount } from 'vue'

// local components
import HeaderComponent from '@/components/header/HeaderComponent';
const MobileHeaderMenu  = defineAsyncComponent (() => import(/* webpackChunkName: "mobile-header" */'@/components/header/MobileHeaderMenu'));
const RequestCallModal = defineAsyncComponent ( () => import(/* webpackChunkName: "request-call-modal" */'@/components/modals/RequestCallModal'));
const UserAuthorizeModal = defineAsyncComponent( () => import(/* webpackChunkName: "authorize-modal" */ '@/components/modals/UserAuthorizeModal'));
//import MobileHeaderMenu from '@/components/header/MobileHeaderMenu';

export default {
	name: "App",
	components: {
		HeaderComponent,
		MobileHeaderMenu,
		RequestCallModal,
		UserAuthorizeModal,
	},
	setup () {
		const store = useStore()
		const router = useRouter()
		// computed
		const cart = computed(() => store.state.cart.cart);
		// after authorized route to
		const after_authorized_route_to = computed(() => store.state.modals.after_authorized_route_to)
		// loading states
		const critical_data_loading = computed(() => store.state.site.loading_states.critical_data_loading);
        const common_data_loaded = computed(() => store.state.site.loading_states.common_data_loaded);
		// user info
		const user = computed(() => store.state.user.user)
		const is_user_authorized = computed(() => store.state.user.user_authorized)
		const user_access_token = computed(() => store.state.user.user_access_token)
		const user_login_info = computed( () => store.state.user.user_login_info)
		const user_authorize_states = computed(() => store.state.user.user_authorize_states)
		const user_authorize_open = computed( () => store.state.modals.user_authorize_open)


		const mobile_menu_open = computed (() => store.state.modals.mobile_menu_open)
		const theme_colors = computed(() => store.state.theme.colors)
		const call_request_open = computed(() => store.state.modals.call_request_open)

		const request_call_info = computed(() => store.state.site.request_call_info)
		// functions
		onBeforeMount(async () => {
			// check, if access_token in local storage and use is authorized
			await store.dispatch("checkGetSessionId")
			await store.dispatch("checkUserAuth")
			// get current cart, if it is exist
			if (!cart.value) {
				await store.dispatch("cart/getCartAPI")
			}
            if (!common_data_loaded.value) {
                await store.dispatch("getCommonInfoAPI")
            }
			store.commit('setSiteLoadingState', {
				loading_state_name: "critical_data_loading", is_loading: false
			});
			});
		var userAuthorized = async () => {
			// retrierve authorize status and get user info from server
			await store.dispatch("checkUserAuth")
			// close user authorized model
			// forward user to apropriate route
			router.push(after_authorized_route_to.value)
			setUserAuthorizeModal(false)
		}
		var setMobileMenu = (is_open) => store.commit("modals/setMobileMenuOpen", is_open)	
		var setCallRequestModal = (is_open) => {
			if (!is_open) {
				store.commit('resetRequestCallInfo')
			}
			store.commit("modals/setCallRequestModalOpen", is_open)
		}
		var setUserAuthorizeModal = (is_open) => store.commit("modals/setUserAuthorizeOpen", 
		{is_open: is_open, after_authorized_route_to: "/profile"})
		var setUserLoginInfo = (new_user_login_info) => { 
			store.commit("setUserLoginInfo", new_user_login_info)
		}
		// update request call info
		var updateRequestCallInfo = (new_call_info) => {
			store.commit("setRequestCallInfo", new_call_info)
		}
		// send request call
		var sendRequestCall = async () => {
			await store.dispatch('sendRequestCallAPI')	
		}
		return {
			// computed
			cart,
			theme_colors,
			// loading states
			critical_data_loading,
				// user
			user_authorize_states,
			is_user_authorized,
			user_access_token,
			user_authorize_open,
			user_login_info,
			user,

			mobile_menu_open,
			call_request_open,

			request_call_info,
			// functions
			userAuthorized,
			setMobileMenu,
			setCallRequestModal,
			setUserAuthorizeModal,
			setUserLoginInfo,
			sendRequestCall,
			updateRequestCallInfo,
		}
	}
}
</script>
