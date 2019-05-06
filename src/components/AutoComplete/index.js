import AutoComplete from './AutoComplete.jsx';
import AutoCompleteItem from './AutoCompleteItem.jsx';

AutoComplete.Item = AutoCompleteItem;

AutoComplete.install = function(Vue) {
  Vue.component(AutoComplete.name, AutoComplete);
  Vue.component(AutoCompleteItem.name, AutoCompleteItem);
};

export default AutoComplete;
