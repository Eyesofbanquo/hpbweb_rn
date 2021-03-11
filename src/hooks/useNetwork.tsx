import React, { useEffect, useState } from 'react';

import axios from 'axios';

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

export function useNetwork<T>(props: Props) {
  const [response, setResponse] = useState<T[]>([]);
  const { endpoint, options } = props;

  let path: string;

  if (endpoint === 'product') {
    path = '/' + endpoint;
  } else {
    path = '/search/' + endpoint;
  }

  useEffect(
    () => {
      axios
        .get(BASE_URL + path, {
          params: { search: options.search },
        })
        .then((res) => {
          setResponse(res.data as T[]);
        })
        .catch((error) => console.log(error));
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return {
    response: response,
  };
}
