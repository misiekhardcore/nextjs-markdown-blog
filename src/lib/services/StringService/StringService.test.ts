import { StringService } from './StringService';

it('should join array of strings', () => {
  const joined = StringService.stringArrayToString(['one', 'two', 'three']);
  expect(joined).toEqual('one two three');
});

it('should join array of strings with custom separator', () => {
  const joined = StringService.stringArrayToString(['one', 'two', 'three'], ',');
  expect(joined).toEqual('one,two,three');
});

it('should join array of strings with undefined values', () => {
  const joined = StringService.stringArrayToString(['one', undefined, 'three']);
  expect(joined).toEqual('one three');
});

it('should convert string to slug', () => {
  const slug = StringService.stringToSlug('Some string with spaces');
  expect(slug).toEqual('some-string-with-spaces');

  const complexSlug = StringService.stringToSlug(
    '!@#$%^&*()_+/|\\   -some string with spaces and and special 1234567890'
  );
  expect(complexSlug).toEqual('some-string-with-spaces-and-and-special-1234567890');
});
