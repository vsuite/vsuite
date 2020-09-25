import { VComponent } from '../component';

import { IconStack } from './IconStack';

export declare class Icon extends VComponent {
  static Stack: IconStack;

  /**
   * Icon name
   *
   * @default: ''
   **/
  icon: string | { viewBox: string; id: string };

  /**
   * Sets the icon size
   *
   * @default: ''
   **/
  size: 'lg' | '2x' | '3x' | '4x' | '5x';

  /**
   * Flip the icon
   *
   * @default: ''
   **/
  flip: 'horizontal' | 'vertical';

  /**
   * Combine multiple icons
   *
   * @default: ''
   **/
  stack: '1x' | '2x';

  /**
   * Rotate the icon
   *
   * @default: 0
   **/
  rotate: number;

  /**
   * Dynamic rotation icon
   *
   * @default: false
   **/
  spin: boolean;

  /**
   * Use pulse to have it rotate with 8 steps
   *
   * @default: false
   **/
  pulse: boolean;

  /**
   * Inverse color
   *
   * @default: false
   **/
  inverse: boolean;

  /**
   * Fixed icon width because there are many icons with uneven size
   *
   * @default: false
   **/
  fixedWidth: boolean;

  /**
   * Set SVG style when using custom SVG Icon
   *
   * @default: {}
   **/
  svgStyle: object;

  /**
   * You can use a custom element for this component
   *
   * @default: 'i'
   **/
  componentClass: string | object;
}
