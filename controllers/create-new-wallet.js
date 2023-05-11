const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io', // Mainnet: https://api.trongrid.io, Shasta Testnet: https://api.shasta.trongrid.io
  // headers: { "TRON-PRO-API-KEY": 'your api key' },
  // privateKey: 'your private key'
});


const createNewWallet = async () => {
  // Generate a new wallet
  const newWallet = await tronWeb.createAccount();

  // Log the wallet address and private key
  console.log('Address:', newWallet.address.base58);
  console.log('Private Key:', newWallet.privateKey);
};

module.exports = { createNewWallet };
