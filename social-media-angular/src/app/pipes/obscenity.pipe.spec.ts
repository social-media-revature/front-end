import { ObscenityPipe } from './obscenity.pipe';

describe('ObscenityPipe', () => {
  it('create an instance', () => {
    const pipe = new ObscenityPipe();
    expect(pipe).toBeTruthy();
  });

  it('pipe should replace curse words with empty string', () => {
    const damnTransform = 'damn right';
    const pipe = new ObscenityPipe();
    const result = pipe.transform(damnTransform);
    expect(result)
    .withContext('should replace damn with empty string')
    .toBe(' right');
  });

  it('pipe should only replace standalone curse words and not anywhere string matches', () => {
  const classyTransform = 'classy ass';
  const pipe = new ObscenityPipe();
  const result = pipe.transform(classyTransform);
  expect(result)
  .withContext('should transform "classy ass" to "classy "')
  .toBe('classy ');
  });

  it('pipe should detect curse words with alternative spellings', () => {
    const a55Transform = 'a55';
    const pipe = new ObscenityPipe();
    const result = pipe.transform(a55Transform);
    expect(result)
    .withContext('should replace a55 with empty string')
    .toBe('');
  });

});
