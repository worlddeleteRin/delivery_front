import { Commit, ActionContext } from 'vuex';
import {
	ProductsDataService,
	CategoriesDataService
} from '@/api/catalogue';


export default {
	namespaced: true,
  state: {
	categories: null,
	products: null,
  },
  getters: {
	getProductById: (state: Record<string,any>) => (product_id: string) => {

		const product = state.products.find((pr: Record<string,any>) => pr.id == product_id)
		if (!product) {
			return null
		}
		return product
	}
  },
  mutations: {
	setCategories(state: Record<string, any>, categories: Array<Record<string,any>>) {
		state.categories = categories;
	},
	setProducts(state: Record<string, any>, products: Array<Record<string,any>>) {
		state.products = products;
	},
  },
  actions: {
	// categories section
	async getCategoriesAPI(
		context: ActionContext<any,any>
	) {
		const response = await CategoriesDataService.getAll()
		if (response.status == 200 && response.data.categories) {
			context.commit('setCategories', response.data.categories)
			return true
		}
		return false
	},
	// products section
	async getProductsAPI({commit}: {commit: Commit}) {
		// get all products	
		const products: Array<Record<string,any>> = await ProductsDataService.getAll()	
		commit('setProducts', products)
	},
  },
}
