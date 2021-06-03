# Proposal Title and Descriptions

To fetch title and description for any proposal use polkassembly apis. Polkassembly is used to store title and description of proposals created on chain.

Referendum
===
```
curl 'https://kusama.polkassembly.io/v1/graphql' \
  -H 'authority: kusama.polkassembly.io' \
  -H 'sec-ch-ua: "Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"' \
  -H 'accept: */*' \
  -H 'authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa2xhYmg4MTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1rdXNhbWEiOiJ7Q3dZQm5mb3hiMUI2ZmliZE1ONGpzMjFEUWVxZ2JxSGd3THdhY2ZLRmRDN3ZzeVosRWN3MmM5Q0FhZ3dGMzk1YzJ3TktSNWI2aFA4QWZxMTYzMnBCWm1ja3pmWk14R3gsRFlUd1VXazZQRHJYYkp4Q1NDU3VoSDJyMWJaSnBwck5kaGJHUWNEM3JDakxvNmcsR2g3NWJLVG9aNEdxczZQNWN5cHNLUGs0TmFRYWNtRnlBTnJWd1kxOFpRSHpna2J9IiwieC1oYXN1cmEta3VzYW1hLWRlZmF1bHQiOiJDd1lCbmZveGIxQjZmaWJkTU40anMyMURRZXFnYnFIZ3dMd2FjZktGZEM3dnN5WiIsIngtaGFzdXJhLXBvbGthZG90Ijoie30iLCJ4LWhhc3VyYS1wb2xrYWRvdC1kZWZhdWx0IjoiIiwieC1oYXN1cmEtdXNlci1lbWFpbCI6Im5pa2xhYmg4MTFAZ21haWwuY29tIiwieC1oYXN1cmEtdXNlci1pZCI6IjMifSwiaWF0IjoxNjIyNzE3MzM1LCJub3RpZmljYXRpb24iOnsibmV3UHJvcG9zYWwiOnRydWUsIm93blByb3Bvc2FsIjp0cnVlLCJwb3N0Q3JlYXRlZCI6dHJ1ZSwicG9zdFBhcnRpY2lwYXRlZCI6dHJ1ZX0sInN1YiI6IjMiLCJ1c2VybmFtZSI6Im5pa2xhYmgiLCJ3ZWIzc2lnbnVwIjpmYWxzZSwiZXhwIjoxNjIyNzIwOTM1fQ.Jq4r97pDDSeO-avNdzTmOT4fzzA2nrthoy8yYqqJbCDvfIOqI905sHkatUx4T-5_PbogRc4p4TYPEWaW2uAR6Tte29wSXyc2Zxfk8rzjN8kDZXjBVxKa_yP5QgK8Yqf5ShOgCeQEdf3R5yurybtzoq6asroPYmsAJt1RmwNwLrzA_AJq4BcSG_KejXgkUWICvVapaa0HAiw1UueypizI_sW_9XQo0h6qiGK8tCuWQ7-0NvxqByEY8YDwgqkZOtVvVqvCC3OQjbsMEbvvats4XBlBdfh3MOoG947WeAhYtndBKZw5V0JNQKMPhzsoplHOgor8sWpWAUz7w4MD_FzOpw' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'origin: https://kusama.polkassembly.io' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://kusama.polkassembly.io/referendum/114' \
  -H 'accept-language: en-US,en;q=0.9,hi;q=0.8,es;q=0.7,id;q=0.6,jv;q=0.5,de;q=0.4' \
  -H 'cookie: refresh_token=98345045-3599-4a67-8c23-00ced67dc15e' \
  --data-raw $'{"operationName":"ReferendumPostAndComments","variables":{"id":114},"query":"query ReferendumPostAndComments($id: Int\u0021) {\\n  posts(where: {onchain_link: {onchain_referendum_id: {_eq: $id}}}) {\\n    ...referendumPost\\n    __typename\\n  }\\n}\\n\\nfragment referendumPost on posts {\\n  author {\\n    ...authorFields\\n    __typename\\n  }\\n  content\\n  created_at\\n  id\\n  updated_at\\n  comments(order_by: {created_at: asc}) {\\n    ...commentFields\\n    __typename\\n  }\\n  onchain_link {\\n    ...onchainLinkReferendum\\n    __typename\\n  }\\n  title\\n  topic {\\n    id\\n    name\\n    __typename\\n  }\\n  type {\\n    id\\n    name\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment authorFields on User {\\n  id\\n  kusama_default_address\\n  polkadot_default_address\\n  username\\n  __typename\\n}\\n\\nfragment commentFields on comments {\\n  id\\n  author {\\n    ...authorFields\\n    __typename\\n  }\\n  content\\n  created_at\\n  updated_at\\n  __typename\\n}\\n\\nfragment onchainLinkReferendum on onchain_links {\\n  id\\n  proposer_address\\n  onchain_referendum_id\\n  onchain_referendum(where: {}) {\\n    id\\n    delay\\n    end\\n    voteThreshold\\n    referendumStatus(last: 1) {\\n      blockNumber {\\n        startDateTime\\n        number\\n        __typename\\n      }\\n      status\\n      id\\n      __typename\\n    }\\n    preimage {\\n      hash\\n      id\\n      metaDescription\\n      method\\n      preimageArguments {\\n        id\\n        name\\n        value\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n"}' \
  --compressed
  ```
 Provide referendum id in variables
  

