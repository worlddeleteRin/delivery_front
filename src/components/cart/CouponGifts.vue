<template>
<div class="w-full">
	<div class="mx-auto w-full text-center text-lg">
		Подарки по промокоду 
		<div class="text-defaultText font-semibold">
		{{ coupon.code }}
		</div>
	</div>
	<!-- coupon gifts -->	
	<div
		class="flex flex-wrap gap-2 justify-center"
	>
		<div
			v-for="gift_item in couponGifts"
			:key="gift_item.id"
			class="relative px-4 py-2 border-2 border-defaultText rounded-lg"
		>
			<div class="">
				<img 
					:src="gift_item.imgsrc[0]"
					class="max-w-[130px] mx-auto"
				/>
			</div>
			<div>
			{{ gift_item.name }}
			</div>
			<Icon
				icon="flat-ui:gift-box"
				class="absolute top-1 right-1"
				width="25"
			/>
			<div class="text-[10px] text-white bg-green-500 max-w-max rounded px-2">
				БЕСПЛАТНО
			</div>
		</div>
	</div>
	<!-- eof coupon gifts -->

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// local components
export default defineComponent({
	name: "CouponGifts",
	props: {
		coupon: {
			type: Object,
			default: null
		},
		couponGifts: {
			type: Array,
			default: null,
		},
	},
	components: {
	},
	setup (props, {emit}) {
		// functions
		return {
		}
	}
});
</script>

