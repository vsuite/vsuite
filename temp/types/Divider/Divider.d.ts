import { VComponent } from '../component';

export declare class Divider extends VComponent {
  /**
   * Vertical dividing line
   *
   * @default: false
   */
  vertical: boolean;

  /**
   * You can use a custom element for this component
   *
   * @default: 'div'
   **/
  componentClass: string | object;
}
