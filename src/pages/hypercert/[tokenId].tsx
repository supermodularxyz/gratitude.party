// /* eslint-disable @typescript-eslint/no-unused-vars */
// import type { NextPage } from "next";
// import React from "react";
// import { Layout } from "../../layouts/Layout";
// import { useRouter } from "next/router";
// import { useQuery } from "@tanstack/react-query";
// import hyperCertClient from "../../hooks/useHypercert";
// import { OpenSeaButton } from "../../components/OpenSeaButton";
// import { TweetButton } from "../../components/TweetButton";
// import Image from "next/image";
// import { config } from "../../components/HyperCertSVG";

// const HyperCert: NextPage = () => {
//   const router = useRouter();
//   const claimId = router.query.tokenId as string;

//   const tokenId = claimId?.split("-")[1];
//   const { data: cert, isLoading, isSuccess } = useQuery(["claimById", claimId], () =>
//     hyperCertClient.indexer.claimById(claimId)
//   );

//   const { data: metadata, isLoading: isMetadataLoading } = useQuery(
//     ["metadata", cert?.claim?.uri],
//     () => hyperCertClient.storage.getMetadata(cert?.claim?.uri as string),
//       {enabled: isSuccess},
    
//   );

//   if (isLoading) {
//     return null;
//   }

//   return (
//     <Layout>
//       <div className="mb-16 h-auto w-full">
//         {cert?.claim?.uri ? (
//           <Image
//             width={config.width}
//             height={config.height}
//             src={cert.claim.uri}
//             alt="Hypercert"
//           />
//         ) : (
//           <div
//             className="animate-pulse bg-gray-200"
//             style={{ height: config.height }}
//           />
//         )}
//       </div>
//       <div className="flex flex-col items-center gap-1">
//         <OpenSeaButton tokenId={tokenId} />
//         <TweetButton text={cert?.claim as string} tokenId={tokenId} />
//       </div>
//     </Layout>
//   );
// };

// export default HyperCert;


export default function HyperCert() {
  return (
    <div>
        I will be working on this     
    </div>
  )
}