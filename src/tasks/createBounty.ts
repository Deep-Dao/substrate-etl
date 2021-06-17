

import { ApiPromise } from '@polkadot/api';
import { Option } from '@polkadot/types';
import {
  BlockNumber,
  Hash,
  Bounty,
} from '@polkadot/types/interfaces';
import { hexToString, logger } from '@polkadot/util';

import { prisma } from '../generated/prisma-client';
import { filterEvents } from '../util/filterEvents';
import { bountyStatus } from '../util/statuses';
import {
  Cached,
  NomidotBounty,
  Task,
  NomidotBountyRawEvent,
} from './types';

const l = logger('Task: Bounty');
const network = process.env.NETWORK;

/*
 *  ======= Table (Bounty) ======
 */
const createBounty: Task<NomidotBounty[]> = {
  name: 'createBounty',
  read: async (
    blockHash: Hash,
    cached: Cached,
    api: ApiPromise
  ): Promise<NomidotBounty[]> => {
    const { events } = cached;

    const bountyEvents = filterEvents(
      events,
      'treasury',
      'BountyProposed'
    );

    const results: NomidotBounty[] = [];

    await Promise.all(
		bountyEvents.map(async ({ event: { data, typeDef } }) => {

		const bountyRawEvent: NomidotBountyRawEvent = data.reduce(
			(prev, curr, index) => {
			  const type = typeDef[index].type;

			  return {
				...prev,
				[type]: curr.toJSON(),
			  };
			},
			{}
		);

		if (
			!bountyRawEvent.BountyIndex &&
			bountyRawEvent.BountyIndex !== 0
		) {
			l.error(
				`Expected BountyIndex missing in the event: ${bountyRawEvent.BountyIndex}`
			);
			return null;
		}

		const bountyRaw: Option<Bounty> = await api.query.treasury.bounties.at(
			blockHash,
			bountyRawEvent.BountyIndex
		);

		if (bountyRaw.isNone) {
			l.error('Expected data missing in bountyRaw');
			return null;
		}

		const bounty = bountyRaw.unwrap();
		const result: NomidotBounty = {
			bountyId: bountyRawEvent.BountyIndex,
			proposer: bounty.proposer,
			value: bounty.value,
			fee: bounty.fee,
			curatorDeposit: bounty.curatorDeposit,
			bond: bounty.bond,
			status: bountyStatus.PROPOSED,
		};

        l.log(`Nomidot Bounty: ${JSON.stringify(result)}`);

        results.push(result);
      })
    );

    return results;
  },
  write: async (blockNumber: BlockNumber, value: NomidotBounty[]) => {
	await Promise.all(
		value.map(async prop => {
		  const {
			bountyId,
			proposer,
			value,
			fee,
			curatorDeposit,
			bond,
			status,
		  } = prop;

		  await prisma.createBounty({
			network,
			bountyId,
			proposer: proposer.toString(),
			value: value.toString(),
			bond: bond.toString(),
			fee: fee.toString(),
			curatorDeposit: curatorDeposit.toString(),
			bountyStatus: {
			  create: {
				blockNumber: {
				  connect: {
					number: blockNumber.toNumber(),
				  },
				},
				status,
				uniqueStatus: `${bountyId}_${status}`,
			  },
			},
		  });
		})
	  );
  },
};

export default createBounty;
