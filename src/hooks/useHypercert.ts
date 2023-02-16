import { claimById, getData } from "@hypercerts-org/hypercerts-sdk";
import { useQuery } from "wagmi";

export const useHypercert = (claimId: string) => {
  return useQuery(
    ["certs", claimId],
    () =>
      claimById(claimId).then((r) =>
        getData(r.claim?.uri as string).then((metadata) => ({
          ...r.claim,
          metadata,
        }))
      ),
    { enabled: Boolean(claimId) }
  );
};
