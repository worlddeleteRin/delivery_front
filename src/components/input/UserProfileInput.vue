<template>

<div class="mb-1 ml-1">
	{{ title }}
</div>

<div
:class="['flex items-center justify-between px-3 border border-gray-300 rounded-xl',
		is_disabled ? 'bg-defaultGray': '',]"	
>
	<input
	:disabled="is_disabled"
	@input="setInputValueLocal($event.target.value)"
	:value="getInputValue"
	:class="['flex w-full py-3 mx-1 outline-none',
			is_disabled ? 'bg-defaultGray':'',]"
	/>

	<!-- change and save helpers, if input is changable -->
	<div
		v-if="canChange"
	>
		<!-- change block -->
		<div 
		v-if="is_disabled"
		@click="enableInput"
		class="cursor-pointer select-none text-normal text-defaultText">
			Изменить
		</div>
		<!-- change block -->
		<!-- save block -->
		<div 
		v-if="!is_disabled"
		@click="saveValueClick"
		:class="['cursor-pointer select-none text-normal',
				isValid ? 'text-defaultText': 'text-gray-400']">
			Сохранить
		</div>
		<!-- eof save block -->
	</div>
	<!-- eof change and save helpers, if input is changable -->
</div>

<div 
v-if="is_on_change && !is_disabled"
@click="disableInput"
class="mx-1 mt-1 cursor-pointer select-none text-defaultText">
	Отменить
</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, computed } from 'vue';

export default defineComponent({
	name: "UserProfileInput",
	props: {
		canChange: {
			type: Boolean,
			default: false,
		},
		inputValue: {
			// passed input value
			type: String,
			required: true,
			default: "",
		},
		title: {
			type: String,
			default: null,
		},
	},
	emits: ['save-value'],
	setup(props, {emit}) {
		const input_value_local = ref(props.inputValue)

		const is_disabled = ref(true)
		const is_on_change = ref(false)
		if (input_value_local.value.length == 0) {
			is_disabled.value = false
		}
		// functions
		var setInputValueLocal = (value: string) => {
			input_value_local.value = value
		}
		var getInputValue = computed(() => {
			if (is_disabled.value) {
				return props.inputValue
			}
			return input_value_local.value
		})
		var isValid = computed(() => {
			if (input_value_local.value.length == 0) {
				return false
			} 
			return true
		});
		var enableInput = () => {
			if (props.canChange) {
				input_value_local.value = props.inputValue
				is_disabled.value = false
				is_on_change.value = true
			}
		}
		var disableInput = () => {
			input_value_local.value = props.inputValue	
			is_disabled.value = true 
			is_on_change.value = false 
		}
		var saveValueClick = () => {
			if (isValid.value) {
				emit('save-value', input_value_local.value)
				disableInput()
			} else {
				// can show error, that input is not valid
				return null
			}
		}

		return {
			is_disabled,
			input_value_local,
			is_on_change,
			// computed
			isValid,
			setInputValueLocal,
			getInputValue,
			// functions
			enableInput,
			disableInput,
			saveValueClick,
		}
	},
});

</script>
