import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GitMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

// Constante para trabajar con el localStorage
const GIF_KEY = 'gifs';

// FUNCION PARA EL LOCALSTORAGE
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);

  console.log(gifs);
  return gifs;
}


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

  // Creamos la señal searchHistory para guardar el historial de busque lo inicializamos como un objecto vacio
  //searchHistory = signal<Record<string, Gif[]>>({})
  searchHistory = signal<Record<string, Gif[]>>( loadFromLocalStorage() )


  //Busqueda ya realizada el cual obtine las llaves de busquedas searchHistory
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()) )

  //Definimos nuestro constructor
  constructor(){
    this.loadTrendingGifs();
    console.log("Servicio Creado");
  }

  //METODO QUE IMPLEMENTA EL LOCAL STORE
  // El efecto se dispara cada vez que searchHistory cambie
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());

    //Lo almacenamos en el local storage
    localStorage.setItem(GIF_KEY, historyString);
  })

  // Metodo en cual realiza la peticion http

  loadTrendingGifs(){

    // GiphyResponse esta plasmada en la interface archivo "giphy.interface.ts"

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



  // APARTADO DE SEARCH - BUSCADOR

  searchGifs(query: string): Observable<Gif[]> {
    // GiphyResponse esta plasmada en la interface archivo "giphy.interface.ts"

    // realizando peticion get al empoint https://api.giphy.com/v1/gifs/search
    // Por lo tanto debemos crear en nuestra variable de entorno "environment.ts" giphyUrl: 'https://api.giphy.com/v1
    // Enviamos las variables de entorno "giphyUrl"

    // al generar el return al inicio de la peticon http podemos utilizar al subscribe en el archivo "searh-page.ts"

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        //enviamos la api_key que esta en la variable de entorno "giphyApiKey"
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,

      },
      // La peticion no se dispara hasta no exista el subscribe
    })
    .pipe(
      //map nos permite transformar nuestra data
      map( ({data}) => data ),
      map((items) => GitMapper.mapGiphyItemsToGifArrays(items) ),

      //  Historial
      //tag es para generar efectos secundarios
      tap( items => {
        //Necesitamos la actualizacion de una señal
        this.searchHistory.update( (history) => ({
          ...history,
          [query.toLowerCase()]: items,
        }))
      })
    );
    /*.subscribe( (resp) => {
      //console.log( { resp } )
      const gifs = GitMapper.mapGiphyItemsToGifArrays(resp.data);

      console.log({ search: gifs });
    } ) */

  }

  //Metodo
  getHistoryGifs( query: string ): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
