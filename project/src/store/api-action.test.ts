import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { ApiRoute, AUTH_TOKEN_KEY } from '../const';
import { AppState } from '../types/state';

import { makeMockAppUserData, makeMockToken, makeMockID, makeMockOffer, makeMockReview } from '../test-mocks';

import { createAPI } from '../services/api';
import { checkAuthAction, loginAction, logoutAction, getReviewsAction, sendReviewAction, getOffersAction, getNearbyOffersAction, getCurrentOfferAction } from './api-action';


const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    AppState,
    Action<string>,
    ThunkDispatch<AppState, typeof api, Action>
  >(middlewares);


const mockAppUserData = makeMockAppUserData();
const mockToken = makeMockToken();

const mockOfferID = makeMockID();
const mockOffer = makeMockOffer();
const mockOffers = [makeMockOffer(), makeMockOffer()];

const mockReview = makeMockReview();
const mockReviews = [makeMockReview(), makeMockReview()];


describe('Async actions test', () => {
  describe('Authorization actions test', () => {
    it('should set authorization status to "AUTH" when server returns 200', async () => {
      const store = mockStore();

      mockAPI
        .onGet(ApiRoute.Login)
        .reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch loginAction and save authorization token when POST /login', async () => {
      mockAPI
        .onPost(ApiRoute.Login)
        .reply(200, {token: mockToken});

      Storage.prototype.setItem = jest.fn();

      const store = mockStore();

      await store.dispatch(loginAction(mockAppUserData));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY, mockToken);
    });

    it('should dispatch logoutAction when DELETE /logout', async () => {
      mockAPI
        .onDelete(ApiRoute.Logout)
        .reply(204);

      Storage.prototype.removeItem = jest.fn();

      const store = mockStore();

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY);
    });
  });

  describe('Reviews actions test', () => {
    it('should dispatch getReviewsAction when GET /comments/:id', async () => {
      mockAPI
        .onGet(`${ ApiRoute.Comments }/${ mockOfferID }`)
        .reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(getReviewsAction(mockOfferID.toString()));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        getReviewsAction.pending.type,
        getReviewsAction.fulfilled.type
      ]);
    });

    it('should dispatch sendReviewAction when POST /comments/:id', async () => {
      mockAPI
        .onPost(`${ ApiRoute.Comments }/${ mockOfferID }`)
        .reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(sendReviewAction({review: mockReview, currentOfferID: mockOfferID }));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        sendReviewAction.pending.type,
        sendReviewAction.fulfilled.type
      ]);
    });
  });

  describe('Offers actions test', () => {
    it('should dispatch getOffersAction when GET /hotels', async () => {
      mockAPI
        .onGet(ApiRoute.Offers)
        .reply(200, mockOffers);

      const store = mockStore();

      await store.dispatch(getOffersAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        getOffersAction.pending.type,
        getOffersAction.fulfilled.type
      ]);
    });

    it('should dispatch getNearbyOffersAction when GET /hotels/nearby', async () => {
      mockAPI
        .onGet(`${ ApiRoute.Offers }/${ mockOfferID }/nearby`)
        .reply(200, mockOffers);

      const store = mockStore();

      await store.dispatch(getNearbyOffersAction(mockOfferID.toString()));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        getNearbyOffersAction.pending.type,
        getNearbyOffersAction.fulfilled.type
      ]);
    });

    it('should dispatch getCurrentOfferAction, getReviewsAction and getNearbyOffersAction when GET /hotels/:id', async () => {
      mockAPI
        .onGet(`${ ApiRoute.Offers }/${ mockOfferID }`)
        .reply(200, mockOffer);

      const store = mockStore();

      await store.dispatch(getCurrentOfferAction(mockOfferID.toString()));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        getCurrentOfferAction.pending.type,
        getReviewsAction.pending.type,
        getNearbyOffersAction.pending.type,
        getCurrentOfferAction.fulfilled.type
      ]);
    });
  });
});
