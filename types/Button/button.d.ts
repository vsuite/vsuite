import { VComponent } from '../component';
import { COLORS, SIZES } from '../constant';

export declare class Button extends VComponent {
  // default: default
  appearance: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';

  // default: ''
  color: COLORS;

  // default: '',
  size: SIZES;

  // default: false
  active: boolean;

  // default: false
  disabled: boolean;

  // default: false
  loading: boolean;

  // default: false
  block: boolean;

  // default: ''
  href: string;
}
