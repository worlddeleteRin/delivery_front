<template>
<div class="flex mx-4">
	<div
	v-for="profile_link in profileLinks"
	:key="profile_link"
	class=""
	>
		<router-link 
			:to="profile_link.link_path"
			:class="[isRouteActive(profile_link.link_path) ? 'bg-defaultDim text-defaultTextBg font-medium': '', 'px-6 py-2 rounded-full select-none']"	
		>
			<span class="">
				{{ profile_link.link_name }}
			</span>
		</router-link>
	</div>
	<!-- user profile link here -->
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: "UserProfileLinks",
	props: {
		profileLinks: {
			type: Array,
			required: true,
			default: null,
		},
		currentPath: {
			type: String,
			default: "",
		},
	},	
	setup(props, {emit}) {
		const isRouteActive = (profile_link: string) => {
			return profile_link == props.currentPath 
		}
		
		return {
			isRouteActive,
		}
	}
});
</script>
