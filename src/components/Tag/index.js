import Tag from './Tag.jsx';
import TagGroup from './TagGroup.jsx';

Tag.Group = TagGroup;

Tag.install = function(Vue) {
  Vue.component(Tag.name, Tag);
  Vue.component(TagGroup.name, TagGroup);
};

export default Tag;
