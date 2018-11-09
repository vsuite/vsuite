import formatColumns from './formatColumns';

describe('@formatColumns', () => {
  // title is required
  it('`title`', () => {
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

  // key
  it('`key`', () => {
    expect(formatColumns([{ title: 'title1' }])).toMatchObject([
      { title: 'title1', key: null },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          key: 'key1',
          children: [{ title: 'title11', key: 'key11' }, { title: 'title12' }],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        key: 'key1',
        children: [
          { title: 'title11', key: 'key11' },
          { title: 'title12', key: null },
        ],
      },
    ]);
  });

  // width
  it('`width`', () => {
    expect(() => formatColumns([{ title: 'title1', width: 0 }])).toThrowError(
      '[Table] COLUMN 0: `width` cannot smaller than zero'
    );

    expect(() =>
      formatColumns([{ title: 'title1', minWidth: 0 }])
    ).toThrowError('[Table] COLUMN 0: `minWidth` cannot smaller than zero');

    expect(() =>
      formatColumns([{ title: 'title1', maxWidth: 0 }])
    ).toThrowError('[Table] COLUMN 0: `maxWidth` cannot smaller than zero');

    expect(formatColumns([{ title: 'title1', width: 200 }])).toMatchObject([
      { title: 'title1', key: null, width: 200 },
    ]);

    expect(formatColumns([{ title: 'title1', minWidth: 200 }])).toMatchObject([
      { title: 'title1', key: null, minWidth: 200 },
    ]);

    expect(formatColumns([{ title: 'title1', maxWidth: 200 }])).toMatchObject([
      { title: 'title1', key: null, maxWidth: 200 },
    ]);

    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       children: [{ title: 'title11' }, { title: 'title12' }],
    //     },
    //   ])
    // );
    //
    // // width
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       children: [{ title: 'title11', width: 100 }, { title: 'title12' }],
    //     },
    //   ])
    // );
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       children: [
    //         { title: 'title11', width: 100 },
    //         { title: 'title12', width: 100 },
    //       ],
    //     },
    //   ])
    // );
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       width: 100,
    //       children: [
    //         { title: 'title11', width: 100 },
    //         { title: 'title12', width: 100 },
    //       ],
    //     },
    //   ])
    // );
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       width: 300,
    //       children: [
    //         { title: 'title11', width: 100 },
    //         { title: 'title12', width: 100 },
    //       ],
    //     },
    //   ])
    // );
    //
    // // minWidth
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       children: [{ title: 'title11', minWidth: 100 }, { title: 'title12' }],
    //     },
    //   ])
    // );
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       children: [
    //         { title: 'title11', minWidth: 100 },
    //         { title: 'title12', minWidth: 100 },
    //       ],
    //     },
    //   ])
    // );
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       minWidth: 100,
    //       children: [
    //         { title: 'title11', minWidth: 100 },
    //         { title: 'title12', minWidth: 100 },
    //       ],
    //     },
    //   ])
    // );
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       minWidth: 300,
    //       children: [
    //         { title: 'title11', minWidth: 100 },
    //         { title: 'title12', minWidth: 100 },
    //       ],
    //     },
    //   ])
    // );
    //
    // // maxWidth
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       children: [{ title: 'title11', maxWidth: 100 }, { title: 'title12' }],
    //     },
    //   ])
    // );
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       children: [
    //         { title: 'title11', maxWidth: 100 },
    //         { title: 'title12', maxWidth: 100 },
    //       ],
    //     },
    //   ])
    // );
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       maxWidth: 100,
    //       children: [
    //         { title: 'title11', maxWidth: 100 },
    //         { title: 'title12', maxWidth: 100 },
    //       ],
    //     },
    //   ])
    // );
    // expect(
    //   formatColumns([
    //     {
    //       title: 'title1',
    //       maxWidth: 300,
    //       children: [
    //         { title: 'title11', maxWidth: 100 },
    //         { title: 'title12', maxWidth: 100 },
    //       ],
    //     },
    //   ])
    // );
  });

  // min-width

  // max-width
});
