<template>
<div>
    <div>
        У Вас на счету
        <span class="bg-greenDim text-greenText px-1 rounded-lg mx-1">
            400 
        </span>
        бонусов
    </div>
    <el-slider
        v-model="pay_with_bonuses"
        :show-input="true"
        :max="userBonuses"
        class="max-w-[400px]"
    >
    </el-slider>
    <div>
        <Button
            @click="payBonusesClick"
            :is-loading="isLoading"
            class="bg-greenDim text-greenText"
            title="Использовать"
        />
    </div>
</div>

</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: "PayWithBonuses",
    props: {
        userBonuses: {
            type: Number,
            default: null,
        },
        isLoading: {
            type: Boolean,
            deafault: false,
        }
    },
    emits: ['pay-bonuses'],
    setup (props, {emit}) {
    const pay_with_bonuses = ref(0)
    // functions
    const payBonusesClick = () => emit('pay-bonuses', pay_with_bonuses.value)
        return {
            pay_with_bonuses,
            // functions
            payBonusesClick,
        }
    }
})

</script>
