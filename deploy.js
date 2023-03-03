const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  const wallet = new ethers.Wallet(
    "0xd408edf88f9eb739a072fff855d01ffd90796aec83055f531364d1b8d3738085",
    provider
  );
  // const encyptedJson = fs.readFileSync("./encryptedKey.json", "utf8");
  // let wallet = ethers.Wallet.fromEncryptedJsonSync(
  //   encyptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = await wallet.connect(provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying contract...");
  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(contract);
  console.log("Contract deployed to:", deploymentReceipt.contractAddress);
  console.log("Only with Transaction Data");
  const nonce = await wallet.getTransactionCount();

  const tx = {
    nonce: nonce,

    to: null,
    value: 0,

    chainId: 1337,
  };

  const sentTxResponse = await wallet.sendTransaction(tx);
  await sentTxResponse.wait(1);
  console.log(sentTxResponse);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const transactionReciept = await transactionResponse.wait(1);
  const updatedFavNumber = await contract.retrieve();
  console.log(`Updated Favorite number: ${updatedFavNumber.toString()}`);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
