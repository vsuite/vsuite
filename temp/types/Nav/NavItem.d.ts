import { VComponent } from '../component';
import { IconX } from '../utils';

export declare class NavItem extends VComponent {
  /**
   * Activation status
   *
   * @default: false
   */
  active: boolean;

  /**
   * Disabled status
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * divier for nav item
   *
   * @default: false
   */
  divider: boolean;

  /**
   * display panel
   *
   * @default: false
   */
  panel: boolean;

  /**
   * Sets the icon for the component
   *
   * @default: ''
   */
  icon: IconX;

  /**
   * The value of the current option
   *
   * @default: undefined
   */
  eventKey: any;
}
