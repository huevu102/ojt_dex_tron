const TronWeb = require('tronweb');
const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io',
  privateKey: 'xxxxx'
});

const { getTRXBalance, getTRC10Balance, getTRC20Balance } = require('./get-balance');



// transfer TRX
const transferTRX = async (recipientAddress, amount, walletAddress, privateKey) => {
  try {
    const amountToSend = amount*(10**6);
    const tradeobj = await tronWeb.transactionBuilder.sendTrx(recipientAddress, amountToSend, walletAddress);  
    const signedtxn = await tronWeb.trx.sign(tradeobj);
    tronWeb.trx.sendRawTransaction(signedtxn)
      .then((result) => {
        console.log(`TRX transfer transaction ID: ${result.transaction.txID}`);
      });
  } catch (error) {
    console.error(error);
  } 
};


// transfer TRC10
const transferTRC10 = async (recipientAddress, amount, tokenID, walletAddress) => {
  try {
    const amountToSend = amount * (10 ** 6);
    const tradeobj = await tronWeb.transactionBuilder.sendToken(recipientAddress, amountToSend, tokenID, walletAddress);
    const signedtxn = await tronWeb.trx.sign(tradeobj);
    tronWeb.trx.sendRawTransaction(signedtxn)
      .then((result) => {
        console.log(`TRC10 transfer transaction ID: ${result.transaction.txID}`);
      });
  } catch (error) {
    console.error(error);
  } 
};


// transfer TRC20
const transferTRC20 = async (recipientAddress, amount, tokenAddress, walletAddress) => {
  try {
    // First create an empty contract object, and then specify the contract address by at() function.
    // If the abi is on the chain, at() function will load ABI automatically , else you need to load it manually
    const contract = await tronWeb.contract().at(tokenAddress);

    const decimals = await contract.decimals().call({ from: walletAddress });
    const amountToSend = BigInt(amount) * BigInt(10) ** BigInt(decimals);


    contract.transfer(recipientAddress, amountToSend.toString()).send()
      .then((result) => {
        console.log(`TRC20 transfer transaction ID: ${result}`)
      });
  } catch (error) {
    console.error(error);
  }
};


module.exports = { transferTRX, transferTRC10, transferTRC20 };
