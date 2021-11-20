import { createRouter, createWebHistory, RouteRecordRaw, RouterScrollBehavior } from "vue-router";
import MainPage from "@/pages/MainPage.vue";

const productPage = () => import(/* webpackChunkName: "product-page" */ '@/components/product/ProductPage.vue')
const userProfilePage = () => import(/* webpackChunkName: "user-profile" */ '@/pages/UserProfilePage.vue')
const userProfilePagePersonalData = () => import(/* webpackChunkName: "group-user-profile" */ '@/components/user/UserProfilePagePersonalData.vue')
const userProfilePageOrders = () => import(/* webpackChunkName: "group-user-profile" */ '@/components/user/UserProfilePageOrders.vue')
const cartPage = () => import(/* webpackChunkName: "cart-page" */ '@/pages/CartPage.vue')
const checkoutPage = () => import(/* webpackChunkName: "checkout-page" */ '@/pages/CheckoutPage.vue')
const stockPage = () => import(/* webpackChunkName: "stock-page" */ '@/pages/StockPage.vue')
const contactPage = () => import(/* webpackChunkName: "contact-page" */ '@/pages/ContactPage.vue')



const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
	children: [
		{
			path: "/product/:id",
			name: "ProductPage",
			component: productPage,
		},
	] as Array<RouteRecordRaw>
  },
  {
	path: "/profile",
	name: "UserProfilePage",
	component: userProfilePage,
	children: [
		{
			path: "",
			name: "UserProfilePagePersonalData",
			component: userProfilePagePersonalData,
		},
		{
			path: "orders",
			name: "UserProfilePageOrders",
			component: userProfilePageOrders,
		},
	]
  },
  {
	path: "/cart",
	name: "CartPage",
	component: cartPage,
  },
  {
	path: "/checkout",
	name: "CheckoutPage",
	component: checkoutPage,
  },
  {
	path: "/contacts",
	name: "ContactPage",
	component: contactPage,
  },
  {
	path: "/stocks",
	name: "StockPage",
	component: stockPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
	if (to.hash) {
		return {
            el: to.hash,
            behavior: 'smooth',
        }
	}
  }
});

export default router;
