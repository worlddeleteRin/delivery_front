import { Dispatch, Commit, ActionContext } from 'vuex';

import { CartDataService } from '@/api/cart';

//type State = Record<string,any>
/*
interface Cart {
	line_items: Record<string,any>
}
*/

const state = {
	cart: null, 
}
const mutations = {
	setCart(state: Record<string,any>, cart: Record<string,any>) {
		state.cart = cart 
	}
}
const getters = {
	getProductCartItem: (state: Record<string,any>) => (
		{product_id}: {product_id: string},
	) => {
		if (!state.cart) {return null}
		const line_item = state.cart.line_items.find((item: Record<string,any>) => item.product_id == product_id)
		if (line_item) {
			return line_item
		}
		return null
	}
}
const actions = {
	// checkout section
	async getCheckoutCommonInfoAPI(
		context: ActionContext<any,any>
	) {
		const response = await CartDataService.getCheckoutCommonInfo()	
		if (response && response.status == 200) {
			context.commit('checkout/setCheckoutDeliveryMethods',response.data.delivery_methods, {root: true})
			context.commit('checkout/setCheckoutPaymentMethods', response.data.payment_methods, {root: true})
			context.commit('checkout/setCheckoutPickupAddresses', response.data.pickup_addresses, {root: true})
			return true
		}
		return false
	},
	// order section
	async createOrderAPI(
		context: ActionContext<any, any>,
	) {
		const line_items = context.state.cart.line_items
		const user_access_token = context.rootState.user.user_access_token
		const customer_session_id = localStorage.getItem("session_id")
		const checkout_info = context.rootState.checkout.checkout_info
		
		const response = await CartDataService.createOrder(
		line_items, user_access_token, customer_session_id, checkout_info
		)
		if (response && response.status == 200) {
			context.commit("setCart", null)
			return true
		}
		return false
		
	},
	// cart section
	async getCartAPI(
		{commit}: {commit: Commit},	
	) {
		const session_id = localStorage.getItem('session_id')
		const response = await CartDataService.getCart(session_id)
		if (response && response.status == 200) {
			commit("setCart", response.data)
			return true
		} else {return false}
	},
	async createCartAPI(
		{commit}: {commit: Commit},	
		{line_item}: {line_item: Record<string,any>},
	) {
		const session_id = localStorage.getItem('session_id')
		const response = await CartDataService.createCart([line_item], session_id)		
		if (response && response.status == 200) {
			commit("setCart", response.data)
			return true
		} else {return false}
	},
	async addLineItemAPI(
		{state, dispatch, commit}: {state: Record<string, any>, dispatch: Dispatch, commit: Commit},
		{product}: {product: Record<string,any>}
	) {
		const line_item = {
			"product_id": product.id,
			"quantity": 1
		}
		if (!state.cart) {
			const is_created = await dispatch("createCartAPI", {line_item: line_item})
			if (is_created) { return true}
			return false
		}
		const response = await CartDataService.addCartItems(state.cart.id, [line_item])
		if (response && response.status == 200) {
			commit("setCart", response.data)
			return true
		} else {return false}
	},
	async addLineItemQuantityAPI(
		context: ActionContext<any,unknown>,
		{line_item}: {line_item: Record<string,any>}
	) {
		if (!state.cart) {
			return false
		}
		if (!line_item) {return false}
		const new_line_item = {...line_item }
		new_line_item.quantity += 1
		const response = await CartDataService.updateCartItem(context.state.cart.id, line_item.id, new_line_item)
		if (response && response.status == 200) {
			context.commit("setCart", response.data)
			return true
		} else {return false}
	},
	async removeLineItemQuantityAPI(
		context: ActionContext<any,unknown>,
		{line_item}: {line_item: Record<string,any>}
	) {
		if (!state.cart) {
			return false
		}
		if (!line_item) {return false}
		const new_line_item = {...line_item }
		new_line_item.quantity -= 1
		const response = await CartDataService.updateCartItem(context.state.cart.id, line_item.id, new_line_item)
		if (response && response.status == 200) {
			context.commit("setCart", response.data)
			return true
		} else {return false}
	},
	async removeLineItemAPI(
		context: ActionContext<any,unknown>,
		{line_item}: {line_item: Record<string,any>}
	) {
		if (!state.cart) {
			return false
		}
		// get line_item with specified to delete product id
		//const line_item = context.getters.getProductCartItem({product_id: product_id})
		if (!line_item) {return false}
		const response = await CartDataService.removeCartItem(context.state.cart.id, line_item.id)
		if (response && response.status == 200) {
			context.commit("setCart", response.data)
			return true
		} else {return false}
	},
}

const cart_store = {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}

export default cart_store


