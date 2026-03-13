import { Component } from '@angular/core';
import { NgClass } from "../../../../../../node_modules/@angular/common/types/_common_module-chunk";
import { RouterLink, RouterLinkActive } from "@angular/router";

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
