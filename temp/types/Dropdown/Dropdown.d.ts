import { VPopper } from '../popper';
import { IconX, RenderX } from '../utils';

import { DropdownMenu } from './DropdownMenu';
import { DropdownItem } from './DropdownItem';

export declare class Dropdown extends VPopper {
  static Menu: DropdownMenu;
  static Item: DropdownItem;

  /**
   * Define the title as a submenu
   *
   * @default: ''
   */
  title: RenderX;

  /**
   * Set the icon
   *
   * @default: ''
   */
  icon: IconX;

  /**
   * The option to activate the state, corresponding to the eventkey in the Dropdown.item
   *
   * @default: undefined
   */
  activeKey: any;

  /**
   * The value of the current option
   *
   * @default: undefined
   */
  eventKey: any;

  /**
   * Whether or not component is disabled
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * No caret variation
   *
   * @default: false
   */
  noCaret: boolean;
}
