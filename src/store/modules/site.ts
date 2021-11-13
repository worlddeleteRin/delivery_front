import { ActionContext } from 'vuex';
import { SiteDataService } from '@/api/site';

const request_call_info_default = {
	name: '',
	phone: '',
	phone_mask: '+7',
}

export default {
  state: {
	common_info: {
		location_address: "",
        delivery_phone: "",
        delivery_phone_display: "",
        main_logo_link: "",
        menu_links: [],
        map_delivery_location_link: "",
	},
    main_sliders: [],
	request_call_info: { ...request_call_info_default },
	loading_states: {
		critical_data_loading: true,
        common_data_loaded: false,
        main_sliders_loaded: false,
	},
	active_category: "",
	observe_category_scroll: true,
  },
  mutations: {
   setMainSliders(state: Record<string,any>, main_sliders: Record<string,any>) {
        state.main_sliders = main_sliders
    },
    setCommonInfo(state: Record<string,any>, common_info: Record<string,any>) {
        state.common_info = { ...common_info }
    },
	setSessionId(state: Record<string,any>, session_id: string) {
		state.session_id = session_id	
	},
	setActiveCategory(state: Record<string,any>, active_category: string) {
		state.active_category = active_category
	},
	setObserveCategoryScroll(state: Record<string,any>, need_observe: boolean) {
		state.observe_category_scroll = need_observe
	},
	setStocks(state: Record<string,any>, stocks: Array<Record<string,any>>) {
		state.stocks = stocks
	},
	setSiteLoadingState(state: Record<string,any>, 
	{loading_state_name, is_loading}: {loading_state_name: string, is_loading: boolean}) {
		state.loading_states[loading_state_name] = is_loading;
	},
	setRequestCallInfo(state: Record<string,any>, request_call_info: Record<string,any>) {
		state.request_call_info = { ...request_call_info }
	},
	resetRequestCallInfo(state: Record<string,any>) {
		state.request_call_info = { ...request_call_info_default } 
	},	
  },
  actions: {
	async checkGetSessionId(
		context: ActionContext<any,unknown>
	) {
		const session_id = localStorage.getItem("session_id")
		if (!session_id) {
			context.dispatch("getSessionIdAPI")
		} else {
			context.commit('setSessionId', session_id)
			return true
		}
	},
	async getSessionIdAPI(
		context: ActionContext<any,unknown>
	) {
		const response = await SiteDataService.getSessionId()
		if (response && response.status == 200) {
			context.commit('setSessionId', response.data.session_id)
			localStorage.setItem('session_id', response.data.session_id)
			return true
		}
		return false
	},
	async getStocksAPI(
		context: ActionContext<any,unknown>
	) {
		const response = await SiteDataService.getStocks()
		if (response && response.status == 200) {
			context.commit('setStocks', response.data.stocks)
			return true
		}
		return false
	},
    async getCommonInfoAPI(
		context: ActionContext<any,unknown>
    ) {
        const response = await SiteDataService.getCommonInfo()
        if (response && response.status == 200) {
            context.commit('setCommonInfo', response.data)
        }
        context.commit('setSiteLoadingState', {
            'loading_state_name': 'common_data_loaded',
            'is_loading': true
        })
    },
    async getMainSlidersAPI(
		context: ActionContext<any,unknown>
    ) {
        if (context.state.loading_states.main_slider_loaded) {
            return
        }
        const response = await SiteDataService.getMainSliders()
        if (response && response.status == 200) {
            context.commit('setMainSliders', response.data)
        }
        context.commit('setSiteLoadingState', {
            'main_sliders_loaded': 'common_data_loaded',
            'is_loading': true
        })
    },
	async sendRequestCallAPI(
        context: ActionContext<any,unknown>
    ) {
        const request_call_info = context.state.request_call_info
        const response = await SiteDataService.requestCallAPI(request_call_info)
        if (response && response.status == 200) {
            return true
        }
        return false
	},
  },
}
