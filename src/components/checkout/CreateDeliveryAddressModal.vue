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
	class="fixed w-11/12 bg-white rounded-lg top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 max-w-[700px] max-h-[500px] h-[75%]">
		<div class="flex flex-col h-full px-4 h-11/12 md:px-12">

			<div class="mt-6 text-xl font-medium text-center md:text-2xl">
				Новый адрес	
			</div>

			<!-- create address form -->
			<div class="px-2 pt-2 pb-12 overflow-y-scroll">
				<!-- first line -->
				<div class="flex w-full mt-2">
					<!-- address city -->
					<div class="flex flex-col flex-1 w-8/12 mr-4">
						<div class="text-lg text-gray-500">Улица</div>				
						<input 
							v-model="address.street"
							class="px-3 py-3 bg-gray-100 outline-none rounded-xl focus:ring-2 ring-default"
							placeholder="Название улицы"
						/>
					</div>
					<!-- address city -->
					<!-- houseNumber -->
					<div class="flex flex-col w-3/12">
						<div class="text-lg text-gray-500">Дом</div>				
						<input 
							v-model="address.house_number"
							class="px-3 py-3 bg-gray-100 outline-none rounded-xl focus:ring-2 ring-default"
							placeholder="###"
						/>
					</div>
					<!-- eof houseNumber -->
				</div>
				<!-- eof first line -->
				<!-- second line -->
				<div class="flex w-full mt-2">
					<!-- address flatNumber -->
					<div class="flex flex-col flex-1 w-3/12 mr-4">
						<div class="text-lg text-gray-500">Квартира</div>				
						<input 
							v-model="address.flat_number"
							class="px-3 py-3 bg-gray-100 outline-none rounded-xl focus:ring-2 ring-default"
							placeholder="###"
						/>
					</div>
					<!-- address flatNumber -->
					<!-- entranceNumber -->
					<div class="flex flex-col flex-1 w-3/12 mr-4">
						<div class="text-lg text-gray-500">Подьезд</div>				
						<input 
							v-model="address.entrance_number"
							class="px-3 py-3 bg-gray-100 outline-none rounded-xl focus:ring-2 ring-default"
							placeholder="###"
						/>
					</div>
					<!-- eof entranceNumber -->
					<!-- floorNumber -->
					<div class="flex flex-col flex-1 w-3/12">
						<div class="text-lg text-gray-500">Этаж</div>				
						<input 
							v-model="address.floor_number"
							class="px-3 py-3 bg-gray-100 outline-none rounded-xl focus:ring-2 ring-default"
							placeholder="###"
						/>
					</div>
					<!-- eof floorNumber -->
				</div>
				<!-- eof second line -->
				<!-- third line -->
				<div class="flex w-full mt-2">
					<!-- address comment -->
					<div class="flex flex-col flex-1 w-full">
						<div class="text-lg text-gray-500">Комментарий к адресу</div>				
						<textarea
							v-model="address.comment"
							rows="4"
							class="px-3 py-3 bg-gray-100 outline-none rounded-xl focus:ring-2 ring-default"
							placeholder="Ваш комментарий к адресу"
						/>
					</div>
					<!-- address comment -->
				</div>
				<!-- eof third line -->
			</div>
			<!-- eof create address form -->

			<!-- add new address button -->
			<div class="w-full mb-2 bg-white">
				<Button
					@button-click="createDeliveryAddressClick"
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
import { onMounted, ref, reactive, defineComponent } from 'vue';
//import { Icon } from '@iconify/vue';
import Button from '@/components/buttons/Button.vue';

export default defineComponent({
	name: "CreateDeliveryAddressModal",
	emits: ['close-modal', 'create-delivery-address'],
	components: {
//		Icon,
		Button,
	},
	props: {
	},
	setup (props, {emit}) {
		const is_mounted = ref(false)
		// reactive
			// new address 
		const address = reactive({
			street: '',
			house_number: '',
			flat_number: '',
			entrance_number: '',
			floor_number: '',
			comment: '',
		});

		// functions
		onMounted(() => {
			is_mounted.value = true
		})
		var closeModalClick = () => emit("close-modal")		
		// emit to create new delivery address
		var createDeliveryAddressClick = () => {
			emit("create-delivery-address", address)
		}

		return {
			// reactive
			address,
			// computed
			is_mounted,
			// functions
			closeModalClick,
			createDeliveryAddressClick,
		}
	}
});

</script>
