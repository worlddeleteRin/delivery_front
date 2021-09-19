<template>
  <span 
  :class="['cursor-pointer select-none transition-shadow duration-300 ease-in-out', 'text-center',  'relative overflow-hidden', button_size_class, rounded_class, shadow_class, 'hover:' + shadow_hover_class]"
  :style="['background-color:'+background_color, 'color:'+textColor]"
	@click="buttonClick"
	>

	<!-- if button is loading -->
	<div
		v-if="isLoading"
		:class="['absolute top-0 left-0 w-full h-full bg-black opacity-30', rounded_class]"
	>
		<span
		class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
		>	
			<Icon
			icon="eos-icons:loading"
			width="30"
			class="text-white animate-pulse"
			/>
		</span>
	</div>
	<!-- eof if button is loading -->

	<span
	>	
	{{ title }}
	</span>
 </span>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ComponentPropsOptions, computed } from "vue";
import { Icon } from '@iconify/vue';

export default defineComponent({
	name: "Button",
	components: {
		Icon,
	},
	props: {
		title: {
			type: String,
			default: "Кнопка",
		},
		size: {
			type: String,
			default: "medium",
		},
		backgroundColor: {
			type: String,
			default: null,
		},
		textColor: {
			type: String,
			default: null,
		},
		rounded: {
			type: String,
			default: "medium",
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
		},
		shadow: {
			type: String,
			default: null,
		},
	},
	emits: ['button-click'],
	setup (props, { emit } ) {
		
		const shadow_variants: Record<string,string> = {
			none: "shadow-none",
			small: "shadow-sm",
			medium: "shadow-md",
			large: "shadow-lg",
		}
		const shadow_variants_hover: Record<string,string> = {
			none: "shadow-none",
			small: "shadow-lg",
			medium: "shadow-lg",
			large: "shadow-xl",
		}
		const rounded_variants: Record<string,string>  = {
			none: "rounded-none",
			small: "rounded-sm",
			medium: "rounded-md",
			large: "rounded-lg",
			full: "rounded-full",
		}
		const type_colors: Record<string,string> = {
			primary: "blue",
			success: "green",
			info: "gray",
			danger: "red",
			warning: "orange",
		}
		const button_size: Record<string,string> = {
			small: "px-2 py-1",
			medium: "px-4 py-1",
			large: "px-5 py-2",
		}
		// computed
		const background_color = computed( () => {
			const type = props.type
			if (type) {
				return type_colors[type]
			}
			return props.backgroundColor	
		})
		const button_size_class = computed( () => {
			const size = props.size
			if (size) {
				return button_size[size] 
			}
			return null
		})
		const rounded_class = computed( () => {
			const rounded = props.rounded
			if (rounded) {
				return rounded_variants[rounded]
			}
			return null
		})
		const shadow_class = computed( () => {
			const shadow = props.shadow
			if (shadow) {
				return shadow_variants[shadow]
			}
			return null	
		})
		const shadow_hover_class = computed ( () => {
			const shadow = props.shadow
			if (shadow) {
				return shadow_variants_hover[shadow]
			}
			return ""
		})

		// functions
		function buttonClick () {
			if (props.isLoading) { return false }
			else { emit('button-click') }
		}

		return {
			// computed
			background_color,
			button_size_class,
			rounded_class,
			shadow_class,
			shadow_hover_class,
			// functions
			buttonClick,
		}
	}
});
</script>

