#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <contract_address>"
  exit 1
fi

CONTRACT_ADDR="$1"
RPC_URL="http://localhost:8547"
PRIVATE_KEY="0xb6b15c8cb491557369f3c7d2c287b053eb229daa9c22138887752191c9520659"

echo "Sending createCampaign..."
cast send "$CONTRACT_ADDR" \
  "createCampaign(string,uint256,uint256,uint8,uint8[])(uint256)" \
  "My voting campaign" 0 1 3 \
  "[6, 29, 99, 62, 224, 50, 233, 244, 165, 46, 163, 252, 242, 68, 252, 222, 162, 20, 139, 1, 82, 29, 192, 106, 222, 36, 58, 235, 131, 38, 121, 61]" \
  --private-key "$PRIVATE_KEY" \
  --rpc-url "$RPC_URL" \
  --verbosity

echo "Sending vote..."
cast send "$CONTRACT_ADDR" \
  "vote(bytes[],uint256)" \
  "["0x9c710e4d5f0ca9bf31c3c02cac4b4720e3c954dd53bf63062a67ac08f036ad1216ef3204e13f5714fc8a6f52a95ee6a9e05ec1ceab63ac031fc49b3cdf1d1a51", \
     "0xf2f11dff3e60b4b8f820d81069aab42a3ad84ab08b41549d66d939f2fa1d9906ee8467b975e9da1a772fe1095f74effd2197524ecaeffe74c8c25c3769399746", \
     "0x407236239dfe29bf5206bcf5167bf834d4b5ddc9e56758ca059fbea84fc3c8580e9ab43cf3725a84bcd004d99a2b56aa40d42223b3fdb51eb089db529dba0a47", \
     "0x1e13f6a39ceaf51ed5bd1589774a4508b3a0acaa60949e966ad00add538a053fa0f75d94afdcfb546aae5e37723bf52b6142e30b204189fef00907e2581cdc55", \
     "0xee444f636c51d8651bfda56d14266167ce0cc9998fed3bce073139947af1921bc00b58eeb72c0bc14ad429670cf8609445baf6c3e3667dad23f6d03c7866f471"]" \
  0 \
  --private-key "$PRIVATE_KEY" \
  --rpc-url "$RPC_URL" \
  --verbosity

echo "Calling getCampaignDescription..."
cast call "$CONTRACT_ADDR" \
  "getCampaignDescription(uint256)(string)" \
  0 \
  --rpc-url "$RPC_URL"

