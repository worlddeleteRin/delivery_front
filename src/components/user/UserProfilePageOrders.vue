<template>


<div v-if="user_orders && user_orders.length > 0"
class="mt-5">

	<div
	v-for="order in user_orders"
	:key="order.id"
	>
		<UserProfileOrderCard
			:order="order"
			:userOrderStatusColors="user_order_status_colors"
		class="mx-2 my-2"
		/>
	</div>

</div>


<div v-else>
	У Вас нет ни одного заказа
</div>

</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import UserProfileOrderCard from '@/components/user/UserProfileOrderCard.vue';

export default defineComponent({
	name: "UserProfilePageOrders",
	components: {
		UserProfileOrderCard,
	},
	setup(props, {emit}) {
		const store = useStore()
		// computed
		var user_orders = computed(() => store.state.user.user_orders)
		var user_order_status_colors = computed(() => store.state.user.user_order_status_colors)
		// functions
		onBeforeMount(async () => {
			if (!user_orders.value) {
				await store.dispatch('getUserOrdersAPI')
			}
		});
		return {
			// computed
			user_orders,
			user_order_status_colors,
		}
	}
});
</script>
