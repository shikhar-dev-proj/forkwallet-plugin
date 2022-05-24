import * as bip39 from 'bip39';

bip39.setDefaultWordlist('english');
export const mnemonic = bip39.generateMnemonic();