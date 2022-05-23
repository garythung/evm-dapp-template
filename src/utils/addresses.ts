import { getAddress } from "@ethersproject/address";

/**
 * Returns the checksummed version of an address, or empty string if its invalid.
 *
 * @param value - The address to be checked.
 * @returns The checksummed address or empty string if its invalid.
 */
export const isAddress = (value: string): string => {
  try {
    return getAddress(value);
  } catch {
    return "";
  }
};

/**
 * Returns a shortened version of a 0x prefixed hex address.
 *
 * @param address - The address to shorten.
 * @param startChars - The number of characters to show at the start of the address.
 * @param endChars - The number of characters to show at the end of the address.
 * @returns The shortened address.
 */
export const shortenAddress = (
  address: string,
  startChars: number = 2,
  endChars: number = 4,
) => {
  const checksummed = isAddress(address);
  if (!checksummed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  // 2 at start, 4 at end. startChars + 2 is to remove "0x."
  return `${checksummed.substring(0, startChars + 2)}...${checksummed.substring(
    42 - endChars,
  )}`;
};
