import { IChain } from "types/common";

export const supportedChains: IChain[] = [{
  name: 'mainnet',
  displayName: 'Ether Mainnet',
  rpc: 'https://mainnet.infura.io/v3/29b0a2e3567f4446bd0545f88818bdd7',
  networkType: 'homestead',
  apikey: '29b0a2e3567f4446bd0545f88818bdd7'
}, {
  name: 'goerli',
  displayName: 'Goerli',
  rpc: 'https://goerli.infura.io/v3/29b0a2e3567f4446bd0545f88818bdd7',
  networkType: 'goerli',
  apikey: '29b0a2e3567f4446bd0545f88818bdd7'
}, {
  name: 'kovan',
  displayName: 'Kovan',
  rpc: 'https://kovan.infura.io/v3/29b0a2e3567f4446bd0545f88818bdd7',
  networkType: 'kovan',
  apikey: '29b0a2e3567f4446bd0545f88818bdd7'
}, {
  name: 'rinkeby',
  displayName: 'Rinkeby',
  rpc: 'https://rinkeby.infura.io/v3/29b0a2e3567f4446bd0545f88818bdd7',
  networkType: 'rinkeby',
  apikey: '29b0a2e3567f4446bd0545f88818bdd7'
}]

export const etherScanAPIKey = 'PCWKX3U1CBUXTQN2SWDSIMDHKJTPK2FP69';