import { addClass, removeClass } from 'shares/dom';

const toggleClass = (node, className, condition) => {
  if (condition) {
    addClass(node, className);
  } else {
    removeClass(node, className);
  }
};

export default toggleClass;
