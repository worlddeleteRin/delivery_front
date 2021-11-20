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
	:id="product.id"
	:class="['fixed top-0 left-0 w-full h-full bg-white block z-50 overflow-hidden']"
>
	<!-- main product card div -->
    <div class="overflow-scroll border-2 border-black w-full h-full px-9">

	<!-- image -->
	<div class="max-h-[300px] h-full relative rounded w-full flex">
		<img
			v-lazy="product.imgsrc[0]"
			class="object-contain w-full rounded"
		/>
	</div>
	<!-- eof image -->

	<!-- detail block -->
	<div class="relative w-full mb-20">
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
    </div>
	<!-- eof main product card div -->


		<!-- addcart -->
		<div class="w-full overflow-hidden fixed bottom-0 left-0 px-2 py-4 bg-white shadow-lg">
			<Button
				@button-click="addCartClick"
                size="large"
				:title="'В корзину за '+ product.price + ' &#8381;'"
				class="block px-5 text-white bg-default"
			/>
		</div>
		<!-- eof addcart -->

	<div
	@click="closeProductPage"
	class="fixed p-1 bg-white rounded-full shadow-lg cursor-pointer left-4 top-3"
	>
		<Icon
			icon="bx:bxs-chevron-down"
			width="40"
			class="text-black"
		/>
	</div>

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
            default: null
		},
	},
	emits: ['add-to-cart'],

	setup (props, { emit }) {	
		const router = useRouter()
		// refs
		const is_mounted = ref(false)
		const is_closed = ref(false)

		// computed

		// functions
		var addCartClick = () => emit('add-to-cart')
		var closeProductPage = () =>  { 
            document.querySelector("html").style.overflow = "scroll"
			if (!is_closed.value) {
				is_closed.value = true
				is_closed.value = true
                router.push('/')
				// router.go(-1)
				// router.back()
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
			// const pr = document.querySelector("#" + props.product.id)
		});


		return {
			is_mounted,
			// functions
			addCartClick,
			closeProductPage,
		}
	}
});
</script>
