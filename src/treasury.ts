// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import { stringToU8a } from '@polkadot/util';

// Construct

async function start() {
	const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');
	const api = await ApiPromise.create({
		provider: wsProvider
	});

	await api.isReady;

	const balance = await api.derive.balances?.account("F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29");

	console.log(balance.freeBalance.toString());
}

start().catch(console.error);
