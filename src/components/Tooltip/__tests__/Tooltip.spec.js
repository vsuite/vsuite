import { mount } from '@vue/test-utils';
import Tooltip from 'components/Tooltip';

describe('Tooltip component', () => {
  it('should render correctly', () => {
    const wrapper = mount({
      render() {
        return <Tooltip inline title="demo text" />;
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
