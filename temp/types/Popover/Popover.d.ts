import { VPopper } from '../popper';
import { RenderX } from '../utils';

export declare class Popover extends VPopper {
  /**
   * title of popover
   *
   * @default: ''
   **/
  title: RenderX;

  /**
   * content of popover
   *
   * @default: ''
   **/
  content: RenderX;

  /**
   * inline mode of popover
   *
   * @default: false
   **/
  inline: boolean;

  /**
   * without padding
   *
   * @default: false
   **/
  full: boolean;

  /**
   * inner width of popover
   *
   * @default: 250
   **/
  maxWidth: number;

  /**
   * inner style of popover
   *
   * @default: {}
   **/
  innerStyle: object;

  /**
   * Value of positionLeft
   *
   * @default: 0
   **/
  positionLeft?: number;

  /**
   * Value of positionTop
   *
   * @default: 2
   **/
  positionTop?: number;
}
