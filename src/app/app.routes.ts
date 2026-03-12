import { Routes } from '@angular/router';

// No dirigimos a la clase y le agregamos el defaul "export default class DashboardPage { }"

// Debemos crear un arreglo ejemplo children: [] para poser colocar las rutas hijas dentro de la ruta path: 'dashboard',

export const routes: Routes = [

  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page'),

    children: [

      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page'),
      },

      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page'),
      },

      {
        path: '**',
        redirectTo: 'trending'
      }

    ],
  },

  //path: '**', es cuando escribimos una ruta que no existe no direccione al dashboard.

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
