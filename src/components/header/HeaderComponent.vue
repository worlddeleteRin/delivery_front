<template>
<div class="mx-auto max-w-screen-lg 2xl:max-w-screen-xl">
	
	<div class="h-[50px] md:h-[76px] flex items-center justify-between relative flex-shrink">

	<!-- open mobile menu button -->
	<div 
	@click="openMobileMenuClick"
	class="flex px-2 py-1"
	>
		<Icon
		icon="feather:menu"
		width="22"
		class="block md:hidden"
		/>
	</div>
	<!-- eof open mobile menu button -->

	<!-- header logo -->
	<router-link :to="'/'" 
	class="flex items-center flex-shrink w-4/12 h-full md:w-3/12">
		<img 
		:src="static_url + 'logo_variant.png'"
		class="object-contain w-full max-h-full h-11/12"
		/>
	</router-link>
		<!-- 
		<div class="ml-4 text-2xl">
			{{ brandName }}
		</div>
		-->
	<!-- eof header logo -->
	<!-- header location -->
	<div class="flex-row items-center hidden ml-8 lg:flex">
		<Icon
			icon="carbon:location-filled"
			class="text-gray-800"
			width="25"
		/>
		<span class="ml-1 text-lg tracking-wide">
			Симферополь
		</span>
	</div>
	<!-- eof header location -->
	<!-- header contact -->
	<div class="flex-col flex-1 hidden w-3/12 md:flex md:flex-0">
		<div class="w-full text-center">
			<a 
			:href="'tel:'+ contactPhone"
			class="text-xl font-medium text-black"	
			>
				{{ contactPhoneDisplay }}	
			</a>
		</div>
		<div class="w-full text-center">
		<Button
			disabled
			@button-click="requestCallClick"
			class="block mx-auto mt-1 max-w-max bg-default"
			textColor="white"
			:title="'Заказать звонок'"
			:size="'medium'"
		/>
		</div>
	</div>
	<!-- eof header contact -->

	<!-- header profile links -->
	<div class="justify-end flex-1 hidden md:flex">
	<!-- if user authorized block -->	
	<div
	v-if="!userAuthorized"
	>
		<Button
		@button-click="openUserAuthorizeClicked"
		title="&#x1F525; Войти"
		rounded="full"
		size="large"
		shadow="small"
		backgroundColor="#f3f3f7"
		class="ml-2 text-[#5c6370] hover:text-gray-900"
		/>
	</div>

	<!-- eof if user authorized block -->
	<!-- if user not authorized -->
	<div
	v-else
	>
		<router-link to="/profile">
			<Button
				title="&#x1F389; Бонусы"
				rounded="full"
				size="large"
				backgroundColor="#f3f3f7"
				shadow="small"
				class="text-[#5c6370] hover:text-gray-900"
			/>
		</router-link>

		<!-- user profile link button -->
		<router-link :to="'/profile'">
		<Button
		title="&#x1F511; Кабинет"
		rounded="full"
		shadow="small"
		size="large"
		backgroundColor="#f3f3f7"
		class="ml-2 text-[#5c6370] hover:text-gray-900"
		/>
		</router-link>
		<!-- eof user profile link button -->

	</div>
	<!-- eof if user not authorized block -->
	</div>
	<!-- eof header profile links -->

	<!-- mobile cart -->
	<router-link
	:to="'/cart'"
	class="flex px-2 py-1"
	>
		<Icon
		icon="akar-icons:shopping-bag"
		width="22"
		class="block md:hidden"
		/>
	</router-link>
	<!-- eof mobile cart -->


	</div>



	<!-- subheader -->
	<el-affix>
		<div class="relative hidden md:flex h-[58px] items-center justify-between bg-white">
			<!-- desktop nav links -->				
			<div class="flex items-center">
				<router-link
				:to="nav_link.link_path"
				v-for="nav_link in menuLinks"
				:key="nav_link"
				class="py-4 mr-4 text-sm font-semibold cursor-pointer select-none hover:text-default transition duration-200"
				>
					{{ nav_link.link_name }}
				</router-link>
			</div>
			<!-- eof desktop nav links -->
			<!-- header cart -->
			<router-link 
			:to="'/cart'"
			class="px-5 py-2 rounded-full cursor-pointer bg-default">
				<span class="text-[white] select-none">
					Корзина | {{ cartQuantity }}
				</span>
				<span>
				</span>
			</router-link>
			<!-- eof header cart -->
		</div>
	</el-affix>
	<!-- eof subheader -->


</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from '@/components/buttons/Button.vue';
export default defineComponent({
	name: "HeaderComponent",
	props: {
		menuLinks: {
			type: Array,
			default: () => [
					{
						'link_name': "Меню доставки",
						'link_path': "/",
					},
					{
						'link_name': "Пицца",
						'link_path': "/#pizza",
					},
					{
						'link_name': "Роллы",
						'link_path': "/#rolls",
					},
					{
						'link_name': "Сеты",
						'link_path': "/#sets",
					},
					{
						'link_name': "Напитки",
						'link_path': "/",
					},
					{
						'link_name': "Бургеры",
						'link_path': "/",
					},
					{
						'link_name': "Акции",
						'link_path': "/stocks",
					},
					{
						'link_name': "Контакты",
						'link_path': "/contacts",
					},
				],
		},
		brandName: {
			type: String,
			default: "BrandName",
		},
		logoUrl: {
			type: String,
			default: "",
		},
		contactPhone: {
			type: String,
			default: "79780000000",
		},
		contactPhoneDisplay: {
			type: String,
			default: "7 978-000-00-00",
		},
		userAuthorized: {
			type: Boolean,
			default: false,
		},
		cartQuantity: {
			type: Number,
			default: null,
		}
	},
	components: {
		Button,
	},
	emits: ["open-mobile-menu", "open-call-request", "open-user-authorize"],
	setup (props, {emit}) {

		var requestCallClick  = () => emit("open-call-request")
		var openMobileMenuClick = () => emit("open-mobile-menu")
		var openUserAuthorizeClicked = () => emit("open-user-authorize")

		return {
			// functions
			requestCallClick,
			openMobileMenuClick,
			openUserAuthorizeClicked,
		}
	}
})
	
</script>
