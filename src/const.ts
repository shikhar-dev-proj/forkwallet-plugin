import { IChain } from "types/common";

export const supportedChains: IChain[] = [{
  name: 'mainnet',
  displayName: 'Ether Mainnet',
  rpc: ''
}, {
  name: 'testnet',
  displayName: 'Ether Testnet',
  rpc: 'https://goerli.infura.io/v3/29b0a2e3567f4446bd0545f88818bdd7',
  networkType: 'goerli',
  apikey: '29b0a2e3567f4446bd0545f88818bdd7'
}]