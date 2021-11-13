<template>

<el-slider
    v-model="pay_with_bonuses"
    :show-input="true"
>
</el-slider>

</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: "PayWithBonuses",
    setup () {
    const pay_with_bonuses = ref(0)
        return {
            pay_with_bonuses
        }
    }
})

</script>
