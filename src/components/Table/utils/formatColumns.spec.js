import formatColumns from './formatColumns';
import { CELL_ALIGN, CELL_MINI_WIDTH } from '../constants';

describe('@formatColumns', () => {
  // title
  it('`title`', () => {
    expect(() =>
      formatColumns([{ key: 'key1' }, { title: 'title2', key: 'key2' }])
    ).toThrowError('[Table] COLUMN 0: `title` is required.');

    expect(() =>
      formatColumns([{ title: '', key: 'key1' }, { key: 'key2' }])
    ).toThrowError('[Table] COLUMN 1: `title` is required.');

    expect(() =>
      formatColumns([
        { title: 'title1', key: 'key1', children: [{ key: 'key11' }] },
      ])
    ).toThrowError('[Table] COLUMN 0: `title` is required.');
  });

  // key
  it('`key`', () => {
    expect(() => formatColumns([{ title: 'title1' }])).toThrowError(
      '[Table] COLUMN 0: `key` is required. You also can use `dataIndex` instead.'
    );
    expect(() =>
      formatColumns([
        { title: 'title1', key: 'key1', children: [{ title: 'title11' }] },
      ])
    ).toThrowError(
      '[Table] COLUMN 0: `key` is required. You also can use `dataIndex` instead.'
    );
    expect(() =>
      formatColumns([
        { title: 'title1', key: 'key1' },
        { title: 'title2', key: 'key1' },
      ])
    ).toThrowError('[Table] COLUMN 1: `key` should be unique.');
    expect(() =>
      formatColumns([
        {
          title: 'title1',
          key: 'key1',
          children: [{ title: 'title11', key: 'key1' }],
        },
      ])
    ).toThrowError('[Table] COLUMN 0: `key` should be unique.');

    expect(
      formatColumns([
        {
          title: 'title1',
          dataIndex: 'key1',
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        key: 'key1',
        dataIndex: 'key1',
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          key: 'key1',
          children: [{ title: 'title11', dataIndex: 'key11' }],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        key: 'key1',
        dataIndex: null,
        children: [{ title: 'title11', key: 'key11', dataIndex: 'key11' }],
      },
    ]);
  });

  // width, minWidth and maxWidth
  it('`width`', () => {
    expect(() =>
      formatColumns([{ title: 'title1', key: 'key1', width: 0 }])
    ).toThrowError('[Table] COLUMN 0: `width` cannot smaller than zero');

    expect(() =>
      formatColumns([{ title: 'title1', key: 'key1', minWidth: 0 }])
    ).toThrowError('[Table] COLUMN 0: `minWidth` cannot smaller than zero');

    expect(() =>
      formatColumns([{ title: 'title1', key: 'key1', maxWidth: 0 }])
    ).toThrowError('[Table] COLUMN 0: `maxWidth` cannot smaller than zero');

    expect(() =>
      formatColumns([
        { title: 'title1', key: 'key1', minWidth: 300, maxWidth: 100 },
      ])
    ).toThrowError(
      '[Table] COLUMN 0: `maxWidth` cannot smaller than `minWidth`'
    );

    expect(
      formatColumns([{ title: 'title1', key: 'key1', width: 200 }])
    ).toMatchObject([
      { title: 'title1', minWidth: 200, width: 200, maxWidth: 200 },
    ]);

    expect(
      formatColumns([{ title: 'title1', key: 'key1', minWidth: 200 }])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: 200,
        width: null,
        maxWidth: Infinity,
      },
    ]);

    expect(
      formatColumns([{ title: 'title1', key: 'key1', maxWidth: 200 }])
    ).toMatchObject([
      {
        title: 'title1',
        minWidth: CELL_MINI_WIDTH,
        width: null,
        maxWidth: 200,
      },
    ]);

    expect(
      formatColumns([
        { title: 'title1', key: 'key1', minWidth: 200, maxWidth: 200 },
      ])
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
          key: 'key1',
          children: [
            { title: 'title11', key: 'key11' },
            { title: 'title12', key: 'key12' },
          ],
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
          key: 'key1',
          children: [
            { title: 'title11', key: 'key11', minWidth: 100 },
            { title: 'title12', key: 'key12' },
          ],
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
          key: 'key1',
          children: [
            { title: 'title11', key: 'key11', minWidth: 100 },
            { title: 'title12', key: 'key12', minWidth: 100 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        key: 'key1',
        minWidth: 200,
        children: [
          { title: 'title11', key: 'key11', minWidth: 100 },
          { title: 'title12', key: 'key12', minWidth: 100 },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          key: 'key1',
          minWidth: 100,
          children: [
            { title: 'title11', key: 'key11', minWidth: 100 },
            { title: 'title12', key: 'key12', minWidth: 100 },
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
          key: 'key1',
          minWidth: 300,
          children: [
            { title: 'title11', key: 'key11', minWidth: 100 },
            { title: 'title12', key: 'key12', minWidth: 100 },
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
          key: 'key1',
          children: [
            { title: 'title11', key: 'key11', maxWidth: 400 },
            { title: 'title12', key: 'key12' },
          ],
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
          key: 'key1',
          children: [
            { title: 'title11', key: 'key11', maxWidth: 400 },
            { title: 'title12', key: 'key12', maxWidth: 400 },
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
          key: 'key1',
          maxWidth: 400,
          children: [
            { title: 'title11', key: 'key11', maxWidth: 400 },
            { title: 'title12', key: 'key12', maxWidth: 400 },
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
          key: 'key1',
          maxWidth: 1000,
          children: [
            { title: 'title11', key: 'key11', maxWidth: 400 },
            { title: 'title12', key: 'key12', maxWidth: 400 },
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
          key: 'key1',
          children: [
            { title: 'title11', key: 'key11', width: 100 },
            { title: 'title12', key: 'key12' },
          ],
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
          key: 'key1',
          children: [
            { title: 'title11', key: 'key11', width: 100 },
            { title: 'title12', key: 'key12', width: 100 },
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
          key: 'key1',
          width: 100,
          children: [
            { title: 'title11', key: 'key11', width: 100 },
            { title: 'title12', key: 'key12', width: 100 },
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
          key: 'key1',
          width: 300,
          children: [
            { title: 'title11', key: 'key11', width: 100 },
            { title: 'title12', key: 'key12', width: 100 },
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
          key: 'key1',
          width: 300,
          children: [
            { title: 'title11', key: 'key11', width: 100 },
            { title: 'title12', key: 'key12' },
          ],
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

  // text
  it('`text`', () => {
    expect(() =>
      formatColumns([{ title: 'title1', key: 'key1', align: 'top' }])
    ).toThrowError('[Table] COLUMN 0: `align` = top is not supported');

    expect(() =>
      formatColumns([{ title: 'title1', key: 'key1', fixed: 'top' }])
    ).toThrowError('[Table] COLUMN 0: `fixed` = top is not supported');

    expect(() =>
      formatColumns([
        {
          title: 'title1',
          key: 'key1',
          children: [{ title: 'title11', key: 'key11', fixed: true }],
        },
      ])
    ).toThrowError('[Table] COLUMN 0: `fixed` cannot be set for children');

    expect(
      formatColumns([
        { title: 'title1', key: 'key1' },
        { title: 'title2', key: 'key2', fixed: 'right' },
        { title: 'title3', key: 'key3', fixed: 'left' },
      ])
    ).toMatchObject([
      { title: 'title3', key: 'key3', fixed: 'left' },
      { title: 'title1', key: 'key1' },
      { title: 'title2', key: 'key2', fixed: 'right' },
    ]);

    expect(() =>
      formatColumns([{ title: 'title1', key: 'key1', type: 'input' }])
    ).toThrowError('[Table] COLUMN 0: `type` = input is not supported');

    expect(formatColumns([{ title: 'title1', key: 'key1' }])).toMatchObject([
      {
        title: 'title1',
        className: '',
        style: {},
        type: null,
        align: CELL_ALIGN.left,
        fixed: false,
        ellipsis: false,
        tooltip: false,
      },
    ]);
  });

  // resizable
  it('`resizable`', () => {
    expect(() =>
      formatColumns([
        {
          title: 'title1',
          key: 'key1',
          children: [{ title: 'title11', key: 'key11', resizable: true }],
        },
      ])
    ).toThrowError('[Table] COLUMN 0: `resizable` cannot set to children');

    expect(() =>
      formatColumns([
        { title: 'title1', key: 'key1', width: 200, resizable: true },
      ])
    ).toThrowError(
      '[Table] COLUMN 0: `resizable` cannot work with `width` property. You can use `minWidth` instead.'
    );

    expect(formatColumns([{ title: 'title1', key: 'key1' }])).toMatchObject([
      { title: 'title1', resizable: false },
    ]);
  });

  // flex
  it('`flex`', () => {
    expect(() =>
      formatColumns([{ title: 'title1', key: 'key1', width: 200, flex: 1 }])
    ).toThrowError(
      '[Table] COLUMN 0: `flex` cannot work with `width` property. You can use `minWidth` instead.'
    );

    expect(formatColumns([{ title: 'title1', key: 'key1' }])).toMatchObject([
      { title: 'title1', flex: 0 },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          key: 'key1',
          flex: 2,
          children: [
            { title: 'title11', key: 'key11', flex: 1 },
            { title: 'title12', key: 'key12', flex: 2 },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        flex: 3,
        children: [
          { title: 'title11', key: 'key11', flex: 1 },
          { title: 'title12', key: 'key12', flex: 2 },
        ],
      },
    ]);

    expect(
      formatColumns([
        {
          title: 'title1',
          key: 'key1',
          flex: 2,
          children: [
            { title: 'title11', key: 'key11' },
            { title: 'title12', key: 'key12' },
          ],
        },
      ])
    ).toMatchObject([
      {
        title: 'title1',
        flex: 0,
        children: [
          { title: 'title11', key: 'key11', flex: 0 },
          { title: 'title12', key: 'key12', flex: 0 },
        ],
      },
    ]);
  });
});
