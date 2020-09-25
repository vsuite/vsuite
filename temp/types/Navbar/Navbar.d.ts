import { VComponent } from '../component';

import { NavbarHeader } from './NavbarHeader';
import { NavbarBody } from './NavbarBody';

export declare class Navbar extends VComponent {
  static Header: NavbarHeader;
  static Body: NavbarBody;

  /**
   * A navbar can have different appearances.
   *
   * @default: 'default'
   **/
  appearance: 'default' | 'inverse' | 'subtle';
}
