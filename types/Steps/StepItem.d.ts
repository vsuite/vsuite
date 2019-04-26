import { VComponent } from '../component';
import { RenderX, IconX } from '../utils';

export declare class StepItem extends VComponent {
  /**
   * The title of Steps item
   *
   * @default: ''
   */
  title: RenderX;

  /**
   * The description of Steps item
   *
   * @default: ''
   */
  description: RenderX;

  /**
   * Set width
   *
   * @default: undefined
   */
  itemWidth: number | string;

  /**
   * Set icon
   *
   * @default: undefined
   */
  icon: IconX;

  /**
   * Step status
   *
   * @default: undefined
   */
  status: 'finish' | 'wait' | 'process' | 'error';
}
