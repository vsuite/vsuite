import { VComponent } from '../component';
import { COLORS } from '../constant';

import { TagGroup } from './TagGroup';

export declare class Tag extends VComponent {
  static Group: TagGroup;

  /**
   * Color of tag
   *
   * @default: 'default'
   */
  color: COLORS;

  /**
   * Whether to close
   *
   * @default: false
   */
  closable: Boolean;
}
