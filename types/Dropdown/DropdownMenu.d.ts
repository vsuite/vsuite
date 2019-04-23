import { VPopper } from '../popper';
import { RenderX, IconX } from '../utils';

export declare class DropdownMenu extends VPopper {
  /**
   * Define the title as a submenu
   *
   * @default: ''
   */
  title: RenderX;

  /**
   * Set the icon
   *
   * @default: undefined
   */
  icon: IconX;

  /**
   * The submenu expands from the left and defaults to the right
   *
   * @default: false
   */
  pullLeft: boolean;

  /**
   * The value of the current option
   *
   * @default: undefined
   */
  eventKey: any;
}
