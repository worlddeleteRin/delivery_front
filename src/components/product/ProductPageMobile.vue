<template>
<div 
	@click="closeProductPage"
	class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40"
	style="">
</div>

	<transition 
		enter-active-class="transition ease-out duration-200" 
		enter-from-class="opacity-0 translate-y-1 scale-90" 
		enter-to-class="opacity-100 translate-y-0 scale-100" 
	>
<!-- 
	product page is a popover modal
-->

<div 
	id="product_id_1"
	:class="['fixed top-0 left-0 w-full h-full bg-white py-7 px-9 rounded-xl flex flex-col overflow-x-hidden z-50']"
	:style="[overflow_style]"
>
	<!-- main product card div -->

	<!-- image -->
	<div class="max-h-[400px] h-full relative rounded w-full flex">
		<img
			v-lazy="'https://dodopizza-a.akamaihd.net/static/Img/Products/ebb801139e7d4c4397fcc4372c7dd149_1875x1875.jpeg'"
			class="object-contain w-full rounded"
		/>
	</div>
	<!-- eof image -->

	<!-- detail block -->
	<div class="relative w-full">
		<div
			class="relative h-full"
		>
			<!-- product name -->
			<div class="text-2xl font-medium">
				{{ product.name }}
			</div>
			<!-- eof product name -->
			<!-- product weight -->
			<div class="text-gray-500">
				250 гр.	
			</div>
			<!-- eof product weight -->
			<!-- product description -->
			<div class="mt-1">
				{{ product.description }}
				<div
				v-for="item in 15"
				:key="item"
				>
					<div>
					some test content here	
					</div>
				</div>

			</div>
			<!-- eof product description -->

		</div>


	</div>
	<!-- eof detail block -->


	<div
	@click="closeProductPage"
	class="fixed p-1 cursor-pointer -top-12 -right-12"
	>
		<Icon
			icon="ci:close-big"
			width="40"
			class="text-black"
		/>
	</div>

<!--
	</div>
	-->
	<!-- eof main product card div -->

		<!-- addcart -->
		<div class="fixed bottom-0 left-0 w-full mb-8 overflow-hidden">
			<Button
				rounded="full"
				:size="'large'"
				:title="'В корзину за '+ product.price + ' &#8381;'"
				class="block px-5 text-white bg-default"
			/>
		</div>
		<!-- eof addcart -->

</div>


</transition>


</template>

<script>
import { defineComponent, PropType, onMounted, onUnmounted, onBeforeMount, ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
//import ProductInterface from '@/interfaces/ProductInterface';
//import LazyImage from '@/components/image/LazyImage.vue';
import Button from '@/components/buttons/Button.vue';
// delete below code
import { useRouter } from 'vue-router';

export default defineComponent({
	name: "ProductPage",
	components: {
		Icon,
//		LazyImage,
		Button,
	},
	props: {
		product: {
			type: Object, // change to product interface Object type?
			default() { 
				return {
					"id": "someproductid",
					"name": "some product name",
					"description": "some product cool description will be here asdf sadfasdf asdfasdf asdf asdf asdfas dfasdf asdf asdf",
					"price": 123123,
					"imgsrc": [
						"https://i.picsum.photos/id/527/1000/1000.jpg?hmac=58DhmNmoflyEtAQW8CtzqGN1tItgvnytquSC23qjhdQ"
					],
				};
			},
		},
	},
	emits: ['add-cart'],

	setup (props, { emit }) {	
		const router = useRouter()
		// refs
		const is_mounted = ref(false)
		const is_closed = ref(false)
		const overflow_style = ref("overflow-y: scroll;")
		const backgroud_translate_style = ref("")

		// computed

		// functions

		const makeOverflowYScroll = () => { 
			overflow_style.value = "overflow-y: scroll;"
		}
		const makeOverflowYHidden = () => { 
			overflow_style.value = "overflow-y: hidden;"
		}
		var addCartClick = () => emit('add-cart')
		var closeProductPage = () =>  { 
			if (!is_closed.value) {
				is_closed.value = true
				// remove hammer event from element
				makeOverflowYScroll()
				is_closed.value = true
				router.back()
			}
		}

		onUnmounted(() => {
			document.querySelector("html").style.overflow = "scroll"
		});
		onBeforeMount(() => {
			// disable scroll for html
			document.querySelector("html").style.overflow = "hidden"
		});
		onMounted (() => {
			is_mounted.value = true
			const pr = document.querySelector("#product_id_1")
		});

		const on_mouse_down = (e, f) => {
			return null
		}

		return {
			is_mounted,
			// functions
			addCartClick,
			closeProductPage,
			overflow_style,
			backgroud_translate_style,		
		}
	}
});
</script>
