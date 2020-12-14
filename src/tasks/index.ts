

import createBlockNumber from './createBlockNumber';
import createCouncil from './createCouncil';
import createMotion from './createMotion';
import createMotionStatus from './createMotionStatus';
import createPreimage from './createPreimage';
import createProposal from './createProposal';
import createProposalStatus from './createProposalStatus';
import createReferendum from './createReferendum';
import createReferendumStatus from './createReferendumStatus';
import createTip from './createTip';
import createTipStatus from './createTipStatus';
import createBounty from './createBounty';
import createBountyStatus from './createBountyStatus';
import createTreasury from './createTreasury';
import { NomidotTask } from './types';

// N.B. Order of tasks matters here
export const tasks: NomidotTask[] = [
  createBlockNumber,
  createCouncil,
  createPreimage,
  createProposal,
  createProposalStatus,
  createReferendum,
  createReferendumStatus,
  createMotion,
  createMotionStatus,
  createTreasury,
  createTip,
  createTipStatus,
  createBounty,
  createBountyStatus
];
