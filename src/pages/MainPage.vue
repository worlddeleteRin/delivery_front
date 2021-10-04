<template> <div>

	<!-- main page slider -->
	<MainSlider 
		class="mb-5"
	/>
	<!-- eof main page slider -->

	<!-- 
	<div class="text-3xl p-9">
		cart is {{ cart }}
	</div>
	-->
	
	<!-- products list -->
	<div v-if="products && categories"
		class="mt-8"
	>
		<div
			v-for="category in categories"
			:key="category.id"
			:id="category.slug"
		>
			<div class="px-4 mx-auto mt-3 mb-4 text-2xl font-semibold md:text-3xl max-w-screen-lg">
				{{ category.name }}
			</div>
				<div class="px-4 mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-2 md:gap-y-12 grid-cols-1 max-w-screen-lg">
			<product-card
				v-for="product in getProductsByCategoryId(category.id)"
				:product="product"
				:key="product"
				:cartItem="getProductCartItem(product.id)"
				@add-item-quantity="addProductQuantity"
				@remove-item-quantity="removeProductQuantity"
				@add-to-cart="addProductToCart"
				@remove-from-cart="removeProductFromCart"
			/>
			</div>
		</div>



	  <router-view> 
	  </router-view>

	</div>
	<MainLoadingContainer 
		v-else
		:title="'Загрузка товаров...'"
	/>
	<!-- products list -->


</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeMount } from "vue";
import { useStore } from 'vuex';

import { createToast } from 'mosha-vue-toastify';
// local components
import ProductCard from '@/components/product/ProductCard.vue';
import MainLoadingContainer from '@/components/loaders/MainLoadingContainer.vue';
import MainSlider from '@/components/sliders/MainSlider.vue';

export default defineComponent({
  name: "MainPage",
  props: {
  },
  components: {
	ProductCard,
	MainLoadingContainer,
	MainSlider,
  },
	setup () {
		const store = useStore()
		// computed
		// cart
		const cart = computed(() => store.state.cart.cart);
		// categories
		const categories = computed(() => store.state.catalogue.categories);
		// products
		const products = computed(() => store.state.catalogue.products);
		// functions
		const getProductsByCategoryId = (category_id: string) => {
			const pr = products.value.filter((p: Record<string,any>) => {
				if (p.categories.some((c: Record<string,any>) => c.id == category_id)) {
					return true
				}
				return false
			});
			return pr
		}

		const addProductToCart = async (product: Record<string,any>) => {
			const is_added = await store.dispatch("cart/addLineItemAPI", {product: product})
			if (is_added) { return productAddedToast("Добавлено:", product.name); }
			return errorToast("Ошибка в процессе добавления товара");
		}
		const removeProductFromCart = async (line_item: Record<string,any>) => {
			const is_removed = await store.dispatch("cart/removeLineItemAPI", {line_item: line_item})
			if (is_removed) { return productRemovedToast("Удалено:", line_item.product.name); }
			return errorToast("Ошибка в процессе добавления товара");
		}
		const addProductQuantity = async(line_item: Record<string,any>) => {
			const is_added = await store.dispatch("cart/addLineItemQuantityAPI", {line_item: line_item})
			if (is_added) { return true;}
			//{ return productAddedToast("Добавлено:", line_item.product.name); }
			return errorToast("Ошибка в процессе добавления товара");
		}
		const removeProductQuantity = async(line_item: Record<string,any>) => {
			const is_removed = await store.dispatch("cart/removeLineItemQuantityAPI", {line_item: line_item})
			if (is_removed) { return true;}
			//{ return productRemovedToast("Удалено:", line_item.product.name); }
			return errorToast("Ошибка в процессе добавления товара");
		}
		const getProductCartItem = (product_id: string) => {
			const cartItem = store.getters["cart/getProductCartItem"]({product_id: product_id})
			if (cartItem) {return cartItem}
			return null
		};
		onBeforeMount (() => {
			// get categories api
			store.dispatch("catalogue/getCategoriesAPI")
			// get products from api
			store.dispatch("catalogue/getProductsAPI")
		});


		// toast 
		const inputErrorToast = (title: string) => {
			createToast(
				title, {
					'type': 'danger',
					'showIcon': true,
					'hideProgressBar': true,	
					'timeout': 2000,
				}
			);
		};
		const inputSuccessToast = (title: string, description: string) => {
			createToast(
				{title: title, description: description,},
				{
					'type': 'success',
					'showIcon': true,
					'hideProgressBar': true,
					'toastBackgroundColor': 'black',
					'timeout': 2000,
				}
			);
		};
		var errorToast = (title: string) => inputErrorToast(title)
		var productAddedToast =  (title: string, description: string) => inputSuccessToast(title, description)
		var productRemovedToast = (title: string, description: string) => inputSuccessToast(title, description)

		return {
			cart,
			categories,
			products,
			// functions
			getProductsByCategoryId,

			addProductToCart,
			removeProductFromCart,
			addProductQuantity,
			removeProductQuantity,
			getProductCartItem,
		}
	}
});
</script>

