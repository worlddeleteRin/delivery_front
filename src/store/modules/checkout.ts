// import { Store } from 'vuex';
const delivery_methods_test = [
	{
		name: "delivery",
		name_display: "Доставка",
	},
	{
		name: "pickup",
		name_display: "Самовывоз"
	},
]
const pickup_address_list_test = [
	{
		id: "some_id",
		name: "Симферополь, ул. Володарского, 12",
		info: "some additional info is here",
	},
	{
		id: "some_id2",
		name: "Феодосия, ул. Кирова, 28",
		info: "some additional info is here",
	},
]
const payment_methods_test = [
	{
		id: "payment_method_id",
		name: "Картой курьеру",
	},
	{
		id: "cash",
		name: "Наличными",
	},
]
export default {
	namespaced: true,
  state: {
	modals: {
		choose_delivery_address_modal_open: false,
		create_delivery_address_modal_open: false,
		choose_pickup_address_modal_open: false,
		choose_payment_method_modal_open: false,
	},
	delivery_methods: null,
	payment_methods: null,
	pickup_addresses: null,
	checkout_info: {
		delivery_method: "delivery",
		payment_method: null,
		delivery_address: null,
		pickup_address: null,
	},
  },
  getters: {
  },
  mutations: {	
	setCheckoutDeliveryMethods(state: Record<string,any>, delivery_methods: Array<Record<string,any>>) {
		state.delivery_methods = delivery_methods
	},
	setCheckoutPaymentMethods(state: Record<string,any>, payment_methods: Array<Record<string,any>>) {
		state.payment_methods =  payment_methods
	},
	setCheckoutPickupAddresses(state: Record<string,any>, pickup_addresses: Array<Record<string,any>>) {
		state.pickup_addresses = pickup_addresses
	},
	setCheckoutModalOpen(state: Record<string,any>, {modal_name, is_open }: Record<string,any>) {
		state.modals[modal_name] = is_open
	},
	setCheckoutInfoDeliveryMethod(state:Record<string,any>, delivery_method: string) {
		state.checkout_info.delivery_method = delivery_method
	},
	setCheckoutInfoDeliveryAddress(state:Record<string,any>, new_delivery_address: Record<string,any>) {
		if (Object.keys(new_delivery_address).length === 0) {
			state.checkout_info.delivery_address = null
		} else {
			state.checkout_info.delivery_address = new_delivery_address
		}
	},
	setCheckoutInfoPickupAddress(state:Record<string,any>, new_pickup_address: Record<string,any>) {
		state.checkout_info.pickup_address = new_pickup_address 
	},
	setCheckoutInfoPaymentMethod(state:Record<string,any>, new_payment_method: Record<string,any>) {
		state.checkout_info.payment_method = new_payment_method 
	},
  },
  actions: {
  },
}
