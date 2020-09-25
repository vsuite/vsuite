import { VComponent } from '../component';

import { StepItem } from './StepItem';

export declare class Steps extends VComponent {
  static Item: StepItem;
  static STATUS: {
    WAIT: 'wait';
    PROCESS: 'process';
    FINISH: 'finish';
    ERROR: 'error';
  };

  /**
   * Current execution step
   *
   * @default: 0
   */
  current: number;

  /**
   * Current execution step status
   *
   * @default: 'process'
   */
  currentStatus: 'wait' | 'process' | 'finish' | 'error';

  /**
   * Vertical display
   *
   * @default: false
   */
  vertical: boolean;

  /**
   * Small size Step Bar
   *
   * @default: false
   */
  small: boolean;
}
