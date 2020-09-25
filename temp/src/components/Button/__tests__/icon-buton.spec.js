import { mount } from '@vue/test-utils';
import Button from 'components/Button';

import ComponentSvg from 'stories/svg/component.svg';

const IconButton = Button.Icon;

describe('ButtonGroup component', () => {
  it('renders correctly', () => {
    const wrapper = mount({
      render() {
        return <IconButton icon="star" />;
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly when using svg file', () => {
    const wrapper = mount({
      render() {
        return <IconButton icon={ComponentSvg} />;
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
