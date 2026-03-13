import { Component, input } from '@angular/core';
import { GifListItem } from "./gif-list-item/gif-list-item";

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
})
export class GifList {

  //TODO: input string[]

  // gifs es una señal que requerimos como input y  luego le pasamos un arreglo de string
  gifs = input.required<string[]>();
}
