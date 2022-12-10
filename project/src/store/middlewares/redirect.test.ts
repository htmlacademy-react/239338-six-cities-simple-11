import { AnyAction } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { AppRoute } from '../../const';
import { AppState } from '../../types/state';

import { redirect } from './redirect';
import { redirectToRoute } from '../action';


const fakeHistory = {
  location: {pathname: ''},

  push(path: string) {
    this.location.pathname = path;
  }
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<AppState, AnyAction>(middlewares);
const store = mockStore();


describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should redirect to /', () => {
    store.dispatch(redirectToRoute(AppRoute.Root));

    expect(fakeHistory.location.pathname).toBe(AppRoute.Root);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Root),
    ]);
  });

  it('should not redirect to / because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: '/bad-path'});
    expect(fakeHistory.location.pathname).not.toBe('/bad-path');
  });
});
