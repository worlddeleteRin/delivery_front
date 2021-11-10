<template>

<div class="mx-4 mt-4">

<div>
    <div class="text-xl font-semibold">
        Привет, {{ userInfo.name }} !
    </div>
    <div class="mt-1">
        {{ userInfo.username }} 
    </div>
</div>


<div class="mt-2 flex gap-2 flex-wrap">

     <!-- user bonuses -->
    <div class="bg-defaultDim max-w-max text-defaultText py-3 px-5 rounded-md">
        <span class="text-xl">
            &#x1F389;	
        </span>
        <span class="tracking-wide">
            Бонусов: 
        </span>
        <span class="text-lg font-semibold">
            {{ userInfo.bonuses }}
        </span>
	</div>
    <!-- eof user bonuses -->

     <!-- user bonuses rank -->
    <div class="bg-greenDim max-w-max text-greenText py-3 px-5 rounded-md">
        <span class="text-xl">
            &#x1F389;	
        </span>
        <span class="tracking-wide">
            Уровень: 
        </span>
        <span class="text-lg font-semibold">
            {{ userInfo.bonuses_rank }}
        </span>
	</div>
    <!-- eof user bonuses rank -->

</div>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: "UserProfileMain",
	props: {
		userInfo: {
			type: Object,
			required: true,
			default: null,
		},
	},
	setup(props, {emit}) {
		return {
		}
	}
});
</script>
