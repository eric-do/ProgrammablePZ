// run with 'k6 run rides_stress_test.js'
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // below normal load
    { duration: '1m', target: 500 },
    // { duration: '1m', target: 1000 }, // normal load
    // { duration: '1m', target: 2000 },
    // { duration: '1m', target: 2500 }, // around the breaking point
  ],
};

export default function () {
  http.get('http://54.183.79.150/api/rides');
  sleep(1);
}
