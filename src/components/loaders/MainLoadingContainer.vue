<template>

<div
class="flex items-center w-11/12 max-w-[500px] h-20 h-full mx-auto rounded-lg bg-defaultDim justify-center"
>
	<div class="">
		<Icon
			class="text-defaultText"
			icon="eos-icons:loading"
			width="39"
		/>
	</div>
	<div class="pl-4 text-defaultTextBg">
		{{ title }}
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
		title: {
			type: String,
			default: "Загрузка...",
		}
	},
});

</script>
