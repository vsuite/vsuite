import { mount } from '@vue/test-utils';
import Button from 'components/Button';

describe('Button component', () => {
  it('should render correctly when using href', () => {
    const $wrapper = mount(Button, {
      propsData: {
        appearance: 'link',
        href: 'https://vsuite.blackcater.win',
      },
    });

    expect($wrapper.html()).toMatchSnapshot();
  });

  it('should trigger a click event', () => {
    const onClick = jest.fn();
    const $wrapper = mount(Button, { listeners: { click: onClick } });

    $wrapper.find('button').trigger('click');

    expect(onClick).toHaveBeenCalled();
  });
});
