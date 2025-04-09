import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CounterActions from '../../../store/counter/counter.actions';
import { selectCounterValue } from '../../../store/counter/counter.selectors';
@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  counter$: Observable<number>;

  constructor(private store: Store) {
    this.counter$ = this.store.select(selectCounterValue);
  }

  increment() {
    console.log('Dispatching Increment Action');
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    console.log('Dispatching Decrement Action');
    this.store.dispatch(CounterActions.decrement());
  }

  reset() {
    console.log('Dispatching Reset Action');
    this.store.dispatch(CounterActions.reset());
  }

  loadCounter() {
    console.log('Dispatching Load Counter Action');
    this.store.dispatch(CounterActions.loadCounter());
  }

  saveCounter() {
    this.counter$.subscribe((counterValue) => {
      console.log('Dispatching Save Counter Action with value:', counterValue);
      this.store.dispatch(
        CounterActions.saveCounter({ counter: counterValue })
      );
    });
  }
}
