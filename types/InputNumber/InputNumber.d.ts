import { VComponent } from '../component';
import { RenderX } from '../utils';
import { SIZES } from '../constant';

export declare class InputNumber extends VComponent {
  /**
   * Current value of the input. Creates a controlled component
   *
   * @default: undefined
   */
  value: number | string;

  /**
   * Initial value
   *
   * @default: undefined
   */
  defaultValue: number | string;

  /**
   * An input can show that it is disabled
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * Minimum value
   *
   * @default: -Infinity
   */
  min: number;

  /**
   * Maximum value
   *
   * @default: Infinity
   */
  max: number;

  /**
   * The value of each step. can be decimal
   *
   * @default: 1
   */
  step: number;

  /**
   * Sets the element displayed to the left of the component
   *
   * @default: ''
   */
  prefix: RenderX;

  /**
   * Sets the element displayed on the right side of the component
   *
   * @default: ''
   */
  postfix: RenderX;

  /**
   * An Input can have different sizes
   *
   * @default: undefined
   */
  size: SIZES;

  /**
   * Button can have different appearances
   *
   * @default: 'subtle'
   */
  buttonAppearance: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
}
