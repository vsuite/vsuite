import { VComponent } from './component';
import { Placement, Modifiers } from 'popper.js';
import { TRIGGER } from './constant';

export declare class VPopper extends VComponent {
  /**
   * visibility of popper
   *
   * @default: undefined
   **/
  visible: boolean;

  /**
   * initial visibility of popper
   *
   * @default: false
   **/
  defaultVisible: boolean;

  /**
   * placement of popper
   *
   * @default: 'auto'
   */
  placement: Placement;

  /**
   * modifiers options of popper.js
   *
   * @default: {}
   **/
  modifiers: Modifiers;

  /**
   * positionFixed option of popper.js
   *
   * @default: false
   **/
  positionFixed: boolean;

  /**
   * eventsEnabled option of popper.js
   *
   * @default: true
   **/
  eventsEnabled: boolean;

  /**
   * removeOnDestroy option of popper.js
   *
   * @default: false
   **/
  removeOnDestroy: boolean;

  /**
   * trigger visibility of popper
   *
   * @default: 'hover'
   **/
  trigger: TRIGGER | TRIGGER[];

  /**
   * delay to display popper
   *
   * @default: 100
   **/
  delay: number;

  /**
   * delay time before show popper
   *
   * @default: 0
   */
  delayShow: number;

  /**
   * delay time before hide popper
   *
   * @default: 0
   */
  delayHide: number;

  /**
   * transfer dom to body
   *
   * @default: false
   **/
  transfer: boolean;

  /** show popper */
  show(): void;

  /** hide popper */
  hide(): void;
}
