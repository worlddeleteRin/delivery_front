<template>
<div class="text-2xl font-semibold md:text-3xl">
	Верификация аккаунта	
</div>

<!-- user verify form -->
<div>
	<!-- user phone -->
	<div class="mt-5 text-center">
		Номер телефона
	</div>
	<div
		class="flex flex-shrink w-full px-4 py-3 mt-2 text-lg text-gray-400 rounded-md bg-defaultGray max-w-[300px] items-center"
	>
		<input
			autocomplete="false"
			disabled
			v-model="user_login_info_local.user_phone_mask"
			placeholder="+7 999-999-99-99"
			class="flex w-full text-lg select-none bg-defaultGray"
		/>
		<div 
		@click="goLoginClicked"
		class="text-sm border-b-2 border-dashed cursor-pointer select-none text-defaultText border-defaultText">
			Изменить
		</div>
	</div>
	<!-- eof user phone -->

	<!-- user code -->
	<div class="flex flex-col items-center mt-3">
	<div class="text-center">
	    Последние 4 цифры номера телефона, который Вам позвонил	
	</div>
	<input
		autocomplete="false"
		v-model="user_login_info_local.verify_code"
		placeholder="Ваш код"
		@input="updateUserLoginInfo"
		class="w-full px-4 py-3 mt-2 text-lg rounded-md bg-defaultGray focus:outline-none focus:ring-2 ring-default max-w-[150px] mx-auto"
	/>
	</div>
	<!-- eof user code -->
	
	<!-- verify button -->
	<div class="mt-8">
		<Button
		:size="'large'"
		@button-click="userRegisterVerifyClick"
		:title="'Создать аккаунт'"
		rounded="full"
		class="flex justify-center px-5 py-3 text-white bg-default"
		/>
	</div>
	<!-- eof verify button -->

</div>
<!-- eof user verify form -->	

</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Button from '@/components/buttons/Button.vue';

export default defineComponent({
	name: "UserLoginVerifyAccountComponent",
	components: {
		Button,
	},
	props: {
		userLoginInfo: {
			type: Object,
			default: null,
		}
	},
	emits: ['user-login-info', 'toast-error', 'toast-success', 'user-register-verify', 'go-login'],
	setup(props, {emit}) {
		// user_login data
		var user_login_info_local =  reactive(
			props.userLoginInfo
		);
		// emit user login data from local, when local changes
		var updateUserLoginInfo = (event: Record<string,any>) => {
			emit('user-login-info', user_login_info_local)	
		}					
		// emit user check verify code, when button clicked
		var userRegisterVerifyClick = () => emit('user-register-verify')
		// emit go login state, when button clicked
		var goLoginClicked = () => emit('go-login')

		return {
			// reactive
			user_login_info_local,
			// functions
			updateUserLoginInfo,
			userRegisterVerifyClick,
			goLoginClicked,
		}
	}
});
</script>
