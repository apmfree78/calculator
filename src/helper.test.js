import { calcAnswer } from './helper.js';

it('2+2=4', () => {
  const answer = calcAnswer('2+2');
  expect(answer).toBe(4);
});

it('5*5=25', () => {
  const answer = calcAnswer('5*5');
  expect(answer).toBe(25);
});

it('5*5+2/2+4*2*2-20=22', () => {
  const answer = calcAnswer('5*5+2/2+4*2*2-20');
  expect(answer).toBe(22);
});

it('sin0=0', () => {
  const answer = calcAnswer('sin0');
  expect(answer).toBe(0);
});

it('cos0=1', () => {
  const answer = calcAnswer('cos0');
  expect(answer).toBe(1);
});

it('1+(1+(1+(1+1)))=5', () => {
  const answer = calcAnswer('1+(1+(1+(1+1)))');
  expect(answer).toBe(5);
});

it('2^5=32', () => {
  const answer = calcAnswer('2^5');
  expect(answer).toBe(32);
});
