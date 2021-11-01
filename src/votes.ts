import fetch from 'node-fetch';

const { prisma } = require('./generated/prisma-client');

const NETWORK = process.env.NETWORK;
let REFRENDUM_INDEX = process.env.REFRENDUM_INDEX;
let MOTION_INDEX = process.env.MOTION_INDEX;
let TECH_COMMITTEE_INDEX = process.env.TECH_COMMITTEE_INDEX;

const wait = () => new Promise(r => {
	setTimeout(r, 1000)
});

async function start() {

	console.log('getting votes');

	const indexResult = await fetch(`https://${NETWORK}.webapi.subscan.io/api/scan/democracy/referendums`, {
		"headers": {
			"accept": "application/json, text/plain, */*",
			"accept-language": "en",
			"cache-control": "no-cache",
			"content-type": "application/json;charset=UTF-8",
			"pragma": "no-cache",
			"sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
			"sec-ch-ua-mobile": "?0",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site"
		},
		"body": "{\"row\":25,\"page\":0}",
		"method": "POST",
	});

	const index = await indexResult.json();

	if (index.data?.list[0]?.referendum_index) {
		REFRENDUM_INDEX = index.data?.list[0]?.referendum_index;
	}

	const lastRefs = await prisma.votes({
		where: {
			network: NETWORK,
			proposalType: 'referendum',
		},
		last: 1
	});

	for (let i = lastRefs[0]?.proposalId || 0; i <= Number(REFRENDUM_INDEX); i++) {
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

	const motionIndexResult = await fetch(`https://${NETWORK}.webapi.subscan.io/api/scan/council/proposals`, {
		"headers": {
			"accept": "application/json, text/plain, */*",
			"accept-language": "en",
			"cache-control": "no-cache",
			"content-type": "application/json;charset=UTF-8",
			"pragma": "no-cache",
			"sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
			"sec-ch-ua-mobile": "?0",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site"
		},
		"body": "{\"row\":25,\"page\":0}",
		"method": "POST",
	});

	const motionIndex = await motionIndexResult.json();

	if (motionIndex.data?.list[0]?.proposal_id) {
		MOTION_INDEX = motionIndex.data?.list[0]?.proposal_id;
	}

	const lastMotion = await prisma.votes({
		where: {
			network: NETWORK,
			proposalType: 'motion',
		},
		last: 1
	});

	for (let i = lastMotion[0]?.proposalId || 0; i <= Number(MOTION_INDEX); i++) {
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

	const tectIndexResult = await fetch(`https://${NETWORK}.webapi.subscan.io/api/scan/techcomm/proposals`, {
		"headers": {
			"accept": "application/json, text/plain, */*",
			"accept-language": "en",
			"cache-control": "no-cache",
			"content-type": "application/json;charset=UTF-8",
			"pragma": "no-cache",
			"sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
			"sec-ch-ua-mobile": "?0",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site"
		},
		"body": "{\"row\":25,\"page\":0}",
		"method": "POST"
	});

	const techIndex = await tectIndexResult.json();

	if (techIndex.data?.list[0]?.proposal_id) {
		TECH_COMMITTEE_INDEX = techIndex.data?.list[0]?.proposal_id;
	}

	const lastTech = await prisma.votes({
		where: {
			network: NETWORK,
			proposalType: 'tech_committee_proposal',
		},
		last: 1
	});

	for (let i = lastTech[0]?.proposalId || 0; i <= Number(TECH_COMMITTEE_INDEX); i++) {

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


