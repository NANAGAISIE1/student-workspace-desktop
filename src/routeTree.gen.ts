/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const OnboardingLazyImport = createFileRoute('/onboarding')()
const authRegisterLazyImport = createFileRoute('/(auth)/register')()
const authLoginLazyImport = createFileRoute('/(auth)/login')()

// Create/Update Routes

const OnboardingLazyRoute = OnboardingLazyImport.update({
  path: '/onboarding',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/onboarding.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const authRegisterLazyRoute = authRegisterLazyImport
  .update({
    path: '/register',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(auth)/register.lazy').then((d) => d.Route))

const authLoginLazyRoute = authLoginLazyImport
  .update({
    path: '/login',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(auth)/login.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/onboarding': {
      id: '/onboarding'
      path: '/onboarding'
      fullPath: '/onboarding'
      preLoaderRoute: typeof OnboardingLazyImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof authRegisterLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/onboarding': typeof OnboardingLazyRoute
  '/login': typeof authLoginLazyRoute
  '/register': typeof authRegisterLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/onboarding': typeof OnboardingLazyRoute
  '/login': typeof authLoginLazyRoute
  '/register': typeof authRegisterLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/onboarding': typeof OnboardingLazyRoute
  '/login': typeof authLoginLazyRoute
  '/register': typeof authRegisterLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/onboarding' | '/login' | '/register'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/onboarding' | '/login' | '/register'
  id: '__root__' | '/' | '/onboarding' | '/login' | '/register'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  OnboardingLazyRoute: typeof OnboardingLazyRoute
  authLoginLazyRoute: typeof authLoginLazyRoute
  authRegisterLazyRoute: typeof authRegisterLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  OnboardingLazyRoute: OnboardingLazyRoute,
  authLoginLazyRoute: authLoginLazyRoute,
  authRegisterLazyRoute: authRegisterLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/onboarding",
        "/login",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/onboarding": {
      "filePath": "onboarding.lazy.tsx"
    },
    "/login": {
      "filePath": "(auth)/login.lazy.tsx"
    },
    "/register": {
      "filePath": "(auth)/register.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
