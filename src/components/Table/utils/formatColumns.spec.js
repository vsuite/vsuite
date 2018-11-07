import formatColumns from './formatColumns';

describe('@formatColumns', () => {
  it('.title', () => {
    expect(() => formatColumns([{}, { title: 'title2' }])).toThrowError(
      '[Table] COLUMN 0: `title` is required'
    );

    expect(() => formatColumns([{ title: '' }, {}])).toThrowError(
      '[Table] COLUMN 1: `title` is required'
    );

    expect(() =>
      formatColumns([{ title: 'title1', children: [{}] }])
    ).toThrowError('[Table] COLUMN 0: `title` is required');
  });
});
