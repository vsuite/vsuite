import { VComponent } from '../component';
import { COLORS, SIZES } from '../constant';

import { ButtonGroup } from './ButtonGroup';
import { ButtonToolbar } from './ButtonToolbar';
import { IconButton } from './IconButton';

export declare class Button extends VComponent {
  static Icon: IconButton;
  static Group: ButtonGroup;
  static Toolbar: ButtonToolbar;

  /**
   * A button can have different appearances.
   *
   * @default: 'default'
   **/
  appearance: 'default' | 'primary' | 'link' | 'subtle' | 'ghost';

  /**
   * A button can have different colors
   *
   * @default: ''
   **/
  color: COLORS;

  /**
   * A button can have different sizes
   *
   * @default: ''
   **/
  size: SIZES;

  /**
   * A button can show it is currently the active user selection
   *
   * @default: false
   **/
  active: boolean;

  /**
   * A button can show it is currently unable to be interacted with
   *
   * @default: false
   **/
  disabled: boolean;

  /**
   * A button can show a loading indicator
   *
   * @default: false
   **/
  loading: boolean;

  /**
   * Format button to appear inside a content bloc
   *
   * @default: false
   **/
  block: boolean;

  /**
   * Providing a `href` will render an `<a>` element, _styled_ as a button
   *
   * @default: ''
   **/
  href: string;

  /**
   * You can use a custom element for this component
   *
   * @default: 'button'
   **/
  componentClass: string | object;
}
