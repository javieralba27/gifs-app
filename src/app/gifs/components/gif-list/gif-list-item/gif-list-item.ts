import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.html',
})
export class GifListItem {

  // imgeUrl = input.required<string>() es una signal obligatoria
  imgeUrl = input.required<string>()
}
