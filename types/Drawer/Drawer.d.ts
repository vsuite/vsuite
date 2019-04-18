import { VComponent } from '../component';
import { SIZES } from '../constant';
import { Container, RenderX, Classes, Styles } from '../utils';

interface Removable {
  remove: () => void;
}

interface Option {
  key?: string;
  title?: RenderX;
  content?: RenderX;
  backdrop?: boolean | 'static';
  closable?: boolean;
  keyboard?: boolean;
  full?: boolean;
  loading?: boolean;
  size?: SIZES;
  header?: RenderX;
  footer?: RenderX;
  okText?: string;
  okProps?: object;
  showOk?: boolean;
  cancelText?: string;
  cancelProps?: object;
  showCancel?: boolean;
  container?: Container;
  onOk?: () => void;
  onCancel?: () => void;
}

export declare class Drawer extends VComponent {
  static open(options: Option): Removable;
  static open(title: RenderX): Removable;
  static open(title: RenderX, content: RenderX): Removable;
  static open(title: RenderX, options: Option): Removable;
  static open(title: RenderX, content: RenderX, options: Option): Removable;

  static confirm(options: Option): Removable;
  static confirm(title: RenderX): Removable;
  static confirm(title: RenderX, content: RenderX): Removable;
  static confirm(title: RenderX, options: Option): Removable;
  static confirm(title: RenderX, content: RenderX, options: Option): Removable;

  static success(options: Option): Removable;
  static success(title: RenderX): Removable;
  static success(title: RenderX, content: RenderX): Removable;
  static success(title: RenderX, options: Option): Removable;
  static success(title: RenderX, content: RenderX, options: Option): Removable;

  static error(options: Option): Removable;
  static error(title: RenderX): Removable;
  static error(title: RenderX, content: RenderX): Removable;
  static error(title: RenderX, options: Option): Removable;
  static error(title: RenderX, content: RenderX, options: Option): Removable;

  static warning(options: Option): Removable;
  static warning(title: RenderX): Removable;
  static warning(title: RenderX, content: RenderX): Removable;
  static warning(title: RenderX, options: Option): Removable;
  static warning(title: RenderX, content: RenderX, options: Option): Removable;

  static warn(options: Option): Removable;
  static warn(title: RenderX): Removable;
  static warn(title: RenderX, content: RenderX): Removable;
  static warn(title: RenderX, options: Option): Removable;
  static warn(title: RenderX, content: RenderX, options: Option): Removable;

  static info(options: Option): Removable;
  static info(title: RenderX): Removable;
  static info(title: RenderX, content: RenderX): Removable;
  static info(title: RenderX, options: Option): Removable;
  static info(title: RenderX, content: RenderX, options: Option): Removable;

  static remove(key?: string): void;

  /**
   * Show drawer
   *
   * @default: undefined
   */
  visible: boolean;
  /**
   * Default value of visible
   *
   * @default: false
   */
  defaultVisible: boolean;
  /**
   * A drawer can have different sizes
   *
   * @default: 'sm'
   */
  size: SIZES;
  /**
   * A drawer can have custom title
   *
   * @default: ''
   */
  title: RenderX;
  /**
   * When set to true, the Drawer will display the background when it is opened.
   * Clicking on the background will close the Drawer. If you do not want to close the Drawer,
   * set it to 'static'.
   *
   * @default: true
   */
  backdrop: boolean | 'static';
  /**
   * Show close icon
   *
   * @default: true
   */
  closable: boolean;
  /**
   * Esc can close drawer
   *
   * @default: true
   */
  keyboard: boolean;
  /**
   * With of drawer depends on window size.
   *
   * @default: false
   */
  full: boolean;
  /**
   * After click ok button of drawer, ok button will be loading.
   *
   * @default: false
   */
  loading: boolean;
  /**
   * display header of drawer
   *
   * @default: true
   */
  header: boolean;
  /**
   * display footer of drawer
   *
   * @default: true
   */
  footer: boolean;
  /**
   * custom text of ok button
   *
   * @default: ''
   */
  okText: string;
  /**
   * pass button props to ok button
   *
   * @default: {}
   */
  okProps: object;
  /**
   * display ok button
   *
   * @default: true
   */
  showOk: boolean;
  /**
   * custom text of cancel button
   *
   * @default: ''
   */
  cancelText: string;
  /**
   * pass button props to cancel button
   *
   * @default: {}
   */
  cancelProps: object;
  /**
   * display cancel button
   *
   * @default: true
   */
  showCancel: boolean;
  /**
   * Container of drawer
   *
   * @default: null;
   */
  container: Container;
  /**
   * custom drawer
   *
   * @default: ''
   */
  modalClassNames: Classes;
  /**
   * custom dialog
   *
   * @default: ''
   */
  dialogClassNames: Classes;
  /**
   * custom dialog
   *
   * @default: ''
   */
  dialogStyles: Styles;

  /**
   * Show drawer
   */
  show(): void;

  /**
   * Hide drawer
   */
  hide(): void;
}
