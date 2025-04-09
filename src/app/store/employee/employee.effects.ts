import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as CounterActions from './employee.actions';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.loadCounter),
      tap(() => console.log('Effect Triggered: Load Counter')),
      mergeMap(() =>
        this.http.get<{ value: number }>('http://localhost:3000/counter').pipe(
          tap((response) => console.log('API Response:', response)),
          map((response) =>
            CounterActions.loadCounterSuccess({ counter: response.value })
          ),
          catchError((error) => {
            console.error('API Error:', error);
            return of(
              CounterActions.loadCounterFailure({ error: error.message })
            );
          })
        )
      )
    )
  );

  saveCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.saveCounter),
      tap((action) => console.log('Effect Triggered: Save Counter', action)),
      mergeMap((action) =>
        this.http
          .put('http://localhost:3000/counter', { value: action.counter })
          .pipe(
            tap(() => console.log('Counter saved successfully')),
            map(() => CounterActions.saveCounterSuccess()),
            catchError((error) => {
              console.error('API Error:', error);
              return of(
                CounterActions.saveCounterFailure({ error: error.message })
              );
            })
          )
      )
    )
  );
}
