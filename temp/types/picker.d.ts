import { VPopper } from './popper';

export declare class VPicker extends VPopper {
  /**
   * The data of component
   *
   * @default: []
   */
  data: any[];

  /**
   * The cache data of component
   *
   * @default: []
   */
  cacheData: any[];

  /**
   *
   */
  block: boolean;

  /**
   * Disable component
   *
   * @default: false
   */
  disabled: boolean;

  /**
   * Disabled items
   *
   * @default: []
   */
  disabledItemValues: any[];

  /**
   * Set option value 'key' in 'data'
   *
   * @default: 'value'
   */
  valueKey: string;

  /**
   * Set options to display the 'key' in 'data'
   *
   * @default: 'label'
   */
  labelKey: string;

  /**
   * Set group condition key in data
   *
   * @default: ''
   */
  groupBy: string;

  /**
   * Placeholder of component
   *
   * @default: ''
   */
  placeholder: string;

  /**
   * Whether display search input box
   *
   * @default: true
   */
  searchable: boolean;

  /**
   * Support clean value
   *
   * @default: true
   */
  cleanable: boolean;

  /**
   * Settings can create new options
   *
   * @default: false
   */
  creatable: boolean;

  /**
   * Sort options
   *
   * @default: undefined
   */
  sort: Function;

  /**
   * Customizing the Rendering Menu list
   *
   * @default: undefined
   */
  renderMenu: Function;

  /**
   * Custom render menuItems
   *
   * @default: undefined
   */
  renderMenuItem: Function;

  /**
   * Custom render menu group
   *
   * @default: undefined
   */
  renderMenuGroup: Function;

  /**
   * Custom render selected items
   *
   * @default: undefined
   */
  renderValue: Function;
}
