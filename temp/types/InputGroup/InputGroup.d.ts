import { VComponent } from '../component';
import { SIZES } from '../constant';

import { InputGroupAddon } from './InputGroupAddon';
import { InputGroupButton } from './InputGroupButton';

export declare class InputGroup extends VComponent {
  static Addon: InputGroupAddon;
  static Button: InputGroupButton;

  /**
   * Size of component
   */
  size: SIZES;

  /**
   * Sets the composition content internally
   *
   * @default: false
   */
  inside: boolean;

  /**
   * An Input group can show that it is disabled
   *
   * @default: fakse
   */
  disabled: boolean;
}
