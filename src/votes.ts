import fetch from 'node-fetch';

const { prisma } = require('./generated/prisma-client');

const NETWORK = process.env.NETWORK;
const REFRENDUM_INDEX = process.env.REFRENDUM_INDEX;
const MOTION_INDEX = process.env.MOTION_INDEX;
const TECH_COMMITTEE_INDEX = process.env.TECH_COMMITTEE_INDEX;

if (!NETWORK || !Number(REFRENDUM_INDEX) || !Number(MOTION_INDEX) || !Number(TECH_COMMITTEE_INDEX)) {
	console.error("Please provide NETWORK, REFRENDUM_INDEX, MOTION_INDEX and TECH_COMMITTEE_INDEX environment variables");
	process.exit(1);
}

const wait = () => new Promise(r => {
	setTimeout(r, 1000)
});

async function start() {

	console.log('getting votes');

	for (let i = 0; i <= Number(REFRENDUM_INDEX); i++) {
		console.log(`processing ${i}`)
		await wait();

		const body = {
			"row": 100,
			"page": 0,
			"referendum_index": i
		};

		const result = await fetch(`https://${NETWORK}.webapi.subscan.io/api/scan/democracy/votes`, {
			"headers": {
				"accept": "application/json, text/plain, */*",
				"accept-language": "en",
				"content-type": "application/json;charset=UTF-8",
				"sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
				"sec-ch-ua-mobile": "?0",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site"
			},
			"body": JSON.stringify(body),
			"method": "POST",
		});

		const json = await result.json();

		console.log(JSON.stringify(json, null, 2));

		if (json.data?.list?.length) {
			json.data.list.forEach(async (row: any) => {
				const existing = await prisma.votes({
					where: {
						network: NETWORK,
						proposalType: 'referendum',
						proposalId: i,
						address: row.account?.address,
						vote: row.passed ? 'AYE' : 'NAY',
						amount: row.amount,
						conviction: row.conviction
					},
				});

				if (existing && existing.length) {
					return;
				}

				const r = await prisma.createVote({
					network: NETWORK,
					proposalType: 'referendum',
					proposalId: i,
					address: row.account?.address,
					addressDisplay: row.account?.display,
					vote: row.passed ? 'AYE' : 'NAY',
					amount: row.amount,
					conviction: row.conviction
				});
				console.log(r);
			})
		}
	}

	console.log('getting motions');

	for (let i = 0; i <= Number(MOTION_INDEX); i++) {
		console.log(`processing ${i}`)
		await wait();

		const body = {
			"proposal_id":i
		};

		const result = await fetch(`https://${NETWORK}.webapi.subscan.io/api/scan/council/proposal`, {
			"headers": {
				"accept": "application/json, text/plain, */*",
				"accept-language": "en",
				"content-type": "application/json;charset=UTF-8",
				"sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
				"sec-ch-ua-mobile": "?0",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site"
			},
			"body": JSON.stringify(body),
			"method": "POST",
		});

		const json = await result.json();

		if (json.data?.info?.votes?.length) {
			json.data?.info?.votes.forEach(async (row: any) => {
				const existing = await prisma.votes({
					where: {
						network: NETWORK,
						proposalType: 'motion',
						proposalId: i,
						address: row.account?.address,
						vote: row.passed ? 'AYE' : 'NAY'
					},
				});

				if (existing && existing.length) {
					return;
				}

				const r = await prisma.createVote({
					network: NETWORK,
					proposalType: 'motion',
					proposalId: i,
					address: row.account?.address,
					addressDisplay: row.account?.display,
					vote: row.passed ? 'AYE' : 'NAY'
				});
				console.log(r);
			})
		}
	}

	for (let i = 0; i <= Number(TECH_COMMITTEE_INDEX); i++) {

		const body = {proposal_id: i};

		const result = await fetch(`https://${NETWORK}.webapi.subscan.io/api/scan/techcomm/proposal`, {
			"headers": {
				"accept": "application/json, text/plain, */*",
				"accept-language": "en",
				"content-type": "application/json;charset=UTF-8",
				"sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
				"sec-ch-ua-mobile": "?0",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site"
			},
			"body":  JSON.stringify(body),
			"method": "POST"
		});

		const json = await result.json();

		if (json.data?.info?.votes?.length) {
			json.data?.info?.votes.forEach(async (row: any) => {
				const existing = await prisma.votes({
					where: {
						network: NETWORK,
						proposalType: 'tech_committee_proposal',
						proposalId: i,
						address: row.account?.address,
						vote: row.passed ? 'AYE' : 'NAY'
					},
				});

				if (existing && existing.length) {
					return;
				}

				const r = await prisma.createVote({
					network: NETWORK,
					proposalType: 'tech_committee_proposal',
					proposalId: i,
					address: row.account?.address,
					addressDisplay: row.account?.display,
					vote: row.passed ? 'AYE' : 'NAY'
				});
				console.log(r);
			})
		}
	}
}

start().catch(console.error)


