import { VComponent } from '../component';
import { COLORS, SIZES } from '../constant';

export declare class Button extends VComponent {
  appearance: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';

  color: COLORS;

  size: SIZES;

  active: boolean;

  disabled: boolean;

  loading: boolean;

  block: boolean;

  href: string;
}
