const TronWeb = require('tronweb');
const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io',
  privateKey: 'xxxxx'
});


const swapTokens = async (txAddress, walletAddress, tokenInAddress, tokenOutAddress, amount) => {
  try {
    const txContract = await tronWeb.contract().at(txAddress);
    const tokenContract = await tronWeb.contract().at(tokenInAddress);

    const decimals = await tokenContract.decimals().call();
    const amountToSwap = amount * 10 ** decimals;

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

    // Approve the txnContract to spend tokens on your behalf
    await tokenContract.approve(txAddress, amountToSwap.toString()).send({ from: walletAddress });

    txContract.swapExactTokensForTokens(
      amountToSwap.toString(),
      0,
      [tokenInAddress, tokenOutAddress],
      walletAddress,
      deadline
    ).send().then((result) => {
      console.log(`Swap transaction ID: ${result}`)
    });
  } catch (error) {
    console.error(error);
  }
}


module.exports = { swapTokens };
