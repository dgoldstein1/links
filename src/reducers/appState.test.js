import appState from "./appState";

describe("reducers", () => {
  describe("appState", () => {
    const initialState = {
      loading: true, // the app is / isn't loading
      view: "splash",
    };

    it("initializes with correct state", () => {
      expect(appState(undefined, { action: undefined })).toMatchSnapshot();
    });

    describe("UPDATE_VIEW", () => {
      it("updates the store with a new view", () => {
        let action = {
          type: "UPDATE_VIEW",
          view: "newView",
        };
        expect(appState(undefined, action)).toMatchSnapshot();
      });
    });
    describe("SET_LOADING", () => {
      it("updates the store with new value of loading", () => {
        let action = {
          type: "SET_LOADING",
          loading: true,
        };
        expect(appState(undefined, action)).toMatchSnapshot();
      });
    });
    describe("SET_LANGUAGE", () => {
      it("sets new language", () => {
        expect(
          appState(undefined, { type: "SET_LANGUAGE", language: "newlang" })
        ).toMatchSnapshot();
      });
    });
  });
});
