<template>
<div class="px-4 py-5 rounded">

	<div class="py-2 text-xs font-medium text-gray-500">
		Доступные способы доставки и оплаты можно выбрать при оформлении заказа
	</div>


	<div class="py-3 my-3 border-t border-gray-300">
		<div class="flex items-center justify-between">
			<span class="text-lg font-bold">
			Ваша корзина
			</span>
			<span class="text-sm text-gray-600">
			1 товар
			</span>
		</div>
		<div class="flex items-center justify-between mt-2">
			<span class="text-sm font-base">
				Сумма заказа	
			</span>
			<span class="text-sm font-semibold text-black">
				{{ cart.base_amount }} &#x20bd;	
			</span>
		</div>
		<div class="flex items-center justify-between mt-2">
			<span class="text-sm font-base">
				Скидка
			</span>
			<span class="text-sm font-semibold text-red-500">
				{{ cart.discount_amount }}  &#x20bd;	
			</span>
		</div>
		<div 
			v-if="cart.promo_discount_amount && cart.promo_discount_amount > 0"
			class="flex items-center justify-between mt-2">
			<span class="text-sm font-base">
				Скидка по промокоду
			</span>
			<span class="text-sm font-semibold text-red-500">
				{{ cart.promo_discount_amount }}  &#x20bd;	
			</span>
		</div>
		<div 
			v-if="cart.bonuses_to_apply && cart?.bonuses_to_apply > 0"
			class="flex items-center justify-between mt-2">
			<span class="text-sm font-base">
			    Бонусов будет начислено	
			</span>
			<span class="text-sm font-semibold text-greenText bg-greenDim px-2 rounded-lg">
				{{ cart.bonuses_to_apply }}
			</span>
		</div>
	</div>
	<div class="pt-3 mt-3 border-t border-gray-300">
		<div class="flex items-center justify-between">
			<span class="text-lg font-bold">
				Общая стоимость
			</span>
			<span class="text-lg font-bold text-black">
				{{ cart.total_amount }}  &#x20bd;	
			</span>
		</div>
	</div>
	<!-- cart go checkout button -->
	<div
		@click="goCheckoutClick"	
		class="flex justify-center w-full max-w-[500px] py-4 mx-auto bg-green-500 rounded cursor-pointer hover:bg-green-600 transition my-4">
		<span class="text-sm font-bold text-white select-none">
			Перейти к оформлению	
		</span>
	</div>
	<!-- eof cart go checkout button -->

</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

// local components 

export default defineComponent({
	name: "CartSummary",
	props: {
		cart: {
			type: Object,
			default: null,
		},
	},
	components: {
	},
	emtis: ['submit-promo'],
	setup (props, {emit}) {
		// functions
		const goCheckoutClick = () => emit('go-checkout')
		//const submitPromo = (value: string) => emit('submit-promo', value)
		//const removeCartPromo = () => emit('remove-cart-promo')

		return {
			// functions
			goCheckoutClick,
		//	submitPromo,
		//	removeCartPromo,
		}
	}
});
</script>
