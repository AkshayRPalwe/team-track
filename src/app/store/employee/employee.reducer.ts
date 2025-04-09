import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './employee.actions';

export interface CounterState {
  value: number;
  error: string | null;
}

export const initialState: CounterState = {
  value: 0,
  error: null,
};

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, (state) => ({
    ...state,
    value: state.value + 1,
  })),
  on(CounterActions.decrement, (state) => ({
    ...state,
    value: state.value - 1,
  })),
  on(CounterActions.reset, (state) => ({ ...state, value: 0 })),
  on(CounterActions.loadCounterSuccess, (state, { counter }) => ({
    ...state,
    value: counter,
  })),
  on(CounterActions.loadCounterFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CounterActions.saveCounterSuccess, (state) => state),
  on(CounterActions.saveCounterFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
