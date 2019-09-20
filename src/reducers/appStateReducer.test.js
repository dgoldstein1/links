// appStateReducer.test.js

import appStateReducer from './appStateReducer';

import { 
  SET_LOADING,
  UPDATE_VIEW
 } from '../actions/appStateActions';

describe('reducers',() => {
	describe('appStateReducer',() => {

		const initialState = {
		  loading : true, // the app is / isn't loading
		  view : "main"
		}

		it('initializes with correct state',() => {
			expect(appStateReducer(undefined, { action : undefined })).toEqual(initialState)
		})

		describe('UPDATE_VIEW',() => {
			it('updates the store with a new view',() => {
				let action = {
					type : UPDATE_VIEW,
					view : "newView"
				}
				expect(appStateReducer(undefined, action)).toEqual({
					...initialState,
					view : "newView"
				})
			})
		})
		describe('SET_LOADING',() => {
			it('updates the store with new value of loading',() => {
				let action = {
					type : SET_LOADING,
					loading : true
				}
				expect(appStateReducer(undefined, action)).toEqual({
					...initialState,
					loading : true
				})
			})
		})
	})
})