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
				Выберите пункт выдачи	
			</div>

			<!-- addresses list -->
			<div class="mt-5 overflow-y-scroll">
				<!-- address -->
				<div
					v-for="address in addressList"
					:key="address.id"
					@click="choosePickupAddressClick(address)"
					:class="['px-4 py-3 my-3 bg-gray-100 rounded-lg min-h-[60px] flex items-center cursor-pointer',
					isActive(address.id) ? 'border-2 border-green-500':'']"
				>
					<div class="select-none">
						{{ address.name }}
					</div>
					<div 
					v-if="isActive(address.id)"
					class="flex justify-end flex-1 ml-5">
						<Icon 
							icon="akar-icons:circle-check"
							width="30"
							class="text-green-500"
						/>
					</div>
				</div>
				<!-- eof address -->
			</div>
			<!-- eof addresses list -->

		</div>
	</div>

</transition>
	

</template>

<script lang="ts">
import { onMounted, ref, reactive, defineComponent, computed } from 'vue';
//import Button from '@/components/buttons/Button.vue';

export default defineComponent({
	name: "CheckoutChoosePickupAddressModal",
	emits: ['close-modal', 'pickup-address'],
	components: {
//		Button,
	},
	props: {
		addressList: {
			type: Array,
			deafult: null,
		},
		activeAddress: {
			type: Object,
			default: null,
		},
	},
	setup (props, {emit}) {
		const is_mounted = ref(false)
		// computed
		const isActive = (address_id: string) => { 
			if (props.activeAddress) {
				return props.activeAddress.id == address_id
			}
			return false
		}
		// functions
		onMounted(() => {
			is_mounted.value = true
		})
		var closeModalClick = () => emit('close-modal')		
		// emit choosed address to set on click
		var choosePickupAddressClick = (pickup_address: Record<string,any>) => emit("pickup-address", pickup_address)

		return {
			// reactive
			// computed
			is_mounted,
			isActive,
			// functions
			closeModalClick,
			choosePickupAddressClick,
		}
	}
});

</script>
