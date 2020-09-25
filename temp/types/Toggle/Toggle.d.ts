import { VComponent } from '../component';
import { RenderX } from '../utils';
import { SIZES } from '../constant';

export declare class Toggle extends VComponent {
  /**
   * Checked（Controlled)
   *
   * @default: undefined
   */
  checked: boolean;

  /**
   * Default checked
   *
   * @default: undefined
   */
  defaultChecked: boolean;

  /**
   * Whether to disabled toggle
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * Size of toggle
   *
   * @default: undefined
   */
  size: SIZES;

  /**
   * Checked display content
   *
   * @default: ''
   */
  open: RenderX;

  /**
   * Unselected display content
   *
   * @default: ''
   */
  close: RenderX;
}
