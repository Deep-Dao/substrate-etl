# Substrate ETL API

The api is graphql based. To query any data go to prisma endpoint e.g. http://0.0.0.0:4466 and execute the graphql query.


## Balance API (Onchain)

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

## Accounts API

To query all addresses we can use subscan API. Will provide the API key.

Request:

```
curl -X POST 'https://polkadot.api.subscan.io/api/scan/accounts' \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: YOUR_KEY' \
  --data-raw '{
    "row": 1,
    "page": 1
  }'
```

Response:

```json
{
    "code": 0,
    "data": {
        "count": 57692,
        "list": [
            {
                "account_display": {
                    "account_index": "1x6Mn",
                    "address": "13GkDCmf2pxLW1mDCTkSezQF541Ksy6MsZfAEhw5vfTdPsxE",
                    "display": "",
                    "identity": false,
                    "judgements": null,
                    "parent": "",
                    "parent_display": ""
                },
                "address": "13GkDCmf2pxLW1mDCTkSezQF541Ksy6MsZfAEhw5vfTdPsxE",
                "balance": "29415.1098827294",
                "kton_balance": "0",
                "kton_lock": "0",
                "nickname": "",
                "ring_lock": "29396.9455560094"
            }
        ]
    },
    "message": "Success",
    "ttl": 1
}
```
