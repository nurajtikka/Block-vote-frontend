// eslint-disable-next-line import/no-extraneous-dependencies
import Axios, { AxiosInstance } from 'axios';

import votes from './votes/votes';
import { TVotesSVCEndpoints } from './votes/votes.types';

//  API base URL - Change this correctly
export const BASE_URL = 'http://192.168.8.187:3001/_svc/block-vote/api/v1';
// export const BASE_URL = 'http://localhost:3001/_svc/block-vote/api/v1';

//  API instance
let api: AxiosInstance = Axios.create({
    baseURL: 'uninitialized!',
});

export const initializeAxios = (): void => {
    api = Axios.create({
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, max-age=0, must-revalidate, no-store',
        },
    });
};

export const votesSVC = (): TVotesSVCEndpoints => votes(api);
