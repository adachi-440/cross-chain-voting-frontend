![logo](docs/mitsuha_logo.png)

# Mitsuba - Cross Chain Voting System

## Summary

Mitsuba is a gasless & cross-chain voting system.
Messaging allows voting from multiple chains to be combined into a single proposal.

## Problem

Today, many applications are supported by multiple chains.However, you can only vote in a limited chain or in a centralized way.
Even if multiple chains are supported, some users do not have native tokens and cannot vote.

## Solution

Develop an omnichain voting system that allows voting from any chain.
When a user casts a vote, the vote is sent to the chain that submitted the proposal using messaging.

The gasless system eliminates the need to have tokens for gas.

Also, this token adopts Omni Chain FT (OFT) proposed by LayerZero. Therefore, it is easy to move assets, and the UX of cross-chain governance is improved.


## User Flow

1. Create new proposals
2. Mint multiple chains of tokens for voting
3. Stake token
4. Vote(Gasless)
5. Proposals are tabulated using messaging

## Demo site

https://cross-chain-voting-frontend.vercel.app

## Demo video

https://www.youtube.com/watch?v=pDM4ci3XoFk&feature=youtu.be

## FutureWork
In the furure we try to Integrate more messaging protocols.
Select and execute the best messaging protocol by comparing by gas cost, transaction speed, etc.
