import { defineAsyncComponent } from "vue";

import { createRouter, createWebHistory } from "vue-router";

//importing store for nav guards
import store from "./store/index.js";

//coaches components
import CoachesList from "./pages/coaches/CoachesList.vue";

//Page not found component
import NotFound from "./pages/NotFound.vue";

//async(lazy) routes will only load when needed.
const CoachProfile = defineAsyncComponent(() =>
	import("./pages/coaches/CoachProfile.vue")
);

const RegisterCoach = defineAsyncComponent(() =>
	import("./pages/coaches/RegisterCoach.vue")
);

const ContactCoach = defineAsyncComponent(() =>
	import("./pages/requests/ContactCoach.vue")
);

const CoachRequests = defineAsyncComponent(() =>
	import("./pages/requests/CoachRequests.vue")
);

const UserAuth = defineAsyncComponent(() =>
	import("./pages/auth/UserAuth.vue")
);

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
