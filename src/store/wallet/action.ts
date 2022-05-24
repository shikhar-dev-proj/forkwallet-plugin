export enum WalletAction {
  WALLET_LOADING = 'WALLET_LOADING',
  WALLET_LOADED = 'WALLET_LOADED',
  WALLET_UNLOCK = 'WALLET_UNLOCK',
  WALLET_LOCK = 'WALLET_LOCK',
  WALLET_CREATE = 'WALLET_CREATE',
  WALLET_CREATED = 'WALLET_CREATED',
  WALLET_CREATION_FAILED = 'WALLET_CREATION_FAILED',
  WALLET_IMPORT = 'WALLET_IMPORT',
  WALLET_IMPORTED = 'WALLET_IMPORTED',
  WALLET_IMPORT_FAILED = 'WALLET_IMPORT_FAILED'
}

interface WalletLoading {
  type: WalletAction.WALLET_LOADING,

}

interface WalletLoaded {
  type: WalletAction.WALLET_LOADED
  wallet: any
}

interface WalletLock {
  type: WalletAction.WALLET_LOCK
}

interface WalletUnlock {
  type: WalletAction.WALLET_UNLOCK
  password: string;
}

interface WalletCreate {
  type: WalletAction.WALLET_CREATE
  name: string
  password: string
}


interface WalletCreate {
  type: WalletAction.WALLET_CREATE
  name: string
  password: string
}

interface WalletCreated {
  type: WalletAction.WALLET_CREATED
  wallet: any
}

interface WalletCreationFailed {
  type: WalletAction.WALLET_CREATION_FAILED
  error: string
}

interface WalletImport {
  type: WalletAction.WALLET_IMPORT
  name: string
  password: string
  mnemonic: string;
}

interface WalletImported {
  type: WalletAction.WALLET_IMPORTED
  wallet: any
}

interface WalletImportFailed {
  type: WalletAction.WALLET_IMPORT_FAILED
  error: string
}

export type WalletActionTypes = WalletLoading | WalletLoaded | WalletUnlock | WalletLock | WalletCreate | WalletCreated | WalletCreationFailed | WalletImport | WalletImported | WalletImportFailed;