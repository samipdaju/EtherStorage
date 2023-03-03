const Web3 = require("web3");

async function main() {
  const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
  const web3 = new Web3(provider);

  const blockTransaction = await web3.eth.getBlock("latest");
  console.log(blockTransaction.blockNumber);
  const transactionHash = blockTransaction.transactions[0];
  const transaction = await web3.eth.getTransaction(
    transactionHash,
    (err, transaction) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(transaction);
      }
    }
  );

  const address = "0x72aD600e22668FB428e2D1518B90fA9Da1357Aad";
  const transactionCount = await web3.eth.getTransactionCount(address);

  const startBlock = 0;
  const endBlock = "latest";

  // Loop through each block in the range and retrieve its transactions
  for (let i = startBlock; i <= endBlock; i++) {
    // Get the block data
    const block = await web3.eth.getBlock(i, true);

    // Retrieve the list of transactions in the block
    const transactions = block.transactions;
    console.log(transactions);

    // Loop through each transaction in the block and print its details
    // transactions.forEach((transaction) => {
    //   console.log(`Transaction Hash: ${transaction.hash}`);
    //   console.log(`From Address: ${transaction.from}`);
    //   console.log(`To Address: ${transaction.to}`);
    //   console.log(
    //     `Value: ${web3.utils.fromWei(transaction.value, "ether")} Ether`
    //   );
    //   console.log(`Gas Limit: ${transaction.gas}`);
    //   console.log(
    //     `Gas Price: ${web3.utils.fromWei(transaction.gasPrice, "gwei")} Gwei`
    //   );
    //   console.log(`Nonce: ${transaction.nonce}`);
    //   console.log("\n");
    // });
  }

  console.log(`Transaction Count is :${transactionCount}`);
  let transactions = [];

  for (let i = transactionCount; i >= 0; i--) {
    await web3.eth.getTransactionFromBlock(i).then((data) => {
      console.log(data);
      transactions.push(data);
    });
  }
  //   console.log(`list is ${transactions}`);

  //   const blocks = [];
  //   await web3.eth.getBlockNumber().then(async (latestBlockNumber) => {
  //     for (let i = latestBlockNumber; i >= 0; i--) {
  //       await web3.eth.getBlock(i).then((block) => {
  //         console.log(block);
  //         blocks.push(block);
  //       });
  //     }
  //     console.log(blocks);
  //   });

  // replace with the address you want to get the transactions from
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
