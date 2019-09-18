// appStateReducer.test.js

import appStateReducer from './appStateReducer';

import { 
  SET_LOADING,
  UPDATE_VIEW
 } from '../actions/appStateActions';

describe('reducers',() => {
	describe('appStateReducer',() => {

		const initialState = {
		  availableViews : ["visits", "map"], // list of views available 
		  loading : false, // the app is / isn't loading
		  view : "visits" // the current view
		}

		it('initializes with correct state',() => {
			expect(appStateReducer(undefined, { action : undefined })).toEqual(initialState)
		})

		describe('UPDATE_VIEW',() => {
			it('updates the store with a new view',() => {
				let action = {
					type : UPDATE_VIEW,
					view : "map"
				}
				expect(appStateReducer(undefined, action)).toEqual({ view : "map", availableViews : ["visits", "map"], loading : false})
			})
		})
		describe('SET_LOADING',() => {
			it('updates the store with new value of loading',() => {
				let action = {
					type : SET_LOADING,
					loading : true
				}
				expect(appStateReducer(undefined, action)).toEqual({ view : "visits", availableViews : ["visits", "map"], loading : true})
			})
		})
	})
})