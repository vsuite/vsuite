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

  it('renders correctly when no content', () => {
    const wrapper = mount({
      render() {
        return <Button />;
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should trigger a click event', () => {
    const wrapper = mount({
      render() {
        return <Button>Default</Button>;
      },
    });

    wrapper.vm.$emit('click', 1, 2);

    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click[0]).toMatchObject([1, 2]);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
