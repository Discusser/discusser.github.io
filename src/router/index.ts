import {
  createRouter,
  createWebHistory,
  type RouteComponent,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

function createFilenameFromRouteName(name: string) {
  return (
    name.charAt(0).toUpperCase() + name.substring(1).toLowerCase() + "View.vue"
  );
}

function createSingleViewRoute({
  path,
  component,
  name,
  children,
}: {
  path: string;
  component: RouteComponent | (() => Promise<RouteComponent>);
  name?: string;
  children?: RouteRecordRaw[];
}): RouteRecordRaw {
  const split = path.split("/");

  if (name === undefined) {
    name = split[split.length - 1];
  }

  return {
    path,
    name,
    component,
    children,
  };
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    createSingleViewRoute({ path: "/", component: HomeView, name: "home" }),
    createSingleViewRoute({ path: "/programming", component: () => import("@/views/ProgrammingView.vue") }),
    createSingleViewRoute({ path: "/programming/cpp", component: () => import("@/views/programming/CppView.vue") }),
    createSingleViewRoute({ path: "/programming/mobile", component: () => import("@/views/programming/MobileView.vue") }),
    createSingleViewRoute({ path: "/programming/python", component: () => import("@/views/programming/PythonView.vue") }),
    createSingleViewRoute({ path: "/programming/web", component: () => import("@/views/programming/WebView.vue") }),
    createSingleViewRoute({ path: "/hobbies", component: () => import("@/views/HobbiesView.vue") }),
    createSingleViewRoute({ path: "/hobbies/blender", component: () => import("@/views/hobbies/BlenderView.vue") }),
    createSingleViewRoute({ path: "/hobbies/workout", component: () => import("@/views/hobbies/WorkoutView.vue") }),
    createSingleViewRoute({ path: "/contact", component: () => import("@/views/ContactView.vue") }),
  ],
});

export default router;
