<template>
<div class="flex items-center py-3 min-h-[60px] cursor-pointer">
	<!-- selected icon -->
	<div 
	v-if="showIconSelected && !dataNew"
	class="mr-3"
	>
		<Icon
			icon="akar-icons:circle-check"
			width="32"
			class="text-green-500"
		/>
	</div>
	<!-- eof selected icon -->
	<!-- select icon -->
	<div 
	v-if="icon"
	class="mr-3"
	>
		<Icon
			:icon="icon"
			width="25"
		/>
	</div>
	<!-- eof select icon -->
	<!-- select main info -->
	<div>
		<!-- select title -->
		<div 
		class=""
		>
			<span v-if="!dataNew"
			class="select-none">
			{{ title }}		
			</span>
			<span v-else
			class="font-medium select-none text-defaultTextBg">
			{{ titleNew }}		
			</span>
		</div>
		<!-- eof select title -->
		<!-- select subtitle -->
		<div
		v-if="subtitle && !dataNew"
		class="text-sm select-none"
		>
			{{ subtitle }}
		</div>
		<!-- eof select subtitle -->
	</div>
	<!-- eof select main info -->
	<!-- select go arrow -->
	<div class="flex justify-end flex-1 pr-4">
		<Icon
			:icon="goIcon.icon"
			:width="goIcon.width"
			:class="goIcon.class"
		/>
	</div>
	<!-- eof select go arrow -->
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
export default defineComponent({
	name: "SelectCheckoutMain",
	components: {
	},
	props: {
		dataNew: {
			type: Boolean,
			default: true,
		},
		titleNew: {
			type: String,
			default: null,
		},
		title: {
			type: String,
			default: null,
		},
		subtitle: {
			type: String,
			default: null,
		},
		icon: {
			type: String,
			default: null,
		},
		showIconSelected: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['select-value'],
	setup(props, {emit}) {
		const goIcon = computed(() => {
			const go_icon = {
				icon: "",
				width: 0,
				class: "",
			}
			if(!props.dataNew) {
				go_icon.icon="akar-icons:chevron-right"
				go_icon.class = "text-gray-600"
				go_icon.width = 17
			} else {
				go_icon.icon = "akar-icons:plus"
				go_icon.class = "text-defaultTextBg"
				go_icon.width = 24
			}
			return go_icon
		});
		return {
			// computed
			goIcon,
		}
	}
});
</script>
