import { mount } from '@vue/test-utils';
import Button from 'components/Button';

const ButtonToolbar = Button.Toolbar;

describe('ButtonToolbar component', () => {
  it('renders correctly', () => {
    const wrapper = mount({
      render() {
        return (
          <ButtonToolbar>
            <Button>Default</Button>
          </ButtonToolbar>
        );
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
