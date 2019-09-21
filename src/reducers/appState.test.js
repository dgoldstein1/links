// appState.test.js

import appState from "./appState";

import { SET_LOADING, UPDATE_VIEW } from "../actions/appState";

describe("reducers", () => {
  describe("appState", () => {
    const initialState = {
      loading: true, // the app is / isn't loading
      view: "main"
    };

    it("initializes with correct state", () => {
      expect(appState(undefined, { action: undefined })).toEqual(initialState);
    });

    describe("UPDATE_VIEW", () => {
      it("updates the store with a new view", () => {
        let action = {
          type: UPDATE_VIEW,
          view: "newView"
        };
        expect(appState(undefined, action)).toEqual({
          ...initialState,
          view: "newView"
        });
      });
    });
    describe("SET_LOADING", () => {
      it("updates the store with new value of loading", () => {
        let action = {
          type: SET_LOADING,
          loading: true
        };
        expect(appState(undefined, action)).toEqual({
          ...initialState,
          loading: true
        });
      });
    });
  });
});
