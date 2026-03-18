import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GitMapper } from '../mapper/gif.mapper';


@Injectable({providedIn: 'root'})
export class GifService {

  // Para hacer uso del http debemos realizar lo siguiente
  // HttpClient es un objeto que permite hacer peticiones get, put, delete, patch.
  private http = inject(HttpClient)

  // Creamos una señal el cual la relacionamos con la interface Gif
  // la señal es de Gif y contiene un arreglo vacio - en nuestro propio objeto
  // trendingGifs LUEGO LO LLAMAMOS EN "trending-page.html"
  trendingGifs = signal<Gif[]>([]);

  // Creamos la señal trendingGifsLoading
  trendingGifsLoading = signal(true);

  //Definimos nuestro constructor
  constructor(){
    this.loadTrendingGifs();
    console.log("Servicio Creado");
  }

  // Metodo en cual realiza la peticion http

  loadTrendingGifs(){

    // realizando peticion get al empoint https://api.giphy.com/v1/gifs/trending?
    // Por lo tanto debemos crear en nuestra variable de entorno "environment.ts" giphyUrl: 'https://api.giphy.com/v1
    // Enviamos las variables de entorno "giphyUrl"

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        //enviamos la api_key que esta en la variable de entorno "giphyApiKey"
        api_key: environment.giphyApiKey,
        limit: 20,

      }
      // La peticion no se dispara hasta no subscribe
    }).subscribe( (resp) => {
      //console.log( { resp } )
      const gifs = GitMapper.mapGiphyItemsToGifArrays(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({ gifs });
    } )

  }

}
