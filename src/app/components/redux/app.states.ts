import * as auth from './reducers/auth.reducer';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer,
  configuration : auth.configurationReducer
};

export interface ConfigurationState {
    state: auth.ConfigurationState;
}

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const configurationState = createFeatureSelector<ConfigurationState>('configuration');


