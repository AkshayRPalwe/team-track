import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
export const loadCounter = createAction('[Counter] Load Counter');
export const loadCounterSuccess = createAction(
  '[Counter] Load Counter Success',
  props<{ counter: number }>()
);
export const loadCounterFailure = createAction(
  '[Counter] Load Counter Failure',
  props<{ error: string }>()
);
export const saveCounter = createAction(
  '[Counter] Save Counter',
  props<{ counter: number }>()
);
export const saveCounterSuccess = createAction(
  '[Counter] Save Counter Success'
);
export const saveCounterFailure = createAction(
  '[Counter] Save Counter Failure',
  props<{ error: string }>()
);

// export: This makes increment available outside this file (so it can be imported in reducers, effects, or components).
// const: It declares a constant. Since actions never change, using const ensures immutability.

// createAction: This is an NgRx function that creates a unique action. It is imported from @ngrx/store
