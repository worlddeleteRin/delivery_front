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
	class="fixed w-11/12 bg-white rounded-lg top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 max-w-[600px]">
		<div class="px-12 py-8">

			<div class="text-3xl font-medium text-center">
				Изменение пароля	
			</div>

			<!-- user register form -->
			<div>
				<!-- user password -->
				<div class="mt-5 text-center">
					Придумайте пароль	
				</div>
				<input
				v-model="user_login_info_local.user_password"
				@input="updateUserloginInfo"
				type="password"
				placeholder="Новый пароль"
				class="w-full px-4 py-3 mt-2 text-lg rounded-md bg-defaultGray focus:outline-none focus:ring-2 ring-default"
				/>
				<!-- eof user password -->

				<!-- user password repeat -->
				<div class="mt-2 text-center">
					Повторите пароль	
				</div>
				<input
				v-model="user_login_info_local.user_password_repeat"
				@input="updateUserloginInfo"
				type="password"
				placeholder="Повторите пароль"
				class="w-full px-4 py-3 mt-2 text-lg rounded-md bg-defaultGray focus:outline-none focus:ring-2 ring-default"
				/>
				<!-- eof user password repeat -->

				<!-- register button -->
				<div class="mt-8">
					<Button
					@button-click="changeUserPasswordClick"
					:title="'Продолжить'"
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
import Button from '@/components/buttons/Button.vue';

export default defineComponent({
	name: "UserChangePasswordModal",
	emits: ['close-modal', 'user-login-info', 'change-password'],
	components: {
		Button,
	},
	props: {
		userLoginInfo: {
			type: Object,
			required: true,
			default: null,
		},
	},
	setup (props, {emit}) {
		const is_mounted = ref(false)
		var user_login_info_local = reactive(props.userLoginInfo)
		// functions
		onMounted(() => {
			is_mounted.value = true
		})
		var closeModalClick = () => emit('close-modal')		
		var updateUserLoginInfo = () => emit('user-login-info', user_login_info_local)
		var changeUserPasswordClick = () => emit('change-password')

		return {
			// reactive
			user_login_info_local,
			// computed
			is_mounted,
			// functions
			closeModalClick,
			updateUserLoginInfo,
			changeUserPasswordClick,
		}
	}
});

</script>
