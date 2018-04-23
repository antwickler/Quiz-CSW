import axios from 'axios';

export const FETCH_COUNTS = 'fetch_counts';
const ROOT_URL = 'http://localhost/api/counts';

export function fetchCounts() {
    const request = axios.get(ROOT_URL);

    return {
        type: FETCH_COUNTS,
        payload: request
    };
}

