import { mount } from '@vue/test-utils';
import Button from 'components/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    const wrapper = mount({
      render() {
        return <Button>Default</Button>;
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
