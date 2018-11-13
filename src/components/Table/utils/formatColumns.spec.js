import formatColumns from './formatColumns';
import { CELL_MINI_WIDTH } from '../constants';

describe('@formatColumns', () => {
  // title
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

  // width, minWidth and maxWidth
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

    expect(() =>
      formatColumns([{ title: 'title1', minWidth: 300, maxWidth: 100 }])
    ).toThrowError(
      '[Table] COLUMN 0: `maxWidth` cannot smaller than `minWidth`'
    );

    expect(formatColumns([{ title: 'title1', width: 200 }])).toMatchObject([
      { title: 'title1', minWidth: 200, width: 200, maxWidth: 200 },
    ]);

    expect(formatColumns([{ title: 'title1', minWidth: 200 }])).toMatchObject([
      {
        title: 'title1',
        minWidth: 200,
        width: null,
        maxWidth: Infinity,
      },
    ]);

    expect(formatColumns([{ title: 'title1', maxWidth: 200 }])).toMatchObject([
      {
        title: 'title1',
        minWidth: CELL_MINI_WIDTH,
        width: null,
        maxWidth: 200,
      },
    ]);

    expect(
      formatColumns([{ title: 'title1', minWidth: 200, maxWidth: 200 }])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 200,
        width: 200,
        maxWidth: 200,
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          children: [{ title: 'title11' }, { title: 'title12' }],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: CELL_MINI_WIDTH * 2,
        width: null,
        maxWidth: Infinity,
        children: [
          {
            title: 'title11',
            minWidth: CELL_MINI_WIDTH,
            width: null,
            maxWidth: Infinity,
          },
          {
            title: 'title12',
            minWidth: CELL_MINI_WIDTH,
            width: null,
            maxWidth: Infinity,
          },
        ],
      },
    ]);

    // minWidth
    expect(
      formatColumns([
        {
          title: 'title1',
          children: [{ title: 'title11', minWidth: 100 }, { title: 'title12' }],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 100 + CELL_MINI_WIDTH,
        children: [
          { title: 'title11', minWidth: 100 },
          { title: 'title12', minWidth: CELL_MINI_WIDTH },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          children: [
            { title: 'title11', minWidth: 100 },
            { title: 'title12', minWidth: 100 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 200,
        children: [
          { title: 'title11', minWidth: 100 },
          { title: 'title12', minWidth: 100 },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          minWidth: 100,
          children: [
            { title: 'title11', minWidth: 100 },
            { title: 'title12', minWidth: 100 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 200,
        children: [
          { title: 'title11', minWidth: 100 },
          { title: 'title12', minWidth: 100 },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          minWidth: 300,
          children: [
            { title: 'title11', minWidth: 100 },
            { title: 'title12', minWidth: 100 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 300,
        children: [
          { title: 'title11', minWidth: 100 },
          { title: 'title12', minWidth: 100 },
        ],
      },
    ]);

    // maxWidth
    expect(
      formatColumns([
        {
          title: 'title1',
          children: [{ title: 'title11', maxWidth: 400 }, { title: 'title12' }],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        maxWidth: Infinity,
        children: [
          { title: 'title11', maxWidth: 400 },
          { title: 'title12', maxWidth: Infinity },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          children: [
            { title: 'title11', maxWidth: 400 },
            { title: 'title12', maxWidth: 400 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        maxWidth: 800,
        children: [
          { title: 'title11', maxWidth: 400 },
          { title: 'title12', maxWidth: 400 },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          maxWidth: 400,
          children: [
            { title: 'title11', maxWidth: 400 },
            { title: 'title12', maxWidth: 400 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        maxWidth: 400,
        children: [
          { title: 'title11', maxWidth: 400 },
          { title: 'title12', maxWidth: 400 },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          maxWidth: 1000,
          children: [
            { title: 'title11', maxWidth: 400 },
            { title: 'title12', maxWidth: 400 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        maxWidth: 800,
        children: [
          { title: 'title11', maxWidth: 400 },
          { title: 'title12', maxWidth: 400 },
        ],
      },
    ]);

    // width
    expect(
      formatColumns([
        {
          title: 'title1',
          children: [{ title: 'title11', width: 100 }, { title: 'title12' }],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: CELL_MINI_WIDTH + 100,
        width: null,
        maxWidth: Infinity,
        children: [
          {
            title: 'title11',
            minWidth: 100,
            width: 100,
            maxWidth: 100,
          },
          {
            title: 'title12',
            minWidth: CELL_MINI_WIDTH,
            width: null,
            maxWidth: Infinity,
          },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          children: [
            { title: 'title11', width: 100 },
            { title: 'title12', width: 100 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 200,
        width: 200,
        maxWidth: 200,
        children: [
          {
            title: 'title11',
            minWidth: 100,
            width: 100,
            maxWidth: 100,
          },
          {
            title: 'title12',
            minWidth: 100,
            width: 100,
            maxWidth: 100,
          },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          width: 100,
          children: [
            { title: 'title11', width: 100 },
            { title: 'title12', width: 100 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 200,
        width: 200,
        maxWidth: 200,
        children: [
          {
            title: 'title11',
            minWidth: 100,
            width: 100,
            maxWidth: 100,
          },
          {
            title: 'title12',
            minWidth: 100,
            width: 100,
            maxWidth: 100,
          },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          width: 300,
          children: [
            { title: 'title11', width: 100 },
            { title: 'title12', width: 100 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 200,
        width: 200,
        maxWidth: 200,
        children: [
          {
            title: 'title11',
            minWidth: 100,
            width: 100,
            maxWidth: 100,
          },
          {
            title: 'title12',
            minWidth: 100,
            width: 100,
            maxWidth: 100,
          },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          width: 300,
          children: [{ title: 'title11', width: 100 }, { title: 'title12' }],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 300,
        width: 300,
        maxWidth: 300,
        children: [
          {
            title: 'title11',
            minWidth: 100,
            width: 100,
            maxWidth: 100,
          },
          {
            title: 'title12',
            minWidth: CELL_MINI_WIDTH,
            width: null,
            maxWidth: Infinity,
          },
        ],
      },
    ]);
  });
});
