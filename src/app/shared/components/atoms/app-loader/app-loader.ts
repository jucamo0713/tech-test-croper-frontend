import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.html',
})
export class AppLoader {
  readonly label = input('Loading');
}

