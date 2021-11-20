<template>
<div 
	@click="closeProductPage"
	class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40"
	:style="[backgroud_translate_style]">
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
	:class="['fixed top-0 left-0 w-full h-full bg-white py-7 px-9 flex flex-col overflow-x-hidden z-50']"
	:style="[translate_style, translate_animation, overflow_style]"
>
	<!-- main product card div -->

	<!-- image -->
	<div class="max-h-[400px] h-full relative w-full flex">
		<img
			v-lazy="product?.imgsrc[0]"
			class="object-contain w-full"
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
				v-for="item in 3"
				:key="item"
				>
					<div>
					some test content here	
					</div>
					<div>
					some test content here	
						<div>
					some test content here	
							<div>
					some test content here	
								<div>
					some test content here	
					</div>		</div>			</div>				</div>
				</div>

			</div>
			<!-- eof product description -->

		</div>

		<!-- addcart -->
		<div class="w-full overflow-hidden fixed bottom-0 left-0 px-2 py-4 bg-white shadow-lg">
			<Button
				@button-click="addCartClick"
				:size="'large'"
				:title="'В корзину за '+ product.price + ' &#8381;'"
				class="block px-5 text-white bg-default"
			/>
		</div>
		<!-- eof addcart -->


	</div>
	<!-- eof detail block -->


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

<!--
	</div>
	-->
	<!-- eof main product card div -->


</div>


</transition>


</template>

<script>
import Hammer from 'hammerjs';
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
	emits: ['add-to-cart'],

	setup (props, { emit }) {	
		const router = useRouter()
		const can_pan_px = 0
		const min_need_close_px = 110
		// refs
		const is_mounted = ref(false)
		const is_closed = ref(false)
		const overflow_style = ref("overflow-y: scroll;")
		const backgroud_translate_style = ref("")
		const translate_style = ref("")
		const translate_animation = ref("")
		const currentScroll = ref(0)
		const startPanDelta = ref(0)
		const touchPanpx = ref(0)
		const startPanpx = ref(0)
		const endPanDelta = ref(0)
		const endPanpx = ref(0)
		var productElement = ""
		// computed
		const canPan  = computed(() => currentScroll.value <= can_pan_px);
		const canClosePxCompute = computed( () => {
			var can_px = (touchPanpx.value/3) + min_need_close_px
			return can_px
		});
		const needClose = computed(() => {
			if (endPanpx.value > canClosePxCompute.value) {
				return true
			}
//			const velo = (endPanDelta - startPanDelta) * (endPanpx - startPanpx)
/*
			if ((endPanDelta.value - startPanDelta.value) < 200 && (endPanpx.value - startPanpx.value) > 120 && startPanpx.value < 40) {
				return true
			}
			*/
			return false
		});
		// functions
		const translateCard = (to_translate) => {
			translate_style.value = `transform: translateY(${to_translate}px);`
		}
		const setTranslateDuration = (duration) => {
			translate_animation.value = `transition: transform ${duration}ms ease;`
		}
		const makeOverflowYScroll = () => { 
			overflow_style.value = "overflow-y: scroll;"
		}
		const makeOverflowYHidden = () => { 
			overflow_style.value = "overflow-y: hidden;"
		}
		var addCartClick = () => emit('add-to-cart')
		var closeProductPage = () =>  { 
			if (!is_closed.value) {
				is_closed.value = true
				// remove hammer event from element
				Hammer(productElement).off('pan')
				makeOverflowYHidden()
				backgroud_translate_style.value = "opacity: 0; transition: opacity 200ms ease;"
				setTranslateDuration(200)
				translateCard(productElement.offsetHeight)
				productElement.ontransitionend = () => router.push("/");

				//is_closed.value = true
				//router.back()
			}
		}


		// onmounted hammer js for product

	
		onUnmounted(() => {
			document.querySelector("html").style.overflow = "scroll"
		});
		onBeforeMount(() => {
			// disable scroll for html
			document.querySelector("html").style.overflow = "hidden"
		});
		onMounted (() => {
			is_mounted.value = true
			var stage = document.getElementById(props.product.id)
			productElement = stage
			// add onScroll event listener to stage

			if (stage) {
				stage.onscroll = (e) => {
					currentScroll.value = stage.scrollTop
				}
				var mc = new Hammer(stage, {
					touchAction: "pan-y",
					inputClass: Hammer.TouchInput
				})
				
				
				mc.get('pan').set({
					direction: Hammer.DIRECTION_DOWN,
					threshold: 10,
					//velocity: 0.1
				})
				
				mc.on('panstart', function(e) {
					touchPanpx.value = e.center.y + currentScroll.value
					startPanpx.value = e.deltaY	
					startPanDelta.value = e.deltaTime
					setTranslateDuration(0)
					if (canPan.value) {
						makeOverflowYHidden()
					}
				})
				mc.on('panmove', function(e) {
					if (canPan.value) {
						if (e.deltaY > 0) {
							translateCard(e.deltaY)
						}
					}
				});
				mc.on('panend', function(e) {
//					stage.ontransitionend = () => {
						endPanDelta.value = e.deltaTime
						endPanpx.value = e.deltaY
						setTranslateDuration(300)
						translateCard(0)
						makeOverflowYScroll()
						if (needClose.value)  {
							closeProductPage()	
						}
						//translate_animation.value= `transition: transform 1000ms ease;`
						//translate_style.value = `transform: translateY(0px);`
//					}
				});
			
			} else {
				return null
			}
		});
		// eof onmounted hammer js for product



		return {
			is_mounted,
			// functions
			addCartClick,
			closeProductPage,
			translate_style,
			translate_animation,
			overflow_style,
			backgroud_translate_style,		
		}
	}
});
</script>
