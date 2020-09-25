import { mount } from '@vue/test-utils';
import Icon from 'components/Icon';

describe('Button component', () => {
  it('renders correctly', () => {
    const wrapper = mount({
      render() {
        return <Icon icon="star" />;
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
