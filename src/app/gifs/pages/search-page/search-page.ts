import { Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {

  // Inyectando el servicio la class GifService se encuentra en "gifs.service.ts"
  gifService = inject( GifService )

  // Creamos una señal y lo inicializamos como un arreglo vacio
  // Gif es la interface creada en git.interface.ts
  gifs = signal<Gif[]>([]);

  //Metodo que envie informacion y almacena en el query el cual se ejecuta en el "search-page.html" al presionar enter
  onSearch(query: string) {
    //console.log({ query })
    this.gifService.searchGifs(query).subscribe((resp) => {
      //console.log(resp);
      this.gifs.set(resp);
    })

  }
}


