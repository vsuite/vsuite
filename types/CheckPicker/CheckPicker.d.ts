import { VPicker } from '../picker';

export declare class CheckPicker extends VPicker {
  /**
   * Current value of the component. Creates a controlled component
   *
   * @default: undefined
   */
  value: any[];

  /**
   * Initial value
   *
   * @default: undefined
   */
  defaultValue: any[];

  /**
   * Top the selected option in the options
   *
   * @default: false
   */
  sticky: boolean;

  /**
   * A picker that can be counted
   *
   * @default: true
   */
  countable: boolean;
}
