<template>

<div v-if="product">

	<Suspense>
	<template #default>
	<component 
		:is="component" 
		:product="product"
		@add-to-cart="addProductToCart"
	/>
	</template>

	<template #fallback>
		<div class="fixed top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
			<div class="mx-auto text-lg font-medium tracking-wider text-white">
				Загрузка...
			</div>
		</div>
	</template>
	</Suspense>

</div>


<!--
<component :is="component" />
-->

</template>


<script lang="ts">
import { defineComponent, Component, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { createToast } from 'mosha-vue-toastify';

const productPageDesktop = defineAsyncComponent( () => import(/* webpackChunkName: "product-page-desktop" */ '@/components/product/ProductPageDesktop.vue'));
const productPageMobile = defineAsyncComponent( () => import(/* webpackChunkName: "product-page-mobile" */ '@/components/product/ProductPageMobile.vue'));

import MainLoadingContainer from '@/components/loaders/MainLoadingContainer.vue';


export default defineComponent({
	name: "ProductPage",
	components: {
		productPageDesktop,
		productPageMobile,
		MainLoadingContainer,
	},
	setup () {
		const route = useRoute()
		const router = useRouter()
		const store = useStore()
		// 
		const product_id = route.params.id
		const product = store.getters['catalogue/getProductById'](product_id)
		const width = window.innerWidth
		if (!product) {
			router.replace("/")	
		}
		var component = null
		if (width < 768) {
			component = productPageMobile
		} else {
			component = productPageDesktop
		}

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
		// functions
		const addProductToCart = async () => {
			const is_added = await store.dispatch("cart/addLineItemAPI", {product: product})
			if (is_added) { 
				inputSuccessToast("Добавлено:", product.name); 
				return router.push("/")
			}
			return inputErrorToast("Ошибка в процессе добавления товара");
		}


		return {
			addProductToCart,
			component,
			product,
		}
	}
});
</script>
