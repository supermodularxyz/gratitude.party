import type { HypercertMetadata } from "@hypercerts-org/hypercerts-sdk";
import { claimById, getMetadata } from "@hypercerts-org/hypercerts-sdk";
import { useQuery } from "wagmi";

export const useHypercert = (claimId: string) => {
  return useQuery(
    ["certs", claimId],
    () =>
      claimById(claimId).then((r) =>
        getMetadata(r.claim?.uri as string).then(
          (metadata: HypercertMetadata) => ({ ...r.claim, metadata })
        )
      ),
    { enabled: Boolean(claimId) }
  );
};
