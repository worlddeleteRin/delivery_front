<template>
<div class="fixed top-0 left-0 z-40 w-full h-full overflow-y-scroll text-white bg-black">
	<div class="">
		
		<!-- mobile menu first -->
		<div :class="['flex justify-between h-[50px] relative', border_bottom_class]">
			<!-- logo -->
			<div class="flex items-center h-full ml-3 max-w-[186px]">
				<img 
				:src="logoUrl" 
				alt="logo is here"
				class="object-contain w-full h-full"
				>
			</div>
			<!-- eof logo -->
			<!-- exit menu -->
			<div 
			@click="closeMobileMenu"
			class="flex items-center px-2 py-1">
				<Icon 
				icon="carbon:close"
				width="35"
				/>
			</div>
			<!-- eof exit menu -->
		</div>
		<!-- eof mobile menu first -->

		<!-- mobile menu links -->
		<div :class="['py-1 pl-10 pr-3', border_bottom_class]">


			<div
			@click="routeTo('/')"
			class="px-4 py-3 hover:bg-[#262626] rounded-md select-none"
			>
				<span class="text-xl font-medium">
					Главная	
				</span>
			</div>
			<div
			@click="routeTo('/profile')"
			v-if="userAuthorized"
			class="px-4 py-3 hover:bg-[#262626] rounded-md select-none"
			>
				<span class="text-xl font-medium">
					Профиль	
				</span>
			</div>
			<div
			@click="openUserAuthorizeClick"
			v-if="!userAuthorized"
			class="px-4 py-3 hover:bg-[#262626] rounded-md select-none"
			>
				<span class="text-xl font-medium">
					Войти	
				</span>
			</div>
			<div
			@click="routeTo('/stocks')"
			class="px-4 py-3 hover:bg-[#262626] rounded-md select-none"
			>
				<span class="text-xl font-medium">
					Акции	
				</span>
			</div>
			<div
			@click="routeTo('/contacts')"
			class="px-4 py-3 hover:bg-[#262626] rounded-md select-none"
			>
				<span class="text-xl font-medium">
					Контакты	
				</span>
			</div>
			<div
			@click="routeTo('/')"
			class="px-4 py-3 hover:bg-[#262626] rounded-md select-none"
			>
				<span class="text-xl font-medium">
					О Нас	
				</span>
			</div>


		</div>
		<!-- eof mobile menu links -->

		<!-- mobile menu contacts -->
		<div :class="['py-1 pl-4 pr-2', border_bottom_class]">
			<div class="flex items-center px-2 py-3 hover:bg-[#262626] rounded-md">
				<Icon
				icon="bi:phone"
				width="35"
				/>
				<div class="flex flex-col ml-2 select-none">
					<span class="text-lg font-semibold">
						{{ contactPhoneDisplay }} 
					</span>
					<span class="text-sm text-gray-400">
						Всегда на связи!
					</span>
				</div>
			</div>
			<div class="flex items-center px-2 py-3 hover:bg-[#262626] rounded-md select-none">
				<Icon
				icon="ci:apple"
				width="35"
				/>
				<div class="flex flex-col ml-2">
					<span class="text-lg font-semibold">
						App Store
					</span>
					<span class="text-sm text-gray-400">
						Мобильное приложение
					</span>
				</div>
			</div>
			<div class="flex items-center px-2 py-3 hover:bg-[#262626] rounded-md select-none">
				<Icon
				icon="ci:play-store"
				width="35"
				/>
				<div class="flex flex-col ml-2">
					<span class="text-lg font-semibold">
						Play Store 
					</span>
					<span class="text-sm text-gray-400">
						Мобильное приложение
					</span>
				</div>
			</div>
			<div class="flex items-center px-2 py-3 hover:bg-[#262626] rounded-md select-none">
				<Icon
				icon="akar-icons:instagram-fill"
				width="35"
				/>
				<div class="flex flex-col ml-2">
					<span class="text-lg font-semibold">
						Инстаграм	
					</span>
					<span class="text-sm text-gray-400">
						Мы в Инстаграм 
					</span>
				</div>
			</div>
			<div class="flex items-center px-2 py-3 hover:bg-[#262626] rounded-md select-none">
				<Icon
				icon="bx:bxl-vk"
				width="35"
				/>
				<div class="flex flex-col ml-2">
					<span class="text-lg font-semibold">
						Вконтакте	
					</span>
					<span class="text-sm text-gray-400">
						Мы в Вконтакте
					</span>
				</div>
			</div>
		</div>
		<!-- eof mobile menu contacts -->

		<!-- -->
		<!-- -->

	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: "MobileHeaderMenu",
	props: {
		userAuthorized: {
			type: Boolean,
			default: false,
		},
		logoUrl: {
			type: String,
			required: true,
			default: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder-1.png',
		},
		contactPhone: {
			type: String,
			required: true,
			default: "79780000000",
		},
		contactPhoneDisplay: {
			type: String,
			required: true,
			default: "7 (978)-000-00-00",
		},
	},
	emits: ['close-mobile-menu', 'open-user-authorize'],
	components: {
	},
	setup (props, { emit }) {
		const router = useRouter()
		const border_bottom_class = "border-b-[1px] border-gray-800"
		// functions
		const routeTo = (route_path: string) => {
			router.push(route_path)
			closeMobileMenu()
		}
		var closeMobileMenu = () => emit('close-mobile-menu')	
		const openUserAuthorizeClick = () => {
			closeMobileMenu()
			emit('open-user-authorize')
		}
		return {
			border_bottom_class,
			// functions
			openUserAuthorizeClick,
			closeMobileMenu,
			routeTo,
		}
	}
});
</script>
