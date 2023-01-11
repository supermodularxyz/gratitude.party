import { NFTStorage } from "nft.storage";

export const ipfsClient = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY as string,
});
