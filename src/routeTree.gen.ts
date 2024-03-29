/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const TeamsIndexLazyImport = createFileRoute('/teams/')()
const EmployeesIndexLazyImport = createFileRoute('/employees/')()
const TeamsCreateIndexLazyImport = createFileRoute('/teams/create/')()
const EmployeesCreateIndexLazyImport = createFileRoute('/employees/create/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TeamsIndexLazyRoute = TeamsIndexLazyImport.update({
  path: '/teams/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/teams/index.lazy').then((d) => d.Route))

const EmployeesIndexLazyRoute = EmployeesIndexLazyImport.update({
  path: '/employees/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/employees/index.lazy').then((d) => d.Route),
)

const TeamsCreateIndexLazyRoute = TeamsCreateIndexLazyImport.update({
  path: '/teams/create/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/teams/create/index.lazy').then((d) => d.Route),
)

const EmployeesCreateIndexLazyRoute = EmployeesCreateIndexLazyImport.update({
  path: '/employees/create/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/employees/create/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/employees/': {
      preLoaderRoute: typeof EmployeesIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/teams/': {
      preLoaderRoute: typeof TeamsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/employees/create/': {
      preLoaderRoute: typeof EmployeesCreateIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/teams/create/': {
      preLoaderRoute: typeof TeamsCreateIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  EmployeesIndexLazyRoute,
  TeamsIndexLazyRoute,
  EmployeesCreateIndexLazyRoute,
  TeamsCreateIndexLazyRoute,
])

/* prettier-ignore-end */
