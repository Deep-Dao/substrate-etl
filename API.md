# Substrate ETL API

The api is graphql based. To query any data go to prisma endpoint e.g. http://0.0.0.0:4466 and execute the graphql query.


## Balance API

To query any address balance an rpc call to the chain has to be made. polkadot.js api makes it easy to do such calls.
To check balance install and import ApiPromise and WsProvider from the polkadot js api

```js
import { ApiPromise, WsProvider } from '@polkadot/api';


// initialise the api
const WS_PROVIDER = 'wss://kusama-rpc.polkadot.io'; // change according to network
const provider = new WsProvider(WS_PROVIDER);
const api = new ApiPromise({ provider });

const address = 'ECm6NVdmaWg5oBpW6TsxkkqVAV5SP6DQn2FpvyqoqYC1W63';

// wait for api to be ready
api.isReady.then(() => {
	console.log('API ready');

	// get the balance
	// freeBalance represents the transferable balance
	api.derive.balances.account(address, (info) => {
		console.log(info.freeBalance?.toString());
	});

});



```
