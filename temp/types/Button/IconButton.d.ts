import { VComponent } from '../component';

export declare class IconButton extends VComponent {
  /**
   * Set the icon
   *
   * @default: ''
   **/
  icon: string | { viewBox: string; id: string };

  /**
   * Set circle button
   *
   * @default: false
   **/
  circle: boolean;

  /**
   * The placement of icon
   *
   * @default: 'left'
   */
  placement: 'left' | 'right';
}
