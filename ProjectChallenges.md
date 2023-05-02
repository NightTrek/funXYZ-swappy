
# Project notes and challenges

#### Free form project notes
##### live thoughts and notes as i had them mostly unfiltered

The initial example is somewhat confusing since it isn't directly showing a working example, just a fraction of it. When trying to make an initial wallet for testing by directly copying the example I got this error. 

```
caught (in promise) Error: Missing required parameters at WalletIdentifier constructor.
	Missing these parameters: (salt or uid)
	WalletIdentifier constructor was given these parameters: {
	"uniqueId": "0xCe94C847d66afE656704e9d9E6D53B33b6b01F3e"
}

    at verifyValidParametersForLocation (data.js:26:1)
    at new WalletIdentifier (WalletIdentifier.js:9:1)
    at new FunWallet (FunWallet.js:27:1)
    at makeWallet (_app.tsx:29:18)

 ```
Now i remembered during the interview being told that the security model uses a unique ID and index number to access the wallet. So i tried to set the salt to 1 and the unique ID to my metamask address. This worked and i was able to create a wallet. 


Additionally the swap example doesnt expose any smart contracts or interfaces other than the highly limited swap API. The uniswap api allows to specify the input and the output which is helpful to make sure you dont get a totally different result than expected. Additionally the uniswap SDK has a quoter system  which would allow for more accurate quoting using the specific pool.

How do i access a smart contract directly from this account? Is there a way to instantiate the smart contract using the funwallet?

What are the fields in the input object when doing a swap? There is an options object? does it have a output field

the swap function would not function given my projects inputs. I tried to copy the example of the swap function directly with no edits and got this error

```
caught (in promise) TypeError: Cannot read properties of undefined (reading 'contract_address')
    at DataServer.getTokenInfo (DataServer.js:116:1)
    at async Token.getAddress (Token.js:36:1)
    at async eval (swap.js:38:1)
    at async FunWallet.execute (FunWallet.js:49:60)
    at async FunWallet.swap (firstClass.js:29:1)
    at async buttonAction (swap.tsx:247:33)
```

Do i need to deploy a paymaster smart contract? Funding the wallet is unclear. Is the contract_address refering to the gas paying contract?

I tried swaping out the input token fiels with only USDC and DAI and got this error. First it had me sign a transaction which is a good sign but than failed?

```
unCaught (in promise) Error: processing response error (body="{\"error\":{\"code\":-32500,\"data\":\"AA21 didn't pay prefund\",\"message\":\"AA21 didn't pay prefund\"},\"id\":45,\"jsonrpc\":\"2.0\"}", error={"code":-32500,"data":"AA21 didn't pay prefund"}, requestBody="{\"method\":\"eth_sendUserOperation\",\"params\":[{\"verificationGasLimit\":\"0xaae60\",\"callGasLimit\":\"0x61a80\",\"callData\
```
Im assuming the wallet has no gas?
do i need to configure the gas paying smart contract?
I opted to just send the wallet gas and see if that works. this time a transaction was sent but it was reverted dont really no why? input was 'DAI' 10 "USDC". execution reverted?
using "ETH" USDC or "ETH" "DAI" also fail with a contract addresses undefined error like above

using "WETH" and "USDC works but the transaction reverts

learned that i can add the contract address into the input fiels instead of the String "DAI" or "USDC" and that works with specifically USDC DAI convertsion but not WETH.

#### questions for the team
Many of which i had while writing and email so excuse the weird format.
- To dive right into my questions, what does the fun wallet "salt"/"UUID" do and what am I supposed to set it too? The example listed in the documents fails without additional configuration of the "salt". I set it to a single integer and that seemed to work const wallet = new FunWallet({ uniqueId, salt: 1 });  
- Next, running the copy-pasted example for a swap fails with internal configuration errors. My troubleshooting plan so far is to start by investigating the gasSponser system. Currently following the docs i have it set to false so i can pay the gas myself however this doesn't seem to work. Perhaps the error I see "contract_address is undefined" refers to the token sponsor. The stack trace seems to indicate that either one of the tokens "ETH", or "DAI" is missing a smart contract address making it undefined or that the token used to pay gas (supposedly disabled) is undefined. Seeing as I directly copied your example I will need to investigate both options.  I also plan on trying to find whatever source files are available and use them to further analyse the problem. Any insight into the expected configuration would be helpful. For example, should I need to set up the gasSponser in order for the swap function to work? 
- If the swap function works, and gasSponser is set to false, will my metamask be called to sign and pay for a transaction including the gas? (turns out yes)
- If I need to set up the gas sponsor myself, is the smart contract listed somewhere that I can deploy? In order to configure the gas sponsor I need the deployed contrat address which is why I set up the application with that functionality disabled. 
- While writing this email I found that the error "contract_address undefined" is because in  the swap I used "ETH" and not "weth" or "USDC". This makes sense seeing as uniswap uses WETH for native eth however after setting it back to the example i wait about 10 seconds before metamask asks me to sign a message. Signing the message leads to the following error and question. How do i prefund the swap function with gas like this error suggests " (body="{\"error\":{\"code\":-32500,\"data\":\"AA21 didn't pay prefund\",\"message\":\"AA21 didn't pay prefund\"},\"id\":45,\"jsonrpc\":\"2.0\"}", error={"code":-32500,"data":"AA21 didn't pay prefund"}, "
- The swap functionality worked for a 10+ tries after funding the wallet with Eth but than i started getting AA21 didn’t pay prefund messages again. I tried sending an additional 0.01 ETH which is more than double what i sent last time but the issue persisted. troubleshooting paying gas with the wallet would be helpful guide. 
- an example for how to swap with native tokens would also be helpful. Using "WETH" and the input fails with a revert error.


# Next steps


1. Improve the swap functionaility with warnings about if th eaccount has enough gas to transact.
2. Create a better gas estimation system which uses the smart contract ABI to estimat egas accuratly for the smart contract wallet
3. use the uniswap v3 quoter smart contract to get more accruate quotes directly from blockchain data
4. Add support for Transaction history tracking using a backend service to monitor transactions for the smart contract wallet and cache them in a database
5. Build a transfer modal or page to allow asset transfers in the app
6. write unit tests for the swap function and the account history page.
