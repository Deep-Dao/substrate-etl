# Kusama Governance

## Governance
Kusama uses a sophisticated governance mechanism that allows it to evolve gracefully over time at the ultimate behest of its assembled stakeholders. The stated goal is to ensure that the majority of the stake can always command the network.

To do this, we bring together various novel mechanisms, including an amorphous state-transition function stored on-chain and defined in a platform-neutral intermediate language (i.e. WebAssembly) and several on-chain voting mechanisms such as referenda with adaptive super-majority thresholds and batch approval voting. All changes to the protocol must be agreed upon by stake-weighted referenda.

## Mechanism
In order to make any changes to the network, the idea is to compose active token holders and the council together to administrate a network upgrade decision. No matter whether the proposal is proposed by the public (DOT holders) or the council, it finally will have to go through a referendum to let all DOT holders, weighted by stake, make the decision.


## Referenda
Referenda are simple, inclusive, stake-based voting schemes. Each referendum has a specific proposal associated with it that takes the form of a privileged function call in the runtime (that includes the most powerful call: set_code, which is able to switch out the entire code of the runtime, achieving what would otherwise require a "hard fork"). They are discrete events, have a fixed period where voting happens, and then are tallied and the function call is made if the vote is approved. Referenda are always binary; your only options in voting are "aye", "nay", or abstaining entirely.

Referenda can be started in one of several ways:

- Publicly submitted proposals;
- Proposals submitted by the council, either through a majority or unanimously;
- Proposals submitted as part of the enactment of a prior referendum;
- Emergency proposals submitted by the Technical Committee and approved by the Council.
- All referenda have an enactment delay associated with them. This is the period of time between the referendum ending and, assuming the proposal was approved, the changes being enacted. For the first two ways that a referendum is launched, this is a fixed time. For Kusama, it is 8 days; in Polkadot, it is 28 days. For the third type, it can be set as desired.

Emergency proposals deal with major problems with the network that need to be "fast-tracked". These will have a shorter enactment time.

- Proposing a Referendum
- Public Referenda
- Anyone can propose a referendum by depositing the minimum amount of tokens for a certain period (number of blocks). If someone agrees with the proposal, they may deposit the same amount of tokens to support it - this action is called seconding. The proposal with the highest amount of bonded support will be selected to be a referendum in the next voting cycle. Note that this may be different than the absolute number of seconds; for instance, three accounts bonding 20 DOT each would "outweigh" ten accounts bonding a single DOT each. The bonded tokens will be released once the proposal is tabled (that is, brought to a vote).

There can be a maximum of 100 public proposals in the proposal queue.

## Council Referenda
Unanimous Council - When all members of the council agree on a proposal, it can be moved to a referendum. This referendum will have a negative turnout bias (that is, the smaller the amount of stake voting, the smaller the amount necessary for it to pass - see "Adaptive Quorum Biasing", below).

Majority Council - When agreement from only a simple majority of council members occurs, the referendum can also be voted upon, but it will be majority-carries (51% wins).

There can only be one active referendum at any given time, except when there is also an emergency referendum in progress.

## Voting Timetable
Every 28 days on Polkadot or 7 days on Kusama, a new referendum will come up for a vote, assuming there is at least one proposal in one of the queues. There is a queue for Council-approved proposals and a queue for publicly submitted proposals. The referendum to be voted upon alternates between the top proposal in the two queues.

The "top" proposal is determined by the amount of stake bonded behind it. If the given queue whose turn it is to create a referendum has no proposals (is empty), and there are proposals waiting in the other queue, the top proposal in the other queue will become a referendum.

Multiple referenda cannot be voted upon in the same time period, excluding emergency referenda. An emergency referendum occurring at the same time as a regular referendum (either public- or council-proposed) is the only time that multiple referenda will be able to be voted on at once.

## Voting on a referendum
To vote, a voter generally must lock their tokens up for at least the enactment delay period beyond the end of the referendum. This is in order to ensure that some minimal economic buy-in to the result is needed and to dissuade vote selling.

It is possible to vote without locking at all, but your vote is worth a small fraction of a normal vote, given your stake. At the same time, holding only a small amount of tokens does not mean that the holder cannot influence the referendum result, thanks to time-locking. You can read more about this at Voluntary Locking.

## Adaptive Quorum Biasing
Kusama introduces a concept, "Adaptive Quorum Biasing", which functions as a lever that the council can use to alter the effective super-majority required to make it easier or more difficult for a proposal to pass in the case that there is no clear majority of voting power backing it or against it.


