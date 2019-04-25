import { VComponent } from '../component';

import { SidenavHeader } from './SidenavHeader';
import { SidenavBody } from './SidenavBody';
import { SidenavToggle } from './SidenavToggle';

export declare class Sidenav extends VComponent {
  static Toggle: SidenavToggle;
  static Header: SidenavHeader;
  static Body: SidenavBody;

  /**
   * Whether to expand the Sidenav
   *
   * @default: false
   */
  expanded: boolean;

  /**
   * Menu style
   *
   * @default: 'default'
   */
  appearance: 'default' | 'inverse' | 'subtle';

  /**
   *  Open menu, corresponding to Dropdown eventkey (Controlled)
   *
   *  @default: undefined
   */
  openKeys: any[];

  /**
   *  Open menu, corresponding to Dropdown eventkey
   *
   *  @default: undefined
   */
  defaultOpenKeys: any[];

  /**
   * Activation option, corresponding menu eventkey
   *
   * @default: false
   */
  activeKey: any;
}
