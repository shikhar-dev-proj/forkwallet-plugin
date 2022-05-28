import * as bip39 from 'bip39';


export const generateMnemonic = () => {
  bip39.setDefaultWordlist('english');
  return bip39.generateMnemonic();
}