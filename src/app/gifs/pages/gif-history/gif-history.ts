import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { toSignal } from '@angular/core/rxjs-interop';
import { GifService } from '../../services/gifs.service';
import { GifList } from "../../components/gif-list/gif-list";

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html',
})

// default se debe agregar al momento de exportar la clase
export default class GifHistory {

  //Inyectamos el servicio de GitService es una interface de la api que esta en "giphy.interface.ts"
  gifService = inject(GifService)


  //el dato query que se refleja en cosola es el parametro que dejamos en la ruta de history
  // El dato params es el valor que le estamos enviando
  //luego imprimir el dato query en el archivo "gif.hystiry.html"
  query = toSignal(

    inject(ActivatedRoute).params.pipe(
      map( params => params['query'] )
    )

  );

  gifsByKey = computed(() => {
    // getHistoryGifs solo podemos enviar una unica instruccion
    return this.gifService.getHistoryGifs(this.query())
  });

}
