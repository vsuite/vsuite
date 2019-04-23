import { VComponent } from '../component';
import { IconX } from '../utils';

export declare class DropdownItem extends VComponent {
  /**
   * The value of the current option
   *
   * @default: undefined
   */
  eventKey: any;

  /**
   * Set the icon
   *
   * @default: ''
   */
  icon: IconX;

  /**
   * Active the current option
   *
   * @default: false
   */
  active: boolean;

  /**
   * Whether to display the divider
   *
   * @default: false
   */
  divider: boolean;

  /**
   * Disable the current option
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * Displays a custom panel
   *
   * @default: false
   */
  panel: boolean;
}
