<template>
<div
	class="px-2 py-3 mx-auto my-3 max-w-screen-lg 2xl:max-w-screen-xl rounded-md bg-gray-50"
>

<div
	class="text-2xl tracking-wider font-md">
	Корзина
</div>
{{ cart }}

<div 
v-if="cart && cart.line_items.length != 0"
class="">
<div class="flex flex-col py-3 mx-auto md:items-start md:flex-row md:px-4">
	<cart-products
		:lineItems="cart.line_items"
		@add-quantity="addProductQuantity"
		@remove-quantity="removeProductQuantity"
		@remove-from-cart="removeProductFromCart"
		class="flex flex-col items-center justify-center w-11/12 mx-auto md:w-7/12"
	/>


	<cart-summary
		:cart="cart"
		@go-checkout="goCheckoutPage"
		@submit-promo="submitPromo"
		@remove-cart-promo="removeCartPromo"
		class="w-11/12 mx-auto bg-white md:ml-5 md:w-5/12"
	/>
</div>

</div>

<!-- cart empty block -->
<div
	v-else
	class=""
>
	<div 
		class="max-w-2xl mx-auto mt-5 text-xl tracking-wider text-gray-400 sm:text-2xl md:text-3xl">
		<div 
		class="">
			  Ваша корзина пуста...
		</div>
		<div 
		class="flex justify-end mt-8">
			...добавьте в нее вкусную еду!
		</div>
	</div>

	<Button
		@button-click="goMainPage"
		v-if="!isInCart"
		title="Перейти в каталог"
		rounded="full"
		size="large"
		class="block font-medium bg-default bg-opacity-10 text-defaultText max-w-[400px] mx-auto mt-8"
	/>

</div>
<!-- eof cart empty block -->


</div>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { createToast } from 'mosha-vue-toastify';

// local components
import CartProducts from '@/components/cart/CartProducts.vue';
import CartSummary from '@/components/cart/CartSummary.vue';
import Button from '@/components/buttons/Button.vue';


export default defineComponent({
	name: "CartPage",
	components: {
		CartProducts,
		CartSummary,
		Button,
	},
	setup () {
		const store = useStore()
		const router = useRouter()
		// computed
		const user_authorized = computed(() => store.state.user.user_authorized)
		const cart = computed(() => store.state.cart.cart)

		// functions
			// promo
		const submitPromo = async (promo_code: string) => {
			if (!user_authorized.value) {
				return inputErrorToast("Войдите в профиль, чтобы использовать промокод")
			}
			if (promo_code.trim().length == 0) {
				return inputErrorToast("Введите промокод")
			}
			const result = await store.dispatch("cart/submitPromoAPI", promo_code.trim())
			if (!result.success) {
				return inputErrorToast(result.msg)
			}
			console.log('result is', result)
		}
		const removeCartPromo = async () => {
			const result = await store.dispatch("cart/removeCartPromoAPI")
			console.log('result is', result)
		}
			// checkout
		const goCheckoutPage = () => {
			// go to checkout page, if use is already authorized
			if (user_authorized.value) {
				router.push("/checkout")
			} else {
				// open authorization form, if user is not authorized yet
				store.commit('modals/setUserAuthorizeOpen', 
				{is_open: true, after_authorized_route_to: "/checkout"})
			}
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
		//	{ return productRemovedToast("Удалено:", line_item.product.name); }
			return errorToast("Ошибка в процессе добавления товара");
		}

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
		const inputSuccessToast = (title: string, description: string) => {
			createToast(
				{title: title, description: description,},
				{
					'type': 'success',
					'showIcon': true,
					'hideProgressBar': true,
					'toastBackgroundColor': 'black',
				}
			);
		};
		const goMainPage = () => router.push("/")

		var errorToast = (title: string) => inputErrorToast(title)
		var productAddedToast =  (title: string, description: string) => inputSuccessToast(title, description)
		var productRemovedToast = (title: string, description: string) => inputSuccessToast(title, description)

		return {
			// computed
			cart,	
			// functions
			goMainPage,
			submitPromo,
			removeCartPromo,
			goCheckoutPage,
			addProductToCart,
			removeProductFromCart,
			addProductQuantity,
			removeProductQuantity,
		}
	}
});
</script>

