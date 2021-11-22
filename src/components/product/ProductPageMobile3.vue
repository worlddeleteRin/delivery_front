<template>
    <van-popup
      @close="closePage"
      :show="show"
      round
      position="bottom"
      :closeable="false"
      :style="{ height: '80%' }"
      class="relative px-3 py-2"
    >

    <div class="relative">
    <!-- product content -->
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

    <!-- close container -->
	<div
	@click="closePage"
	class="absolute p-1 bg-white rounded-full shadow-lg cursor-pointer top-3 right-0 max-w-max"
	>
		<Icon
			icon="bx:bxs-chevron-down"
			width="40"
			class="text-black"
		/>
	</div>
    <!-- eof close container -->

	</div>
    <!-- eof content -->


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


    <!-- eof product content -->

    </van-popup>

</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "ProductPageMobile3",
    props: {
        product: {
            type: Object,
            default: null,
        }
    },
    emits: ['add-to-cart'],
    setup(props, {emit}) {
        const show = ref(true)
        // const 
        const router = useRouter()

        const closePage = () => {
            router.push('/')
            console.log("closing page")
        }
        const addCartClick = () => {
            emit('add-to-cart') 
        }
        return {
            show,
            // functions
            closePage,
            addCartClick
        }
    }
})

</script>
