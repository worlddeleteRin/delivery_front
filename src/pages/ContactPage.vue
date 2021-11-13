<template>

<div class="px-4 mx-auto max-w-screen-lg 2xl:max-w-screen-xl md:px-2 pb-10">

	<div 
		class="mx-auto mt-3 mb-4 text-2xl font-semibold md:text-3xl max-w-screen-lg"
	>
		Контакты
	</div>

	<div class="px-6 py-4 bg-gray-100 rounded-lg">
        <a 
        :href="'tel:' + common_info.delivery_phone"
        class="mt-1 text-medium">
            {{ common_info.delivery_phone_display }}
        </a>
		<div>
			<div class="text-xl font-medium">
				Адрес:
			</div>		
			<div class="mt-1 text-medium">
				{{ common_info.location_address }}
			</div>
		</div>
		<div class="mt-3">
			<div class="text-xl font-medium">
				Режим работы:
			</div>		
			<div class="mt-1 text-medium">
				<div>Пн-Пт: 9:00 - 19:00</div>
				<div>Cб-Вс: 9:00 - 19:00</div>
			</div>
		</div>	
	</div>

	<!-- map -->
    <iframe 
        class="mt-3 rounded-lg"
        :src="common_info?.map_delivery_location_link"
        width="100%" 
        height="400" 
        frameborder="0">
    </iframe>
	<!-- eof map -->

</div>

</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	name: "ContactPage",
	setup () {
		const store = useStore()
		const common_info = computed(() => store.state.site.common_info);
		return {
			common_info,
		}
	}
});
</script>
