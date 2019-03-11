import { shallowMount } from '@vue/test-utils';
import Button from 'components/Button';

describe('Button', () => {
  it('appearance', () => {
    const wrapper = shallowMount(Button);

    expect(wrapper.classes('vs-button-appearance'));
    expect(wrapper.props('appearance')).toBe('default');
  });

  test.todo('color');

  test.todo('size');

  test.todo('active');

  test.todo('disabled');

  test.todo('loading');

  test.todo('block');

  test.todo('href');

  test.todo('snapshot');
});
