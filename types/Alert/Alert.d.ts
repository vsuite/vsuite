import { RenderX } from '../utils';

type Placement = 'top' | 'bottom';

interface Removable {
  remove: () => void;
}

interface CloseCallback {
  (): void;
}

interface Options {
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
}

export declare interface Alert {
  // default alert
  open(content: RenderX, duration: number, onClose: CloseCallback): Removable;
  open(content: RenderX, duration: number, options: Options): Removable;
  open(content: RenderX, options: Options): Removable;
  open(options: Options): Removable;

  // loading alert
  loading(
    content: RenderX,
    duration: number,
    onClose: CloseCallback
  ): Removable;
  loading(content: RenderX, duration: number, options: Options): Removable;
  loading(content: RenderX, options: Options): Removable;
  loading(options: Options): Removable;

  // success alert
  success(
    content: RenderX,
    duration: number,
    onClose: CloseCallback
  ): Removable;
  success(content: RenderX, duration: number, options: Options): Removable;
  success(content: RenderX, options: Options): Removable;
  success(options: Options): Removable;

  // info alert
  info(content: RenderX, duration: number, onClose: CloseCallback): Removable;
  info(content: RenderX, duration: number, options: Options): Removable;
  info(content: RenderX, options: Options): Removable;
  info(options: Options): Removable;

  // warning alert
  warning(
    content: RenderX,
    duration: number,
    onClose: CloseCallback
  ): Removable;
  warning(content: RenderX, duration: number, options: Options): Removable;
  warning(content: RenderX, options: Options): Removable;
  warning(options: Options): Removable;

  warn(content: RenderX, duration: number, onClose: CloseCallback): Removable;
  warn(content: RenderX, duration: number, options: Options): Removable;
  warn(content: RenderX, options: Options): Removable;
  warn(options: Options): Removable;

  // error alert
  error(content: RenderX, duration: number, onClose: CloseCallback): Removable;
  error(content: RenderX, duration: number, options: Options): Removable;
  error(content: RenderX, options: Options): Removable;
  error(options: Options): Removable;

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
