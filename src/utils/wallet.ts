export const getTrimmedWalletAddress = (walletAddress: string) => {
  return walletAddress?.slice(0,4) + '....' + walletAddress?.slice(walletAddress.length-4, walletAddress.length)
}