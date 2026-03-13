import { Component } from '@angular/core';
import { environment } from '@environments/environment';
//import { environment } from '../../../../../environments/environment';


@Component({
  // El nombre del selectro en como podemos llamarlo en el .html padre de este manera "selector: 'gifs-side-menu-header'"
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.html',
})
export class SideMenuHeader {

  // Creamos una  Property
  // tomamos el enviroment de produccion
  envs = environment
}
