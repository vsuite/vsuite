import { VComponent } from '../component';

import { CheckboxGroup } from './CheckboxGroup';

export declare class Checkbox extends VComponent {
  static Group: CheckboxGroup;

  /**
   * Inline layout
   *
   * @default: false
   */
  inline: boolean;

  /**
   * A checkbox can appear disabled and be unable to change states
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * Whether or not checkbox is checked.
   *
   * @default: undefined
   */
  checked: boolean;

  /**
   * The initial value of checked.
   *
   * @default: undefined
   */
  defaultChecked: boolean;

  /**
   * Whether or not checkbox is indeterminate.
   *
   * @default: false
   */
  indeterminate: boolean;

  /**
   * The HTML input value.
   *
   * @default: undefined
   */
  value: any;
}
