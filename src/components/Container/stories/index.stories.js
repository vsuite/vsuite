import { storiesOf } from '@storybook/vue';

import Container from 'components/Container';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import Demo from 'stories/demo';

const stories = storiesOf('Layout|Container', module);

stories.add('default', () => ({
  render: h => {
    return (
      <Demo title="Default">
        <div class="show-container">
          <Container>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Container>

          <Container>
            <Sidebar>Sidebar</Sidebar>
            <Container>
              <Header>Header</Header>
              <Content>Content</Content>
              <Footer>Footer</Footer>
            </Container>
          </Container>

          <Container>
            <Header>Header</Header>
            <Container>
              <Sidebar>Sidebar</Sidebar>
              <Content>Content</Content>
            </Container>
            <Footer>Footer</Footer>
          </Container>

          <Container>
            <Header>Header</Header>
            <Container>
              <Content>Content</Content>
              <Sidebar>Sidebar</Sidebar>
            </Container>
            <Footer>Footer</Footer>
          </Container>
        </div>
      </Demo>
    );
  },
}));
