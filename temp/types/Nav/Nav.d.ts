import { VComponent } from '../component';

import { NavItem } from './NavItem';

export declare class Nav extends VComponent {
  static Item: NavItem;

  /**
   * sets appearance
   *
   * @default: 'default'
   */
  appearance: 'default' | 'subtle' | 'tabs';

  /**
   * Reverse Direction of tabs/subtle
   *
   * @default: false
   */
  reversed: boolean;

  /**
   * Justified navigation
   *
   * @default: false
   */
  justified: boolean;

  /**
   * Vertical navigation
   *
   * @default: false
   */
  vertical: boolean;

  /**
   * appears on the right.
   *
   * @default: false
   */
  pullRight: boolean;

  /**
   * Active key, corresponding to eventkey in <Nav.item>.
   *
   * @default: undefined
   */
  activeKey: any;
}
