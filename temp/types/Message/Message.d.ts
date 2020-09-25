import { VComponent } from '../component';
import { STATUS } from '../constant';
import { RenderX } from '../utils';

export declare class Message extends VComponent {
  /**
   * Type of message
   *
   * @default: info
   */
  type: STATUS;

  /**
   * Show close icon in message
   *
   * @default: false
   */
  closable: boolean;

  /**
   * Title of message
   *
   * @default: ''
   */
  title: RenderX;

  /**
   * Description of message
   *
   * @default: ''
   */
  description: RenderX;

  /**
   * Show icon of message
   *
   * @default: false
   */
  showIcon: boolean;

  /**
   * Show on the top of container
   *
   * @default: false
   */
  full: boolean;
}
