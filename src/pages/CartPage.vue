<template>
<div
	class="px-2 py-3 mx-auto my-3 max-w-screen-md rounded-md"
>

<div
	class="text-2xl tracking-wider font-md">
	Корзина
</div>

<div>
    {{ cart }}
</div>

<div 
v-if="cart && cart.line_items.length != 0"
class="">
<div class="py-3 mx-auto md:items-start md:px-4">
	<cart-products
		:lineItems="cart.line_items"
		@add-quantity="addProductQuantity"
		@remove-quantity="removeProductQuantity"
		@remove-from-cart="removeProductFromCart"
		class="flex flex-col items-center justify-center w-full mx-auto max-w-screen-md" 
	/>

	<!-- promo block -->
	<div>
		<input-promo-main
			v-if="cart.coupons.length == 0"
			:promo-value="'somepromovaluehere'"	
			@submit-promo="submitPromo"
		/>
		<!-- promo block -->
		<div v-if="cart.coupons.length > 0">
			<div>
				Промокод 
				<span class="text-default">
					{{ cart.coupons[0]?.code }}
				</span>
				успешно использован!
			</div>
			<div>
				<el-button
					@click="removeCartPromo"
					:round="true"
					size="mini"
					type="danger"
				>
					Отменить промокод
				</el-button>
			</div>
		</div>
		<!-- promo block -->
	</div>
	<!-- eof promo block -->


    <!-- pay with bonuses component -->
    <div class="block">
        <pay-with-bonuses
            v-if="user_authorized && user.bonuses > 0"
            :user-bonuses="user.bonuses"
            :is-loading="pay_bonuses_loading"
            @pay-bonuses="addPayBonuses"
            class="mt-3 px-5 rounded-lg"
        />
    </div>
    <!-- eof pay with bonuses component -->

	<!-- coupon gifts block -->
		<coupon-gifts
			v-if="cart.coupon_gifts && cart.coupon_gifts.length > 0"
			:coupon-gifts="cart.coupon_gifts"
			:coupon="cart.coupons[0]"
			class="mt-3"
		>
		</coupon-gifts>
	<!-- eof coupons gifts block -->


	<cart-summary
		:cart="cart"
		@go-checkout="goCheckoutPage"
		@submit-promo="submitPromo"
		@remove-cart-promo="removeCartPromo"
		class="w-full mx-auto bg-white"
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
import { computed, defineComponent, defineAsyncComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { createToast } from 'mosha-vue-toastify';

// local components
import CartProducts from '@/components/cart/CartProducts.vue';
import CartSummary from '@/components/cart/CartSummary.vue';
const CouponGifts = defineAsyncComponent(() => import(/* webpackChunkName: "group-cart-page" */ '@/components/cart/CouponGifts.vue'));
import InputPromoMain  from '@/components/input/InputPromoMain.vue';
import PayWithBonuses from '@/components/cart/PayWithBonuses.vue';


export default defineComponent({
	name: "CartPage",
	components: {
		CartProducts,
		CartSummary,
		InputPromoMain,
		CouponGifts,
        PayWithBonuses,
	},
	setup () {
		const store = useStore()
		const router = useRouter()
		// computed
		const user_authorized = computed(() => store.state.user.user_authorized)
        const user = computed(() => store.state.user.user)
		const cart = computed(() => store.state.cart.cart)
        

        // local loaders
        const pay_bonuses_loading = ref(false);
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

        const addPayBonuses = async(pay_with_bonuses: number) => {
            pay_bonuses_loading.value = true
            const result = await store.dispatch("cart/addPayWithBonusesAPI", pay_with_bonuses)
            pay_bonuses_loading.value = false
            if (!result?.is_success) {
                return errorToast(result?.msg)
            }
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
            user_authorized,
            user,
                // local loaders
            pay_bonuses_loading,
			// functions
			goMainPage,
			submitPromo,
			removeCartPromo,
			goCheckoutPage,
			addProductToCart,
			removeProductFromCart,
			addProductQuantity,
			removeProductQuantity,
            addPayBonuses,
		}
	}
});
</script>

