<template>
<div 
	@click="closeProductPage"
	class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-20"
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
	:class="['fixed inset-x-0 w-10/12 max-w-[800px] h-2/3 max-h-[500px] mx-auto bg-white rounded-xl top-1/2 transform -translate-y-1/2 flex flex-row z-50 py-4 px-4']"
>
	<!-- main product card div -->

	<!-- image -->
	<div class="max-h-[400px] h-full relative rounded w-7/12 flex pr-4">
		<img
			v-lazy="product?.imgsrc[0]"
			class="object-contain w-full rounded"
		/>
	</div>
	<!-- eof image -->

	<!-- detail block -->
	<div class="relative w-full md:w-5/12 md:flex md:flex-col md:justify-between">
		<div
			class="relative h-full md:overflow-y-scroll md:mb-4"
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

		<!-- addcart -->
		<div class="w-full">
			<Button
				@button-click="addCartClick"
				rounded="full"
				:size="'large'"
				:title="'В корзину за '+ productPrice(product) + ' &#8381;'"
				class="block max-w-full px-5 mx-3 text-white bg-default"
			/>
		</div>
		<!-- eof addcart -->

		<div
		@click="closeProductPage"
		>
			<Icon
				icon="ci:close-big"
				width="50"
				class="absolute p-1 text-white cursor-pointer -top-4 -right-14"
			/>
		</div>

	</div>
	<!-- eof detail block -->


<!--
	</div>
	-->
	<!-- eof main product card div -->

</div>


</transition>



</template>

<script lang="ts">

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
			default: null,
		},
	},
	emits: ['add-to-cart'],

	setup (props, { emit }) {	
		const router = useRouter()
		const can_pan_px = 0
		const min_need_close_px = 110
		// refs
		const is_mounted = ref(false)
		var productElement = ""
		// computed

		// functions

		var addCartClick = () => emit('add-to-cart')

		var closeProductPage = () =>  { 
			router.push("/")
		}

        const productPrice = (product: Record<string,any>) => {
            if (product.sale_price && product.sale_price > 0) {
                return product.sale_price 
            }    
            return product.price
        }

		onMounted (() => {
			is_mounted.value = true
		});

		onUnmounted(() => {
			return null
		});

		return {
			is_mounted,
			// functions
			addCartClick,
			closeProductPage,
            productPrice
		}
	}
});
</script>
