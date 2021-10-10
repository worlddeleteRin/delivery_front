<template>	
<!-- add favorite block -->
<div class="absolute cursor-pointer right-2 top-2"
	v-if="!is_in_favorite"
	@click="toggleFavorite"
>
	<Icon icon="ic:round-favorite-border"
	color="gray"
	width="23"
	/>
</div>
<div class="absolute cursor-pointer right-2 top-2"
	v-if="is_in_favorite"
	@click="toggleFavorite"
>
	<Icon icon="ic:round-favorite"
	color="red"
	width="23"
	/>
</div>
<!-- eof add favorite block -->
</template>

<script>
	
import { ref } from 'vue';

export default {
	name: "CartProductItemAddFavorite",
	components: {
	},
	setup () {
		var is_in_favorite = ref(false)
		// functions 
		function toggleFavorite () {
			is_in_favorite.value = !is_in_favorite.value
		}
		return {
			is_in_favorite,
			// functions
			toggleFavorite,
		}
	}
}
</script>
