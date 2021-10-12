<template>

<div class="">
	<!-- categories -->
	<div
		class="flex items-center border-2 border-black overflow-x-scroll pb-3"
		id="mobile-category-nav"
	>
		<router-link
			:to="'#' + category.slug"
			v-for="category in categories"
			:key="category"
			class="flex-shrink-0"
			:id="'mb-cat-nav' + category.slug"
		>
			<div 
			v-if="category.slug == activeCategorySlug"
			class="bg-defaultDim mx-1 px-4 py-1 rounded-xl text-defaultTextBg"
			>
				{{ category.name }} 
			</div>
			<div 
			v-else
			class="bg-gray-100 mx-1 px-4 py-1 rounded-xl text-gray-700"
			>
				{{ category.name }} 
			</div>

		</router-link>
	</div>
	<!-- eof categories -->

</div>

</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	name: "CatalogueCategories",
	components: {
	},
	props: {
		categories: {
			type: Array,
			default: null,
		},
		activeCategorySlug: {
			type: String,
			default: null,
		}
	},
	setup () {
		const store = useStore()

		const goToCategory = (category: Record<string,any>) => {
			// set new category_slug state
			store.commit('setActiveCategory', category.slug)
		}
		return {
			// functions
			goToCategory	
		}
	}
});
</script>
