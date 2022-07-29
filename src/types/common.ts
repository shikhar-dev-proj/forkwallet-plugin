export type IChain = {
  name: string
  displayName: string
  rpc: string
  networkType: string
  apikey: string
}

export enum TxType {
  IN = 'IN',
  OUT = 'OUT'
}

export type Transaction = {
  nonce: number
  gasPrice: string
  gasLimit: string
  type: TxType
  from: string
  to: string
  value: string
  date: Date
}