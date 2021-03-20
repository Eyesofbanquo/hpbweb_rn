import { useState, useEffect } from 'react';

import axios from 'axios';

export interface BookImageServiceProps {
  hpb: string;
  alibris: string;
  missing: 'https://books.images.hpb.com/missing.png';
}

const BASE_URL = `https://aiief0969h.execute-api.us-east-1.amazonaws.com/default/isbn/`;

export const useBookImageService = (upc: string) => {
  const [response, setResponse] = useState<BookImageServiceProps>();

  useEffect(() => {
    axios.get(BASE_URL + upc).then((res) => {
      setResponse(res.data as BookImageServiceProps);
    });
  }, [upc]);

  return {
    response,
  };
};
