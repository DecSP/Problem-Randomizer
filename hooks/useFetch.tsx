import { useEffect, useState } from 'react';
import useSWR, { Key } from 'swr';
import { Fetcher, SWRConfiguration } from 'swr/core/dist';

function useFetch<Data = any, Error = any>(
  fn: Fetcher<Data> | null = null,
  key: Key,
  config?: SWRConfiguration<Data, Error>,
) {
  const { data, error, ...rest } = useSWR<Data, Error>(key, fn, config);
  const [internalData, setInternalData] = useState<Data>();

  const isFirstLoading = !internalData && !error;
  const loading = !data && !error;

  useEffect(() => {
    if (data) {
      setInternalData(data);
    }
  }, [data]);

  return { data: internalData, isFirstLoading, loading, error, ...rest };
}

export default useFetch;
