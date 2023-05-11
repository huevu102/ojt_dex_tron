const TronWeb = require('tronweb');
const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io'
});


// get TRX balance
const getTRXBalance = async (walletAddress) => {
  try {
    const TRXBalance = await tronWeb.trx.getBalance(walletAddress);
    console.log(`TRX balance: ${TRXBalance / 10**6}`);
  } catch (error) {
    console.error(error);
  }
};


// get TRC10 balance
const getTRC10Balance = async (walletAddress) => {
  try {
    const account = await tronWeb.trx.getAccount(walletAddress);

    account.assetV2.forEach(async (token) => {
      const tokenData = await tronWeb.trx.getTokenByID(parseInt(token.key));
      console.log(`${tokenData.abbr} balance: ${token.value / 10**tokenData.precision}`);
    });
  } catch (error) {
    console.error(error);
  }
};


// get TRC10 balance
const getTRC20Balance = async (walletAddress, tokenAddress) => {
  try {
    // First create an empty contract object, and then specify the contract address by at() function.
    // If the abi is on the chain, at() function will load ABI automatically , else you need to load it manually
    const contract = await tronWeb.contract().at(tokenAddress);

    const balance = await contract.balanceOf(walletAddress).call({ from: walletAddress });
    const decimals = await contract.decimals().call({ from: walletAddress });
    const symbol = await contract.symbol().call({ from: walletAddress });

    console.log(`${symbol} balance: ${Number(balance._hex) / 10**decimals}`);

  } catch (error) {
    console.error(error);
  }
};


module.exports = { getTRXBalance, getTRC10Balance, getTRC20Balance };
