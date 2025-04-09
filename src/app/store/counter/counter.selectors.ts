import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

export const selectCounterState =
  createFeatureSelector<CounterState>('counter');
  
export const selectCounterValue = createSelector(
  selectCounterState,
  (state) => state.value
);
export const selectCounterError = createSelector(
  selectCounterState,
  (state) => state.error
);
