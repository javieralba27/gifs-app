import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from 'src/app/gifs/services/gifs.service';

// Creando Interface del menu de opciones

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  sublabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
})
export class SideMenuOptions {

  // Inyectando el servicio la class GifService se encuentra en "gifs.service.ts"
  // luego con dicho servicio traemos la informacion de la busqueda en el archivo "side-menu-options.html"
  gifService = inject(GifService)


  // property  menuOptions en el cual va se un arreglo de tipo MenuOption[] se vincula a la interface MenuOption
  // dentro contiene objectos {}

  menuOptions:MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      sublabel: 'Buscar gifs',
      route: '/dashboard/search'
    },
  ]
}
