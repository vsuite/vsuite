import { VComponent } from '../component';
import { IconX } from '../utils';

import { BreadcrumbItem } from './BreadcrumbItem';

export declare class Breadcrumb extends VComponent {
  static Item: BreadcrumbItem;

  /**
   * Shorthand for primary content of the React.ReactNode
   *
   * @default: 'angle-right'
   */
  separator: IconX;
}
