![logo](docs/mitsuha_logo.png)

# Mitsuha - Cross Chain Voting System

## Summary

Mitsuha is a cross-chain voting system.
Messaging allows voting from multiple chains to be combined into a single proposal.

## Problem

While many protocols these days are multi-chain deployments, the ability to vote is often limited to one chain. This requires bridging assets to that chain in order to vote, compromising the UX; some products support multiple chains on the web, but the data cannot be managed on-chain and is not well decentralized.

## Solution

Develop an omnichain voting system that allows voting from any chain.
When a user casts a vote, the vote is sent to the chain that submitted the proposal using messaging.

Also, this token adopts Omni Chain FT (OFT) proposed by LayerZero. Therefore, it is easy to move assets, and the UX of cross-chain governance is improved.

## User Flow

1. Create new proposals
2. Mint multiple chains of tokens for voting
3. Stake token
4. Vote
5. Proposals are tabulated using messaging

## Demo site

https://cross-chain-voting-frontend.vercel.app

## Demo video

https://www.youtube.com/watch?v=pDM4ci3XoFk&feature=youtu.be