## Council

To represent passive stakeholders, Kusama introduces the idea of a "council". The council is an on-chain entity comprising a number of actors, each represented as an on-chain account. On Kusama, the council currently consists of 13 members. This is expected to increase over the next few months to 24 seats. In general, the council will end up having a fixed number of seats. On Polkadot, this will be 24 seats while on Kusama it is 19 seats.

Along with controlling the treasury, the council is called upon primarily for three tasks of governance: proposing sensible referenda, cancelling uncontroversially dangerous or malicious referenda, and electing the technical committee.

For a referendum to be proposed by the council, a strict majority of members must be in favor, with no member exercising a veto. Vetoes may be exercised only once by a member for any single proposal; if, after a cool-down period, the proposal is resubmitted, they may not veto it a second time. Council motions which pass with a 3/5 (60%) super-majority - but without reaching unanimous support - will move to a public referendum under a neutral, majority-carries voting scheme. In the case that all members of the council vote in favor of a motion, the vote is considered unanimous and becomes a referendum with negative adaptive quorum biasing.


# Substrate ETL API

The api is graphql based. To query any data go to prisma endpoint e.g. http://0.0.0.0:4466 and execute the graphql query.
With graphql various filtering and pagination option is available while querying. Check graphqli docs to get the schema and filtering queries.

e.g.

Query:

```graphql
{
  motions(where: {}) {
    id
    author
    motionStatus {
      id
      status
    }
    metaDescription
    memberCount
    preimage {
      author
      preimageArguments {
        id
        name
        value
      }
      metaDescription
      depositAmount
    }
    preimageHash
  }
}

```

Response:

```json
{
  "data": {
    "motions": [
      {
        "motionStatus": [
          {
            "id": "ckmniyiqo000v0719tvf3up5t",
            "status": "Proposed"
          }
        ],
        "author": "1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL",
        "metaDescription": "[ Approve a proposal. At a later time, the proposal will be allocated to the beneficiary,  and the original deposit will be returned., ,  May only be called from `T::ApproveOrigin`., ,  # <weight>,  - Complexity: O(1).,  - DbReads: `Proposals`, `Approvals`,  - DbWrite: `Approvals`,  # </weight>]",
        "preimage": null,
        "preimageHash": null,
        "id": 3,
        "memberCount": 8
      }
    ]
  }
}
```

## Proposals

Query:

```graphql
{
	proposals(where:{}) {
    id
    proposalId
    preimage {
      author
      preimageArguments {
        id
        name
        value
      }
      metaDescription
      depositAmount
    }
    preimageHash
    author
    depositAmount
    proposalStatus {
      id
      uniqueStatus
      status
    }
  }
}
```

## Referenda

Query
```graphql
{
  referendums {
    id
    referendumId
    voteThreshold
    delay
    end
    preimage {
      author
      preimageArguments {
        id
        name
        value
      }
      metaDescription
      depositAmount
    }
    referendumStatus {
      id
      status
      uniqueStatus
    }
  }
}
```

## Motions

Query:
```graphql
{
  motions(where: {}) {
    id
    motionProposalId
    motionProposalHash
    author
    metaDescription
    memberCount
    motionStatus {
      id
      status
    }
    preimage {
      author
      preimageArguments {
        id
        name
        value
      }
      metaDescription
      depositAmount
    }
    motionProposalArguments{
    	name
      value
    }
    preimageHash
  }
}
```

## Treasury Proposals

```graphql
{
  treasurySpendProposals {
    id
    treasuryProposalId
    proposer
    beneficiary
    value
    bond
    treasuryStatus {
      id
      status
    }
    motion{
      id
      motionProposalId
    }
  }
}
```

## Tips

```graphql
{
  tips {
    id
    hash
    reason
    who
    finder
    finderFee
    closes
    tipStatus {
      id
      status
    }
  }
}
```

## Bounties

```graphql
{
  bounties(where:{}) {
    id
    bountyId
    proposer
    value
    fee
    curatorDeposit
    bond
    curator
    beneficiary
    bountyStatus {
      id
      status
    }
  }
}
```

## Council at Block

```graphql
{
  councils(where: {blockNumber:{number_in: [2344234]}}) {
    id
    blockNumber {
      number
    }
    members {
      address
    }
  }
}
```


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
