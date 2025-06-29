const publicRoutes = {
  LogIn: "/prihlaseni",
  SignUp: "/registrace",
} as const;

export const privateRoutes = {
  Root: "/",
} as const;

const routes = {
  ...publicRoutes,
  ...privateRoutes,
} as const;

export default routes;

export type TRouteProperty = keyof typeof routes;
export type TRouteValue = (typeof routes)[TRouteProperty];
export type TPrivateRouteProperty = keyof typeof privateRoutes;
export type TPrivateRouteValue = (typeof privateRoutes)[TPrivateRouteProperty];
