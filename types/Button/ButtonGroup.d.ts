import { VComponent } from '../component';
import { SIZES } from '../constant';

export declare class ButtonGroup extends VComponent {
  /**
   * A button can have different sizes
   *
   * @default: ''
   **/
  size: SIZES;

  /**
   * Vertical layouts of button
   *
   * @default: false
   **/
  vertical: boolean;

  /**
   * Horizontal constant width layout
   *
   * @default: false
   **/
  justified: boolean;

  /**
   * Display block buttongroups
   *
   * @default: false
   **/
  block: boolean;

  /**
   * A button can show it is currently unable to be interacted with
   *
   * @default: false
   **/
  disabled: boolean;
}
