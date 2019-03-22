import { VPopper } from '../popper';

export declare class Tooltip extends VPopper {
  /**
   * content of tooltip
   *
   * @default: ''
   **/
  title: string;

  /**
   * inline mode of tooltip
   *
   * @default: false
   **/
  inline: boolean;

  /**
   * white theme of tooltip
   *
   * @default: false
   **/
  white: boolean;

  /**
   * inner width of tooltip
   *
   * @default: 250
   **/
  maxWidth: number;

  /**
   * inner style of tooltip
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
