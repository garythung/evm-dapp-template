import Axios from "axios";
import useSWR from "swr";

const api = Axios.create({
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// @ts-ignore
const fetcher = (url: string) => api.get(url).then((response) => response.data);

// Convenience for using useSWR.
export default function useGetter(
  url: string,
  shouldFetch: boolean,
): {
  data: any;
  mutate: any;
  error: any;
  isValidating: boolean;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, mutate, error, isValidating } = useSWR(
    shouldFetch ? url : null,
    fetcher,
  );

  return {
    data,
    mutate,
    error,
    isValidating,
    isLoading: !data && !error,
    isError: !!error,
  };
}
