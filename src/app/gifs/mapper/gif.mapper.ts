import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interface";

export class GitMapper {
  // creamos una variable static

  //static mapGiphyItemoGif solo me permite trae de un dato item sencillo
  static mapGiphyItemoGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  // la funcio se crea con el fin de poder llamar el array que contenga las variables id, title, url
  // creamos otra funcion y dentro de esta funcion llamomos la anterior funcion "static mapGiphyItemoGif"

  //mapGiphyItemsToGifArrays – Permite traer todo el array(id,  title, url)
  static mapGiphyItemsToGifArrays(items: GiphyItem[]): Gif[] {
    return items.map(this.mapGiphyItemoGif)
  }
}