Treasury Proposal
====
```
curl 'https://kusama.polkassembly.io/v1/graphql' \
  -H 'authority: kusama.polkassembly.io' \
  -H 'sec-ch-ua: "Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"' \
  -H 'accept: */*' \
  -H 'authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa2xhYmg4MTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1rdXNhbWEiOiJ7Q3dZQm5mb3hiMUI2ZmliZE1ONGpzMjFEUWVxZ2JxSGd3THdhY2ZLRmRDN3ZzeVosRWN3MmM5Q0FhZ3dGMzk1YzJ3TktSNWI2aFA4QWZxMTYzMnBCWm1ja3pmWk14R3gsRFlUd1VXazZQRHJYYkp4Q1NDU3VoSDJyMWJaSnBwck5kaGJHUWNEM3JDakxvNmcsR2g3NWJLVG9aNEdxczZQNWN5cHNLUGs0TmFRYWNtRnlBTnJWd1kxOFpRSHpna2J9IiwieC1oYXN1cmEta3VzYW1hLWRlZmF1bHQiOiJDd1lCbmZveGIxQjZmaWJkTU40anMyMURRZXFnYnFIZ3dMd2FjZktGZEM3dnN5WiIsIngtaGFzdXJhLXBvbGthZG90Ijoie30iLCJ4LWhhc3VyYS1wb2xrYWRvdC1kZWZhdWx0IjoiIiwieC1oYXN1cmEtdXNlci1lbWFpbCI6Im5pa2xhYmg4MTFAZ21haWwuY29tIiwieC1oYXN1cmEtdXNlci1pZCI6IjMifSwiaWF0IjoxNjIyNzE3MzM1LCJub3RpZmljYXRpb24iOnsibmV3UHJvcG9zYWwiOnRydWUsIm93blByb3Bvc2FsIjp0cnVlLCJwb3N0Q3JlYXRlZCI6dHJ1ZSwicG9zdFBhcnRpY2lwYXRlZCI6dHJ1ZX0sInN1YiI6IjMiLCJ1c2VybmFtZSI6Im5pa2xhYmgiLCJ3ZWIzc2lnbnVwIjpmYWxzZSwiZXhwIjoxNjIyNzIwOTM1fQ.Jq4r97pDDSeO-avNdzTmOT4fzzA2nrthoy8yYqqJbCDvfIOqI905sHkatUx4T-5_PbogRc4p4TYPEWaW2uAR6Tte29wSXyc2Zxfk8rzjN8kDZXjBVxKa_yP5QgK8Yqf5ShOgCeQEdf3R5yurybtzoq6asroPYmsAJt1RmwNwLrzA_AJq4BcSG_KejXgkUWICvVapaa0HAiw1UueypizI_sW_9XQo0h6qiGK8tCuWQ7-0NvxqByEY8YDwgqkZOtVvVqvCC3OQjbsMEbvvats4XBlBdfh3MOoG947WeAhYtndBKZw5V0JNQKMPhzsoplHOgor8sWpWAUz7w4MD_FzOpw' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'origin: https://kusama.polkassembly.io' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://kusama.polkassembly.io/treasury/76' \
  -H 'accept-language: en-US,en;q=0.9,hi;q=0.8,es;q=0.7,id;q=0.6,jv;q=0.5,de;q=0.4' \
  -H 'cookie: refresh_token=98345045-3599-4a67-8c23-00ced67dc15e' \
  --data-raw $'{"operationName":"TreasuryProposalPostAndComments","variables":{"id":76},"query":"query TreasuryProposalPostAndComments($id: Int\u0021) {\\n  posts(where: {onchain_link: {onchain_treasury_proposal_id: {_eq: $id}}}) {\\n    ...treasuryProposalPost\\n    __typename\\n  }\\n}\\n\\nfragment treasuryProposalPost on posts {\\n  author {\\n    ...authorFields\\n    __typename\\n  }\\n  content\\n  created_at\\n  id\\n  updated_at\\n  comments(order_by: {created_at: asc}) {\\n    ...commentFields\\n    __typename\\n  }\\n  onchain_link {\\n    ...onchainLinkTreasuryProposal\\n    __typename\\n  }\\n  title\\n  topic {\\n    id\\n    name\\n    __typename\\n  }\\n  type {\\n    id\\n    name\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment authorFields on User {\\n  id\\n  kusama_default_address\\n  polkadot_default_address\\n  username\\n  __typename\\n}\\n\\nfragment commentFields on comments {\\n  id\\n  author {\\n    ...authorFields\\n    __typename\\n  }\\n  content\\n  created_at\\n  updated_at\\n  __typename\\n}\\n\\nfragment onchainLinkTreasuryProposal on onchain_links {\\n  id\\n  proposer_address\\n  onchain_treasury_proposal_id\\n  onchain_motion_id\\n  onchain_treasury_spend_proposal(where: {}) {\\n    id\\n    beneficiary\\n    value\\n    bond\\n    treasuryStatus(last: 1) {\\n      id\\n      status\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n"}' \
  --compressed
  ```
  
  Provide proposal id in variables
