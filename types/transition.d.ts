import { VComponent } from './component';

export declare class VTransition extends VComponent {
  name: string;
  appear: boolean;
  css: boolean;
  type: 'transition' | 'animation';
  mode: 'out-in' | 'in-out';
  duration: number | { enter?: number; leave?: number };
  'enter-class': string;
  'leave-class': string;
  'appear-class': string;
  'enter-to-class': string;
  'leave-to-class': string;
  'appear-to-class': string;
  'enter-active-class': string;
  'leave-active-class': string;
  'appear-active-class': string;
}
