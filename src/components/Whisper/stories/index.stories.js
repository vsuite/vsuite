// import { storiesOf } from '@storybook/vue';
// import Demo from 'stories/demo';
// import Content, { Paragraph } from 'stories/content';
// import Whisper from 'components/Whisper';
// import Button from 'components/Button';
// import Tooltip from 'components/Tooltip';
// import { action } from '@storybook/addon-actions';
//
// const stories = storiesOf('Utils|Whisper', module);
//
// stories.add('default', () => ({
//   data() {
//     return {
//       visible: false,
//     };
//   },
//
//   render() {
//     return (
//       <Demo title="Default">
//         <Content style={{ height: '200px', overflowY: 'auto' }}>
//           <Paragraph size="large" />
//           <Whisper
//             visible={this.visible}
//             trigger={['click', 'right-click']}
//             placement="right-start"
//             onClick={action('click')}
//             onRightClick={action('right-click')}
//             onMouseEnter={action('mouse-enter')}
//             onMouseLeave={action('mouse-leave')}
//             onFocus={action('focus')}
//             onBlur={action('blur')}
//             onActive={action('active')}
//             onCreate={action('create')}
//             onUpdate={action('update')}
//             onShow={action('show')}
//             onHide={action('hide')}
//             onChange={action('change')}
//           >
//             <Button onClick={this._handleClick}>SUBMIT</Button>
//             <Tooltip visible slot="content">
//               Submit now!
//             </Tooltip>
//           </Whisper>
//           <Paragraph size="large" />
//         </Content>
//       </Demo>
//     );
//   },
//
//   methods: {
//     _handleClick() {
//       this.visible = !this.visible;
//     },
//   },
// }));
