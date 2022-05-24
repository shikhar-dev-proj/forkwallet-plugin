import { Reducer } from "@reduxjs/toolkit";
import { Web3Action, Web3ActionTypes } from "./action";
import { Web3State } from "./types";

export const Web3InitialState: Web3State = {
  loading: true
};

export const web3Reducer: Reducer<Web3State, Web3ActionTypes> = (state: Web3State = Web3InitialState, action: Web3ActionTypes): Web3State => {
  switch (action.type) {
    case Web3Action.WEB3_LOADING:
      return {
        ...state,
        loading: true
      }
    case Web3Action.WEB3_SUCCESS:
      return {
        ...state,
        loading: false,
        web3: action.web3
      }
    case Web3Action.WEB3_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}