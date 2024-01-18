import {
  createRouter,
  createWebHashHistory,
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
  history: createWebHashHistory(),
  routes: [
    createSingleViewRoute({ path: "/", component: HomeView, name: "home" }),
    createSingleViewRoute({ path: "/programming" }),
    createSingleViewRoute({ path: "/programming/cpp" }),
    createSingleViewRoute({ path: "/programming/mobile" }),
    createSingleViewRoute({ path: "/programming/python" }),
    createSingleViewRoute({ path: "/programming/web" }),
    createSingleViewRoute({ path: "/hobbies" }),
    createSingleViewRoute({ path: "/hobbies/blender" }),
    createSingleViewRoute({ path: "/hobbies/workout" }),
    createSingleViewRoute({ path: "/contact" }),
    // // will match everything and put it under `$route.params.pathMatch`
    // { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
