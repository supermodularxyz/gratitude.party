import type { HypercertMetadata } from "@hypercerts-org/sdk";
import { TransferRestrictions } from "@hypercerts-org/sdk";
import { useQuery } from "wagmi";
import hyperCertClient from "./useHypercert";
import type { QueryKey } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata: HypercertMetadata = {
  "name": "Rainforest Preservation Token",
  "description": "An ERC1155 token representing impact and work in the area of rainforest preservation.",
  "external_url": "https://rainforest-token.org",
  "image": "https://rainforest-token.org/token-image.png",
  "version": "1.0",
  "ref": "RFPT:123",
  "allowList": "QmWgWZX6A5MvTsnSuVPjbsNhH95PAjE46tMBdSURBrZjSQ",
  "properties": [
    {
      "trait_type": "Environmental",
      "value": "Rainforest Conservation"
    }
  ],
  "hypercert": {
    "impact_scope": {
      "name": "Biome",
      "value": ["Rainforest"],
      "display_value": "Rainforest"
    },
    "work_scope": {
      "name": "Conservation Activity",
      "value": ["Tree planting", "Wildlife protection"],
      "display_value": "Tree planting, Wildlife protection"
    },
    "work_timeframe": {
      "name": "Year",
      "value": [1672444800, 1703980800],
      "display_value": "2023-2024"
    },
    "impact_timeframe": {
      "name": "Year",
      "value": [1703980800, 1735516800],
      "display_value": "2024-2025"
    },
    "contributors": {
      "name": "Contributors",
      "value": ["Organization A", "Organization B"],
      "display_value": "Organization A, Organization B"
    },
    "rights": {
      "name": "Token holder benefits",
      "value": ["Voting rights", "Dividends"],
      "display_value": "Voting rights, Dividends"
    }
  }
}





const totalUnits = "10000";

const useMint = (metadata: HypercertMetadata) => {

  return useQuery('hypercerts' as unknown as QueryKey, () => hyperCertClient.mintClaim(
    metadata,
    totalUnits,
    TransferRestrictions.FromCreatorOnly,

  ))
} 


export default useMint;