<template>
<div class="">
    <div class="text-lg font-bold mt-2">
        Оплата бонусами 
    </div>

    <div v-if="!bonusesUsed">
        <div>
            У Вас на счету
            <span 
            class="bg-greenDim text-greenText px-1 rounded-lg mx-1 text-lg">
                {{ userBonuses }} 
            </span>
            бонусов
        </div>
        <el-slider
            v-model="pay_with_bonuses_local"
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

    <div v-if="bonusesUsed"
        class=""
    >
        <div>
            Вы использовали
            <span
            class="bg-greenDim text-greenText px-2 rounded-lg mx-1 text-lg font-semibold"
            >
                {{ payWithBonuses }}
            </span>
            бонусов для оплаты заказа!
        </div>
        <div
            class="mt-1"
        >
            <el-button
                @click="removePayBonusesClick"
                :loading="isLoading"
                type="danger"
                size="medium"
            >
                Отменить
            </el-button>
        </div>
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
        },
        bonusesUsed: {
            type: Boolean,
            default: false,
        },
        payWithBonuses: {
            type: Number,
            default: null,
        }
    },
    emits: ['pay-bonuses', 'remove-pay-bonuses'],
    setup (props, {emit}) {
    const pay_with_bonuses_local = ref(0)
    // functions
    const payBonusesClick = () => emit('pay-bonuses', pay_with_bonuses_local.value)
    const removePayBonusesClick = () => emit('remove-pay-bonuses')

        return {
            pay_with_bonuses_local,
            // functions
            payBonusesClick,
            removePayBonusesClick,
        }
    }
})

</script>
