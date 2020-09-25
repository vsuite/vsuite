import { RenderX } from '../utils';

type Placement = 'top' | 'bottom';

interface Removable {
  remove: () => void;
}

interface CloseCallback {
  (): void;
}

interface Option {
  key?: string;
  content?: RenderX;
  duration?: number;
  closable?: boolean;
  placement?: Placement;
  top?: number;
  bottom?: number;
  className?: string;
  style?: string | object;
  onClose?: CloseCallback;
}

interface Configuration {
  top?: number;
  bottom?: number;
  placement?: Placement;
  duration?: number;
  removeOnEmpty?: boolean;
}

export declare interface Alert {
  // default alert
  open(options: Option): Removable;
  open(content: RenderX): Removable;
  open(content: RenderX, duration: number): Removable;
  open(content: RenderX, onClose: CloseCallback): Removable;
  open(content: RenderX, options: Option): Removable;
  open(content: RenderX, duration: number, onClose: CloseCallback): Removable;
  open(content: RenderX, duration: number, options: Option): Removable;
  open(content: RenderX, onClose: CloseCallback, options: Option): Removable;
  open(
    content: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // loading alert
  loading(options: Option): Removable;
  loading(content: RenderX): Removable;
  loading(content: RenderX, duration: number): Removable;
  loading(content: RenderX, onClose: CloseCallback): Removable;
  loading(content: RenderX, options: Option): Removable;
  loading(
    content: RenderX,
    duration: number,
    onClose: CloseCallback
  ): Removable;
  loading(content: RenderX, duration: number, options: Option): Removable;
  loading(content: RenderX, onClose: CloseCallback, options: Option): Removable;
  loading(
    content: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // success alert
  success(options: Option): Removable;
  success(content: RenderX): Removable;
  success(content: RenderX, duration: number): Removable;
  success(content: RenderX, onClose: CloseCallback): Removable;
  success(content: RenderX, options: Option): Removable;
  success(
    content: RenderX,
    duration: number,
    onClose: CloseCallback
  ): Removable;
  success(content: RenderX, duration: number, options: Option): Removable;
  success(content: RenderX, onClose: CloseCallback, options: Option): Removable;
  success(
    content: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // info alert
  info(options: Option): Removable;
  info(content: RenderX): Removable;
  info(content: RenderX, duration: number): Removable;
  info(content: RenderX, onClose: CloseCallback): Removable;
  info(content: RenderX, options: Option): Removable;
  info(content: RenderX, duration: number, onClose: CloseCallback): Removable;
  info(content: RenderX, duration: number, options: Option): Removable;
  info(content: RenderX, onClose: CloseCallback, options: Option): Removable;
  info(
    content: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // warning alert
  warning(options: Option): Removable;
  warning(content: RenderX): Removable;
  warning(content: RenderX, duration: number): Removable;
  warning(content: RenderX, onClose: CloseCallback): Removable;
  warning(content: RenderX, options: Option): Removable;
  warning(
    content: RenderX,
    duration: number,
    onClose: CloseCallback
  ): Removable;
  warning(content: RenderX, duration: number, options: Option): Removable;
  warning(content: RenderX, onClose: CloseCallback, options: Option): Removable;
  warning(
    content: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  warn(options: Option): Removable;
  warn(content: RenderX): Removable;
  warn(content: RenderX, duration: number): Removable;
  warn(content: RenderX, onClose: CloseCallback): Removable;
  warn(content: RenderX, options: Option): Removable;
  warn(content: RenderX, duration: number, onClose: CloseCallback): Removable;
  warn(content: RenderX, duration: number, options: Option): Removable;
  warn(content: RenderX, onClose: CloseCallback, options: Option): Removable;
  warn(
    content: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // error alert
  error(options: Option): Removable;
  error(content: RenderX): Removable;
  error(content: RenderX, duration: number): Removable;
  error(content: RenderX, onClose: CloseCallback): Removable;
  error(content: RenderX, options: Option): Removable;
  error(content: RenderX, duration: number, onClose: CloseCallback): Removable;
  error(content: RenderX, duration: number, options: Option): Removable;
  error(content: RenderX, onClose: CloseCallback, options: Option): Removable;
  error(
    content: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // remove alert
  remove(key: string, placement: Placement);
  remove(key: string);

  // config alert
  config(options: Configuration, remove: boolean);
  config(options: Configuration);

  // destroy alert
  destroy(placement: Placement);
  destroy();
}
