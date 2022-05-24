import Web3 from "web3"

export enum Web3Action {
  WEB3_LOADING = 'WEB3_LOADING',
  WEB3_SUCCESS = 'WEB3_SUCCESS',
  WEB3_FAILURE = 'WEB3_FAILURE'
}

interface Web3Loading {
  type: Web3Action.WEB3_LOADING
}

interface Web3Loaded {
  type: Web3Action.WEB3_SUCCESS
  web3: Web3
}

interface Web3Failed {
  type: Web3Action.WEB3_FAILURE
  error: string
}

export type Web3ActionTypes = Web3Loading | Web3Loaded | Web3Failed;