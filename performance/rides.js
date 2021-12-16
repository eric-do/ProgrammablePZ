import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // below normal load
    { duration: '1m', target: 200 },
    { duration: '1m', target: 400 }, // normal load
    { duration: '1m', target: 600 },
    { duration: '1m', target: 800 }, // around the breaking point
    { duration: '1m', target: 1000 }
  ],
};

export default function () {
  http.get('http://localhost:3001/api/rides');
  sleep(1);
}
