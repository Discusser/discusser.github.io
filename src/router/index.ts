import {
  createRouter,
  createWebHashHistory,
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
  component?: RouteComponent | (() => Promise<RouteComponent>);
  name?: string;
  children?: RouteRecordRaw[];
}): RouteRecordRaw {
  const split = path.split("/");
  let filename = "";

  if (name === undefined) {
    name = split[split.length - 1];
  }

  if (split.length > 1) {
    filename += split.slice(0, split.length - 1).join("/");
  }
  filename += "/" + createFilenameFromRouteName(name);

  if (component === undefined) {
    // Note: Vite doesn't like dynamic imports because it can't inject the rollup bundle or whatever, but I don't really care, this is much simpler.
    /* @vite-ignore */
    component = () => import("../views/" + filename);
  }

  return {
    path,
    name,
    component,
    children,
  };
}

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    createSingleViewRoute({ path: import.meta.env.BASE_URL, component: HomeView, name: "home" }),
    createSingleViewRoute({ path: import.meta.env.BASE_URL + "programming" }),
    createSingleViewRoute({ path: import.meta.env.BASE_URL + "programming/cpp" }),
    createSingleViewRoute({ path: import.meta.env.BASE_URL + "programming/mobile" }),
    createSingleViewRoute({ path: import.meta.env.BASE_URL + "programming/python" }),
    createSingleViewRoute({ path: import.meta.env.BASE_URL + "programming/web" }),
    createSingleViewRoute({ path: import.meta.env.BASE_URL + "hobbies" }),
    createSingleViewRoute({ path: import.meta.env.BASE_URL + "hobbies/blender" }),
    createSingleViewRoute({ path: import.meta.env.BASE_URL + "hobbies/workout" }),
    createSingleViewRoute({ path: import.meta.env.BASE_URL + "contact" }),
    // // will match everything and put it under `$route.params.pathMatch`
    // { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
