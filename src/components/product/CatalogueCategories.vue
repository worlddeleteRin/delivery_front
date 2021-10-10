<template>

<div class="z-0">
	<!-- categories -->
	<div
		class="flex items-center border-2 border-black overflow-x-scroll pb-3"
		id="mobile-category-nav"
	>
		<div
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

		</div>
	</div>
	<!-- eof categories -->

</div>

</template>


<script lang="ts">
import { defineComponent } from 'vue';

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
		return {
	
		}
	}
});
</script>
