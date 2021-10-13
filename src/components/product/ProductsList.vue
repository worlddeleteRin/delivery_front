<template>
<div
	class="mt-8 mx-auto max-w-screen-lg 2xl:max-w-screen-xl"
>
	observe is {{ observe_category_scroll }}
	<div
			v-for="category in categories"
			:key="category.id"
			:id="category.slug"
		>
			<div 
				class="px-4 mx-auto mt-3 mb-4 text-2xl font-semibold md:text-3xl"
				>
				{{ category.name }}
			</div>
				<div 
					class="px-4 mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-2 md:gap-y-12 grid-cols-1 observable border-4 border-white"
					:data-category-slug="category.slug"
				>
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
</template>


<script lang="ts">
import { defineComponent, PropType, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import { createToast } from 'mosha-vue-toastify';

import ProductCard from '@/components/product/ProductCard.vue';

export default defineComponent({
	name: "ProductsList",
	components: {
		ProductCard,
	},
	props: {
		products: {
			type: Array as PropType<Array<Record<string,any>>>,
			default: null,
		},
		categories: {
			type: Array,
			default: null
		}
	},
	setup (props, {emit}) {
		// const
		const store = useStore()
		// computed
		const observe_category_scroll = computed(() => store.state.site.observe_category_scroll);
		// functions
		onMounted(() => {
				const callback = (entries: any) => { 
					const entry = entries[0]
					if(entry.isIntersecting == true) {
						const category_slug = entry.target.getAttribute("data-category-slug");
						const el = document.querySelector("#mb-cat-nav-" + category_slug)
						if (el) {
							el.scrollIntoView({behavior: "smooth", block: "nearest", inline: 'start'})
						}
						store.commit('setActiveCategory', category_slug)
					}
				}
				const observer = new IntersectionObserver(callback, {
					threshold: 0.1,
				});
				console.log('observer is', observer)
				document.querySelectorAll(".observable").forEach((el: any) => observer.observe(el))
		});

		const getProductsByCategoryId = (category_id: string) => {
			const pr = props.products.filter((p: Record<string,any>) => {
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
			// computed
			observe_category_scroll,
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
