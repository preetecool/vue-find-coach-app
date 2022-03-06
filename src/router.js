import { createRouter, createWebHistory } from "vue-router";
//importing store for nav guards
import store from "./store/index.js";

//coaches components
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachProfile from "./pages/coaches/CoachProfile.vue";
import RegisterCoach from "./pages/coaches/RegisterCoach.vue";

//requets components
import ContactCoach from "./pages/requests/ContactCoach.vue";
import CoachRequests from "./pages/requests/CoachRequests.vue";

//authentication components
import UserAuth from "./pages/auth/UserAuth.vue";

//Page not found component
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", redirect: "/coaches" },
		{ path: "/coaches", component: CoachesList },
		{
			path: "/coaches/:id",
			component: CoachProfile,
			props: true,
			children: [{ path: "contact", component: ContactCoach }],
		},
		{
			path: "/register",
			component: RegisterCoach,
			meta: { requiresLogin: true },
		},
		{
			path: "/requests",
			component: CoachRequests,
			meta: { requiresLogin: true },
		},
		{ path: "/auth", component: UserAuth, meta: { requiresNoLogin: true } },
		{ path: "/:notFound(.*)", component: NotFound },
	],
});
//Global navigation guard
router.beforeEach((to, _, next) => {
	if (to.meta.requiresLogin && !store.getters.isAuthenticated) {
		next("/auth");
	} else if (to.meta.requiresNoLogin && store.getters.isAuthenticated) {
		next("/coaches");
	} else {
		next();
	}
});

export default router;
