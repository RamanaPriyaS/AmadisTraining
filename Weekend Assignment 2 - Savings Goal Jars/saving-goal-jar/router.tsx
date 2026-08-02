import { Outlet, RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { Home } from './components/Home';
import { JarPage } from './components/JarPage';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const jarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/jar/$jarId',
  component: JarPage,
});

const routeTree = rootRoute.addChildren([indexRoute, jarRoute]);
export const router = createRouter({ routeTree });

export function AppRouter() {
  return <RouterProvider router={router} />;
}