import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as CounterActions from '../../store/counter/counter.actions';
import { selectCounterValue } from '../../store/counter/counter.selectors';


fdescribe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let store: Store;
  let dispatchSpy: jasmine.Spy;
  let mockSelectCounterValue: MemoizedSelector<any, number>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectCounterValue,
              value: 0,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch increment action on increment()', () => {
    component.increment();
    expect(dispatchSpy).toHaveBeenCalledWith(CounterActions.increment());
  });

  it('should dispatch decrement action on decrement()', () => {
    component.decrement();
    expect(dispatchSpy).toHaveBeenCalledWith(CounterActions.decrement());
  });

  it('should dispatch reset action on reset()', () => {
    component.reset();
    expect(dispatchSpy).toHaveBeenCalledWith(CounterActions.reset());
  });

  it('should dispatch loadCounter action on loadCounter()', () => {
    component.loadCounter();
    expect(dispatchSpy).toHaveBeenCalledWith(CounterActions.loadCounter());
  });

  it('should dispatch saveCounter with correct value on saveCounter()', () => {
    // Override counter$ observable
    component.counter$ = of(5);
    component.saveCounter();

    expect(dispatchSpy).toHaveBeenCalledWith(
      CounterActions.saveCounter({ counter: 5 })
    );
  });
});
