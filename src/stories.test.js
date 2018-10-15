import {transformURL, transformTime} from './stories';

it('#transformURL returns the transformed URL as hostname', () => {
  const expectedValue = 'www.google.com';
  const actualValue = transformURL('https://www.google.com/something?q=fdbjdgbig7');

  expect(actualValue).toEqual(expectedValue);
});

it('#transformURL returns original URL if parsing fails', () => {
  const expectedValue = 's\'ad93j40fds-fj3-49t4-39j';
  const actualValue = transformURL(expectedValue);

  expect(actualValue).toEqual(expectedValue);
});

it('#transformTime returns the transformed time from now since given time', () => {
  const expectedValue = 'an hour ago';
  const actualValue = transformTime((new Date()).getTime() - 3600 * 1000);

  expect(actualValue).toEqual(expectedValue);
});

