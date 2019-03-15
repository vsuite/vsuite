import { mount } from '@vue/test-utils';
import Icon from 'components/Icon';

const IconStack = Icon.Stack;

describe('Button component', () => {
  it('renders correctly', () => {
    const wrapper = mount({
      render() {
        return (
          <IconStack size="lg">
            <Icon icon="square" stack="2x" />
            <Icon icon="terminal" stack="1x" inverse />
          </IconStack>
        );
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
