import { VComponent } from '../component';
import { SIZES } from '../constant';
import { RenderX } from '../utils';

export declare class Message extends VComponent {
  /**
   * Size of loader
   *
   * @default: ''
   */
  size: SIZES;

  /**
   * Whether the background is displayed
   *
   * @default: false
   */
  backdrop: boolean;

  /**
   * Centered in the container
   *
   * @default: false
   */
  center: boolean;

  /**
   * An alternative dark visual style for the Loader
   *
   * @default: false
   */
  inverse: boolean;

  /**
   * The icon is displayed vertically with the text
   *
   * @default: false
   */
  vertical: boolean;

  /**
   * The speed at which the loader rotates
   *
   * @default: 'normal'
   */
  speed: 'slow' | 'normal' | 'fast';

  /**
   * Custom descriptive text
   *
   * @default: ''
   */
  content: RenderX;
}
