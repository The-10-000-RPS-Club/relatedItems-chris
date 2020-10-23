import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  vus: 120,
  duration: '120s',
};
const url = 'http://localhost:3004/api/relatedItems/'
export default function () {
  const id = Math.floor(Math.random() * 10000000) + 1;
  const res = http.get(url + id);

  check(res, {
    "is status 200": (r) => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
  sleep(0.1);
};
