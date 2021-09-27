<template>

<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40"
	@click="closeModalClick"
>
</div>


<transition 
	enter-active-class="transition ease-out duration-200" 
	enter-from-class="opacity-0 scale-90" 
	enter-to-class="opacity-100 scale-100" 
	leave-active-class="transition ease-in duration-1000" 
	leave-from-class="scale-100" 
	leave-to-class="scale-0"
>
	<div 
	v-if="is_mounted"
	class="fixed w-11/12 bg-white rounded-lg top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 max-w-[700px] max-h-[700px] h-[70%]">
		<div class="flex flex-col h-full px-4 h-11/12 md:px-12">

			<div class="mt-6 text-xl font-medium text-center md:text-2xl">
				Выберите способ оплаты 
			</div>

			<!-- payment methods list -->
			<div class="mt-5 overflow-y-scroll">
				<!-- payment_method -->
				<div
					v-for="payment_method in paymentMethods"
					:key="payment_method.id"
					@click="choosePaymentMethodClick(payment_method)"
					:class="['px-4 py-3 my-3 bg-gray-100 rounded-lg min-h-[60px] flex items-center cursor-pointer',
					isActive(payment_method.id) ? 'border-2 border-green-500':'']"
				>
					<div class="select-none">
						{{ payment_method.name }}
					</div>
					<div 
					v-if="isActive(payment_method.id)"
					class="flex justify-end flex-1 ml-5">
						<Icon 
							icon="akar-icons:circle-check"
							width="30"
							class="text-green-500"
						/>
					</div>
				</div>
				<!-- eof payment method -->
			</div>
			<!-- eof payment methods -->

		</div>
	</div>

</transition>
	

</template>

<script lang="ts">
import { onMounted, ref, reactive, defineComponent, computed } from 'vue';
import { Icon } from '@iconify/vue';
//import Button from '@/components/buttons/Button.vue';

export default defineComponent({
	name: "CheckoutChoosePaymentMethodModal",
	emits: ['close-modal', 'payment-method'],
	components: {
		Icon,
//		Button,
	},
	props: {
		paymentMethods: {
			type: Array,
			deafult: null,
		},
		activePayment: {
			type: Object,
			default: null,
		},
	},
	setup (props, {emit}) {
		const is_mounted = ref(false)
		// computed
		const isActive = (payment_id: string) => { 
			if (props.activePayment) {
				return props.activePayment.id == payment_id 
			}
			return false
		}
		// functions
		onMounted(() => {
			is_mounted.value = true
		})
		var closeModalClick = () => emit('close-modal')		
		// emit choosed payment method to set on click
		var choosePaymentMethodClick = (payment_method: Record<string,any>) => emit("payment-method", payment_method)

		return {
			// reactive
			// computed
			is_mounted,
			isActive,
			// functions
			closeModalClick,
			choosePaymentMethodClick,
		}
	}
});

</script>
