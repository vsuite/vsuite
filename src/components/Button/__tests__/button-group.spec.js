import { mount } from '@vue/test-utils';
import Button from 'components/Button';

const ButtonGroup = Button.Group;

describe('ButtonGroup component', () => {
  it('renders correctly', () => {
    const wrapper = mount({
      render() {
        return (
          <ButtonGroup>
            <Button>Default</Button>
          </ButtonGroup>
        );
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
