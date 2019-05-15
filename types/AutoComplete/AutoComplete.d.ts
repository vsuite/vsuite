import { VNode } from 'vue';
import { VPopper } from '../popper';

export declare class AutoComplete extends VPopper {
  /**
   * Initial value
   *
   * @default: ''
   */
  defaultValue: string;

  /**
   * Current value of the input. Creates a controlled component
   *
   * @default: undefined
   */
  value: string;

  /**
   * Whether disabled select
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * Additional classes for menu
   *
   * @default: ''
   */
  menuClassName: string;

  /**
   * When set to false, the Enter key selection function is invalid
   *
   * @default: true
   */
  selectOnEnter: boolean;

  /**
   * When set to false, if input without value, the list will still be shown.
   *
   * @default: false
   */
  showOnEmpty: boolean;

  /**
   * Custom selected option
   *
   * @default: () => any
   */
  renderItem: (itemValue: string) => VNode;
}
