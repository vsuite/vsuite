import Message from './Message.jsx';

Message.install = function(Vue) {
  Vue.component(Message.name, Message);
};

export default Message;
