<template>

<div
class="absolute top-0 left-0 z-40 w-full h-full rounded-md"
>
	<div
		class="absolute top-0 left-0 z-40 w-full h-full opacity-50 bg-gray-50 rounded-md"
	>
	</div>
	<div class="absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
		<Icon
			class="text-defaultText"
			icon="eos-icons:loading"
			width="39"
		/>
	</div>
</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';


export default defineComponent({
	name: "ModalLoadingFull",
	components: {
	},
	props: {
	},
});

</script>
