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
	class="fixed w-11/12 bg-white rounded-lg top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 max-w-[600px] z-40">
		<div class="px-12 py-8">

			<div class="text-3xl font-medium text-center">
				Заказать звонок	
			</div>

			<!-- user request call form -->
			<div>
				<!-- user password -->
				<div class="mt-5 text-center">
					Ваше Имя	
				</div>
				<input
				v-model="request_call_info_local.name"
				placeholder="Ваше Имя"
				class="w-full px-4 py-3 mt-2 text-lg rounded-md bg-defaultGray focus:outline-none focus:ring-2 ring-default"
				/>
				<!-- eof user password -->

				<!-- user password repeat -->
				<div class="mt-2 text-center">
					Ваш номер телефона	
				</div>
				<input
				v-model="request_call_info_local.phone_mask"
				@maska="setRequestPhone"
				v-maska="'+7 ###-###-##-##'"
				placeholder="+7 999-999-99-99"
				class="w-full px-4 py-3 mt-2 text-lg rounded-md bg-defaultGray focus:outline-none focus:ring-2 ring-default"
				/>
				<!-- eof user password repeat -->

				<!-- register button -->
				<div class="mt-8">
					<Button
					@button-click="requestCallClick"
					:title="'Заказать звонок'"
					rounded="full"
					class="flex justify-center px-5 py-3 text-white bg-default"
					/>
				</div>
				<!-- eof register button -->

			</div>


		</div>
	</div>

</transition>
	

</template>

<script lang="ts">
import { onMounted, ref, reactive, defineComponent } from 'vue';
import { maska } from 'maska';
import { createToast } from 'mosha-vue-toastify';
// local components
import Button from '@/components/buttons/Button.vue';


export default defineComponent({
	name: "RequestCallModal",
	emits: ['close-modal', 'request-call', 'request-call-info'],
	components: {
		Button,
	},
	directives: {
		maska,
	},
	props: {
		requestCallInfo: {
			type: Object,
			required: true,
			default: null,
		},
	},
	setup (props, {emit}) {
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
		const inputSuccessToast = (title: string) => {
			createToast(
				title, {
					'type': 'success',
					'showIcon': true,
					'hideProgressBar': true,
				}
			);
		};
		var errorToast = (title: string) => inputErrorToast(title)
		var successToast =  (title: string) => inputSuccessToast(title)
		// eof toasts
		const request_call_info_local = reactive({...props.requestCallInfo})

		const is_mounted = ref(false)
		// functions
		onMounted(() => {
			is_mounted.value = true
		})
		var closeModalClick = () => emit('close-modal')		
		// validate request call
		var validateRequestCall = () => {
			const phone = request_call_info_local.phone
			const name = request_call_info_local.name
			const v_info = {
				is_valid: false,
				v_msg: ''
			}
			if (name.length == 0 || phone.length == 0) {
				v_info.v_msg = "Заполните все необходимые поля"
				return v_info
			}
			if (phone.length != 10) {
				v_info.v_msg = "Корректно введите номер телефона"
				return v_info
			}
			v_info.is_valid = true
			return v_info
		}
		// send request call info, if it is valid
		var requestCallClick = () => { 
			const validate_info = validateRequestCall()
			updateRequestCallInfoClick()
			if (!validate_info.is_valid) {
				return errorToast(validate_info.v_msg)
			} else {
				// can emit request call and send call request
				emit('request-call')
				return successToast('request-call emited')
			}
		}
		var updateRequestCallInfoClick = () => emit('request-call-info', request_call_info_local)

		var setRequestPhone = (event: Record<string,any>) => {
//			window.alert('set Request phone triggered')
			request_call_info_local.phone = event.target.getAttribute('data-mask-raw-value')
		//	updateRequestCallInfoClick()
		}	

		return {
			// reactive
			request_call_info_local,
			// computed
			is_mounted,
			// functions
			closeModalClick,
			requestCallClick,
			setRequestPhone,
			updateRequestCallInfoClick,
		}
	}
});

</script>
