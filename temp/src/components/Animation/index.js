import Fade from './Fade.jsx';
import Collapse from './Collapse.jsx';
import Bounce from './Bounce.jsx';
import Slide from './Slide.jsx';

const Animation = { Fade, Collapse, Bounce, Slide };

Animation.install = function(Vue) {
  Vue.component(Fade.name, Fade);
  Vue.component(Collapse.name, Collapse);
  Vue.component(Bounce.name, Bounce);
  Vue.component(Slide.name, Slide);
};

export default Animation;
export { Fade, Collapse, Bounce, Slide };
