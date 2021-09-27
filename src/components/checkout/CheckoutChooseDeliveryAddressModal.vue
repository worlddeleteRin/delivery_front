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
				Выберите адрес доставки	
			</div>

			<!-- addresses list -->
			<div v-if="addressList.length > 0"
			class="mt-5 overflow-y-scroll">
				<!-- address -->
				<div
					v-for="address in addressList"
					:key="address.id"
					:class="['pr-4 my-3 bg-gray-100 rounded-lg flex justify-between items-center',
					isActive(address.id) ? 'border-2 border-green-500':'']"
				>
					<div 
					@click="chooseDeliveryAddressClick(address)"
					class="pl-4 flex-1 h-full py-3 min-h-[60px] rounded-lg flex items-center cursor-pointer">
						<div class="select-none">
							{{ address.address_display }}
						</div>
					</div>
					<div class="flex items-center">
					<div 
					v-if="isActive(address.id)"
					class="flex justify-end flex-1 ml-4">
						<Icon 
							icon="akar-icons:circle-check"
							width="30"
							class="text-green-500"
						/>
					</div>
					<div 
					@click="deleteDeliveryAddressClick(address.id)"
					class="flex flex-1 p-1 ml-1 cursor-pointer">
						<Icon 
							icon="ant-design:delete-filled"
							width="30"
							class="text-red-500"
						/>
					</div>
					</div>
				</div>
				<!-- eof address -->
			</div>
			<!-- eof addresses list -->
			<div v-else>
				У вас не добавлено ни одного адреса
			</div>

			<!-- add new address button -->
			<div class="flex items-end flex-1 mb-2">
				<Button
					@click="openCreateDeliveryClick"
					:title="'Добавить адрес'"
					rounded="full"
					class="flex justify-center items-center px-5 min-h-[45px] text-white bg-default w-11/12 mx-auto max-w-[400px]"
					/>
			</div>
			<!-- eof add new address button -->

		</div>
	</div>

</transition>
	

</template>

<script lang="ts">
import { onMounted, ref, reactive, defineComponent, computed } from 'vue';
import { Icon } from '@iconify/vue';
import Button from '@/components/buttons/Button.vue';

export default defineComponent({
	name: "CheckoutChoooseDeliveryAddressModal",
	emits: ['close-modal', 'delivery-address', 'open-create-delivery', 'delete-delivery-address'],
	components: {
		Icon,
		Button,
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
		});
		var deleteDeliveryAddressClick = (delivery_address_id: string) => {
			emit("delete-delivery-address", delivery_address_id)
			if (isActive(delivery_address_id)) {
				emit("delivery-address", {})
			}
		}
		var closeModalClick = () => emit('close-modal')		
		// emit choosed address to set on click
		var chooseDeliveryAddressClick = (delivery_address: Record<string,any>)  => { 
			emit("delivery-address", delivery_address)
			closeModalClick()
		}
		
		// emit open create new delivery address modal
		var openCreateDeliveryClick = () => emit('open-create-delivery')

		return {
			// reactive
			// computed
			is_mounted,
			isActive,
			// functions
			deleteDeliveryAddressClick,
			closeModalClick,
			chooseDeliveryAddressClick,
			openCreateDeliveryClick,
		}
	}
});

</script>
