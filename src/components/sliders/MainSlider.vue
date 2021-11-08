<template>
  <splide
	class="px-5 mx-auto mt-4 md:mt-2 max-w-screen-lg 2xl:max-w-screen-xl rounded-md"
	:options="options"
    v-if="sliders.length > 0"
  >

    <splide-slide
        @click="goSliderLink(slider)"
        class="flex justify-center text-center rounded-md cursor-pointer"
        v-for="slider in sliders"
        :key="slider?.id"
	>
		<img 
            class="object-cover w-full max-h-80 min-h-[110px] rounded-md"
            :src="slider.imgsrc"/>
	</splide-slide>

  </splide>

</template>
<script>

import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
	
export default defineComponent({
	name: "MainSlider",
	components: {
		Splide,
		SplideSlide,
	},
    props: {
        sliders: {
            type: Array,
            default: null,
        },
    },
    setup () {
        const router = useRouter()
        // functions
        const goSliderLink = (slider_item) => {
            if (slider_item.link_path && slider_item.link_path.trim().length > 0) {
                window.location.href = slider_item.link_path
            }
        }

        return {
			options: {
				type: 'loop',
				// rewind: true,
				perPage: 1,
				arrows: false,
			},
            // functions
            goSliderLink,
        }
    }
})
</script>

