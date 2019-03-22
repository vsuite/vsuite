import { VComponent } from '../component';

export declare class IconStack extends VComponent {
  /**
   * Sets the icon size
   *
   * @default: ''
   **/
  size?: 'lg' | '2x' | '3x' | '4x' | '5x';

  /**
   * You can use a custom element for this component
   *
   * @default: 'span'
   **/
  componentClass: string | object;
}
