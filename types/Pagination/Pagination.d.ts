import { VComponent } from '../component';

export declare class Pagination extends VComponent {
  /**
   * Current page number
   *
   * @default: 1
   */
  activePage: number;

  /**
   * Page buttons display the maximum number of
   *
   * @default: 0
   */
  maxButtons: number;

  /**
   * Displays the first page
   *
   * @default: false
   */
  first: boolean;

  /**
   * Displays the last page
   *
   * @default: false
   */
  last: boolean;

  /**
   * Displays the prev page
   *
   * @default: false
   */
  prev: boolean;

  /**
   * Displays the next page
   *
   * @default: false
   */
  next: boolean;

  /**
   * Show border paging buttons 1 and pages
   *
   * @default: false
   */
  boundaryLinks: boolean;

  /**
   * Displays the ellipsis
   *
   * @default: false
   */
  ellipsis?: boolean;

  /**
   * Disabled component
   *
   * @default: false
   */
  disabled: boolean | ((eventKey: any) => boolean);
}
