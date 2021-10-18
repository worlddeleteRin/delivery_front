<template> <div 
class="relative flex items-center w-full py-2 mx-4 mb-2 bg-white border-b border-gray-300"
>
	<!-- detail block -->
	<div class="flex flex-col md:flex-row w-full ml-3 mr-2 items-center justify-between">
		<div class="flex items-center w-full md:w-auto">
			<!-- IMG BLOCK -->
			<div class="relative flex items-center w-[80px] h-full ml-3 max-w-max">
				<img 
				:src="lineItem.product.imgsrc[0]"
				class="object-contain w-full h-full"
				style="max-height:130px;"
				/>
			</div>
			<!-- EOF IMG BLOCK -->
			<div class="text-sm font-light flex-1 ml-3 mr-6 md:mr-0">
				{{ lineItem.product.name }} 
			</div>
		</div>

		<div class="flex w-full md:ml-6 md:w-auto items-center">
			<div class="flex flex-row-reverse md:flex-row items-center justify-between w-full">
			<!-- cart item quantity -->
				<add-quantity-input
					:quantity="lineItem.quantity"
					@add="addQuantityClick"
					@remove="removeQuantityClick"
					class=""
				/>
				<!-- eof cart item quantity -->

				<!-- price block -->
				<div class="flex flex-1 text-md font-semibold md:ml-6">
					<div class="">
						{{ lineItem.product.price * lineItem.quantity }} &#8381; 
					</div>
					<div v-if="lineItem.product.sale_price && lineItem.product.sale_price > 0"
						class="text-red-500 ml-2"
					>
						{{ lineItem.product.sale_price * lineItem.quantity }} &#8381; 
					</div>
				</div>
				<!-- eof price block -->
			</div>
			<!-- delete item -->
			<div
				@click="removeFromCartClick"
				class="ml-6 absolute right-2 top-2 md:top-0 md:right-0 md:relative cursor-pointer bg-red-400 md:bg-white p-2 md:p-0 rounded-full"
			>
				<Icon
					icon="fa-solid:trash"
					class="text-white md:text-black"
				/>
			</div>
			<!-- eof delete item -->
			<!--
			<cart-product-item-delete
				@click="removeFromCartClick"
				class="ml-6 absolute right-2 top-2 md:relative"
			/>
			-->
		</div>

	</div>
	<!-- eof detail block -->


</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// local components
import CartProductItemDelete from '@/components/cart/CartProductItemDelete.vue';
import AddQuantityInput from '@/components/input/AddQuantityInput.vue';
// import { Icon } from "@iconify/vue";
export default defineComponent({
	name: "CartProductItem",
	props: {
		lineItem: Object,
		default: null,
	},
	components: {
		AddQuantityInput,
	},
	emits: ['add-quantity', 'remove-quantity', 'remove-from-cart'],
	setup (props, {emit}) {
		// functions
		const addQuantityClick = (line_item: Record<string,any>) => emit('add-quantity', props.lineItem)
		const removeQuantityClick = (line_item: Record<string,any>) => emit('remove-quantity', props.lineItem)
		const removeFromCartClick = (line_item: Record<string,any>) => emit('remove-from-cart', props.lineItem)
	// functions
		return {
			// functions
			addQuantityClick,
			removeQuantityClick,
			removeFromCartClick,
		}
	}
});
</script>

