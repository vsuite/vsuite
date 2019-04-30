import { VComponent } from '../component';

import { RadioGroup } from './RadioGroup';

export declare class Radio extends VComponent {
  static Group: RadioGroup;

  /**
   * Specifies whether the radio is selected
   *
   * @default: undefined
   */
  checked: boolean;

  /**
   * Specifies the initial state: whether or not the radio is selected
   *
   * @default: undefined
   */
  defaultChecked: boolean;

  /**
   * Value, corresponding to the value of the Radiogroup, to determine whether the
   *
   * @default: undefined
   */
  value: any;

  /**
   * The disable of component
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * HTML title
   *
   * @default: ''
   */
  title: string;
}
