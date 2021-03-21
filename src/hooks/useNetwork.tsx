import { useCallback, useEffect, useState } from 'react';

import axios, { CancelTokenSource } from 'axios';

import { HPBEndpoint } from '../networking/hpb-endpoint';

const BASE_URL = 'https://8x6i7fbaae.execute-api.us-east-1.amazonaws.com/dev';

interface NetworkOptions {
  search?: string;
  slug?: string;
  byAuthor?: string[];
  page?: string;
}

interface Props {
  endpoint: HPBEndpoint;
  options?: NetworkOptions;
}

let token: CancelTokenSource;
export function useNetwork<T>(props: Props) {
  const { endpoint, options } = props;

  const [response, setResponse] = useState<T>(undefined);
  const [searchText, setSearchText] = useState<string>(options.search ?? '');
  const [loading, setLoading] = useState<boolean>(false);

  const updateSearch = (search: string) => {
    setSearchText(search);
  };

  const updateLoading = (condition: boolean) => {
    setLoading(condition);
  };

  const networkParams = useCallback(() => {
    let path: string;
    let config = {};
    if (endpoint === 'product') {
      path = '/' + endpoint;
      config = { ...config, params: { slug: options.slug ?? '' } };
      return { path: path, config: config };
    } else {
      path = '/search/' + endpoint;
      config = {
        ...config,
        params: { search: searchText },
        cancelToken: token.token,
      };
      return {
        path: path,
        config: config,
      };
    }
  }, [endpoint, searchText, options]);

  useEffect(
    () => {
      if (typeof token !== typeof undefined) {
        token.cancel('Operation canceled');
      }

      token = axios.CancelToken.source();

      axios
        .get(BASE_URL + networkParams().path, networkParams().config)
        .then((res) => {
          setResponse(res.data as T);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (axios.isCancel(error)) {
            return { cancelPreviousQuery: true };
          }
          console.log(error);
        });
    },
    [searchText], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return {
    response: response,
    isLoading: loading,
    setIsLoading: updateLoading,
    updateSearch: updateSearch,
  };
}
