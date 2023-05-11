const walletAddress = 'TMFxzsZnzXQ16fn3aGKqkz4AxQvCsJw2Dp';
const recipientAddress = 'THuPCmxLvHtJ1DhePMoCiKJaB8PX19n2dv';

const USDTAddress = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj';
const BTTAddress = 'TNuoKL1ni8aoshfFL1ASca1Gou9RXwAzfn';



// create new wallet
const { createNewWallet } = require('./controllers/create-new-wallet');
// createNewWallet();


// get assets info of the wallet (TRX, TRC10, TRC20)
const { getTRXBalance, getTRC10Balance, getTRC20Balance } = require('./controllers/get-balance');
getTRXBalance(walletAddress);
getTRC10Balance(walletAddress);
getTRC20Balance(walletAddress, USDTAddress);
getTRC20Balance(walletAddress, BTTAddress);


// transfer TRX, TRC10, TRC20
const { transferTRX, transferTRC10, transferTRC20 } = require('./controllers/transfer');
const amount = 10;
const tokenID = '1000016'; // TRZ token ID

// transferTRX(recipientAddress, amount, walletAddress);
// transferTRC10(recipientAddress, amount, tokenID, walletAddress);
transferTRC20(recipientAddress, amount, USDTAddress, walletAddress);
