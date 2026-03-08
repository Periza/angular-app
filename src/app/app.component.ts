import { Component, inject, signal, computed, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, CopyrightDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {provide: APP_SETTINGS, useValue: appSettings}
  ]
})
export class AppComponent {
  title: Signal<string> = signal('');
  title$ = new Observable(observer => {
    setInterval(() => {
      observer.next(undefined);
    }, 2000);
  });

  currentDate = signal(new Date());


  settings = inject(APP_SETTINGS);


  constructor() {
    this.title$.subscribe(this.setTitle);
    this.title = computed(() => {
    return `${this.settings.title} (${this.currentDate()})`;
  });
  }

  private setTitle = () => {
    this.currentDate.set(new Date());
  }

  private changeTitle(callback: Function) {
    setTimeout(() => {
      callback();
    }, 2000);
  }

  private onComplete() {
    return new Promise<void>(resolve => {
      setInterval(() => { resolve()}, 2000);
    });
  }
}
