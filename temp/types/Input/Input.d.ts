import { VComponent } from '../component';
import { SIZES } from '../constant';

export declare class Input extends VComponent {
  /**
   * Value of input
   *
   * @default: undefined
   */
  value: string | number;

  /**
   * Default value of input
   *
   * @default: undefined
   */
  defaultValue: string | number;

  /**
   * Placeholder of input
   *
   * @default: ''
   */
  placeholder: string;

  /**
   * Size of input
   *
   * @default: undefined
   */
  size: SIZES;

  /**
   * An Input field can show that it is disabled
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * The HTML input id
   *
   * @default: ''
   */
  id: string;

  /**
   * The HTML input type
   *
   * @default: 'text'
   */
  type: string;
}
