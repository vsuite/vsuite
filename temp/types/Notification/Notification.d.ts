import { RenderX } from '../utils';

type Placement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

interface Removable {
  remove: () => void;
}

interface CloseCallback {
  (): void;
}

interface Option {
  key?: string;
  title?: RenderX;
  description?: RenderX;
  duration?: number;
  closable?: number;
  placement?: Placement;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  className?: string;
  style?: string | object;
  onClose?: CloseCallback;
}

interface Configuration {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  placement?: Placement;
  duration?: number;
  removeOnEmpty?: boolean;
}

export default interface Notification {
  // default notification
  open(options: Option);
  open(title: RenderX);
  open(title: RenderX, description: RenderX): Removable;
  open(title: RenderX, duration: number): Removable;
  open(title: RenderX, onClose: CloseCallback): Removable;
  open(title: RenderX, options: Option): Removable;
  open(title: RenderX, description: RenderX, duration: number): Removable;
  open(title: RenderX, description: RenderX, onClose: CloseCallback): Removable;
  open(title: RenderX, description: RenderX, options: Option): Removable;
  open(title: RenderX, duration: number, onClose: CloseCallback): Removable;
  open(title: RenderX, duration: number, options: Option): Removable;
  open(title: RenderX, onClose: CloseCallback, options: Option): Removable;
  open(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback
  ): RenderX;
  open(
    title: RenderX,
    description: RenderX,
    duration: number,
    options: Option
  ): Removable;
  open(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback,
    options: Option
  ): Removable;
  open(
    title: RenderX,
    duration: number,
    onClose: CloseCallback,
    option: Option
  ): Removable;
  open(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // loading notification
  loading(options: Option);
  loading(title: RenderX);
  loading(title: RenderX, description: RenderX): Removable;
  loading(title: RenderX, duration: number): Removable;
  loading(title: RenderX, onClose: CloseCallback): Removable;
  loading(title: RenderX, options: Option): Removable;
  loading(title: RenderX, description: RenderX, duration: number): Removable;
  loading(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback
  ): Removable;
  loading(title: RenderX, description: RenderX, options: Option): Removable;
  loading(title: RenderX, duration: number, onClose: CloseCallback): Removable;
  loading(title: RenderX, duration: number, options: Option): Removable;
  loading(title: RenderX, onClose: CloseCallback, options: Option): Removable;
  loading(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback
  ): RenderX;
  loading(
    title: RenderX,
    description: RenderX,
    duration: number,
    options: Option
  ): Removable;
  loading(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback,
    options: Option
  ): Removable;
  loading(
    title: RenderX,
    duration: number,
    onClose: CloseCallback,
    option: Option
  ): Removable;
  loading(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // success notification
  success(options: Option);
  success(title: RenderX);
  success(title: RenderX, description: RenderX): Removable;
  success(title: RenderX, duration: number): Removable;
  success(title: RenderX, onClose: CloseCallback): Removable;
  success(title: RenderX, options: Option): Removable;
  success(title: RenderX, description: RenderX, duration: number): Removable;
  success(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback
  ): Removable;
  success(title: RenderX, description: RenderX, options: Option): Removable;
  success(title: RenderX, duration: number, onClose: CloseCallback): Removable;
  success(title: RenderX, duration: number, options: Option): Removable;
  success(title: RenderX, onClose: CloseCallback, options: Option): Removable;
  success(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback
  ): RenderX;
  success(
    title: RenderX,
    description: RenderX,
    duration: number,
    options: Option
  ): Removable;
  success(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback,
    options: Option
  ): Removable;
  success(
    title: RenderX,
    duration: number,
    onClose: CloseCallback,
    option: Option
  ): Removable;
  success(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // info notification
  info(options: Option);
  info(title: RenderX);
  info(title: RenderX, description: RenderX): Removable;
  info(title: RenderX, duration: number): Removable;
  info(title: RenderX, onClose: CloseCallback): Removable;
  info(title: RenderX, options: Option): Removable;
  info(title: RenderX, description: RenderX, duration: number): Removable;
  info(title: RenderX, description: RenderX, onClose: CloseCallback): Removable;
  info(title: RenderX, description: RenderX, options: Option): Removable;
  info(title: RenderX, duration: number, onClose: CloseCallback): Removable;
  info(title: RenderX, duration: number, options: Option): Removable;
  info(title: RenderX, onClose: CloseCallback, options: Option): Removable;
  info(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback
  ): RenderX;
  info(
    title: RenderX,
    description: RenderX,
    duration: number,
    options: Option
  ): Removable;
  info(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback,
    options: Option
  ): Removable;
  info(
    title: RenderX,
    duration: number,
    onClose: CloseCallback,
    option: Option
  ): Removable;
  info(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // warning notification
  warning(options: Option);
  warning(title: RenderX);
  warning(title: RenderX, description: RenderX): Removable;
  warning(title: RenderX, duration: number): Removable;
  warning(title: RenderX, onClose: CloseCallback): Removable;
  warning(title: RenderX, options: Option): Removable;
  warning(title: RenderX, description: RenderX, duration: number): Removable;
  warning(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback
  ): Removable;
  warning(title: RenderX, description: RenderX, options: Option): Removable;
  warning(title: RenderX, duration: number, onClose: CloseCallback): Removable;
  warning(title: RenderX, duration: number, options: Option): Removable;
  warning(title: RenderX, onClose: CloseCallback, options: Option): Removable;
  warning(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback
  ): RenderX;
  warning(
    title: RenderX,
    description: RenderX,
    duration: number,
    options: Option
  ): Removable;
  warning(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback,
    options: Option
  ): Removable;
  warning(
    title: RenderX,
    duration: number,
    onClose: CloseCallback,
    option: Option
  ): Removable;
  warning(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  warn(options: Option);
  warn(title: RenderX);
  warn(title: RenderX, description: RenderX): Removable;
  warn(title: RenderX, duration: number): Removable;
  warn(title: RenderX, onClose: CloseCallback): Removable;
  warn(title: RenderX, options: Option): Removable;
  warn(title: RenderX, description: RenderX, duration: number): Removable;
  warn(title: RenderX, description: RenderX, onClose: CloseCallback): Removable;
  warn(title: RenderX, description: RenderX, options: Option): Removable;
  warn(title: RenderX, duration: number, onClose: CloseCallback): Removable;
  warn(title: RenderX, duration: number, options: Option): Removable;
  warn(title: RenderX, onClose: CloseCallback, options: Option): Removable;
  warn(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback
  ): RenderX;
  warn(
    title: RenderX,
    description: RenderX,
    duration: number,
    options: Option
  ): Removable;
  warn(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback,
    options: Option
  ): Removable;
  warn(
    title: RenderX,
    duration: number,
    onClose: CloseCallback,
    option: Option
  ): Removable;
  warn(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback,
    options: Option
  ): Removable;

  // error notification
  error(options: Option);
  error(title: RenderX);
  error(title: RenderX, description: RenderX): Removable;
  error(title: RenderX, duration: number): Removable;
  error(title: RenderX, onClose: CloseCallback): Removable;
  error(title: RenderX, options: Option): Removable;
  error(title: RenderX, description: RenderX, duration: number): Removable;
  error(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback
  ): Removable;
  error(title: RenderX, description: RenderX, options: Option): Removable;
  error(title: RenderX, duration: number, onClose: CloseCallback): Removable;
  error(title: RenderX, duration: number, options: Option): Removable;
  error(title: RenderX, onClose: CloseCallback, options: Option): Removable;
  error(
    title: RenderX,
    description: RenderX,
    duration: number,
    onClose: CloseCallback
  ): RenderX;
  error(
    title: RenderX,
    description: RenderX,
    duration: number,
    options: Option
  ): Removable;
  error(
    title: RenderX,
    description: RenderX,
    onClose: CloseCallback,
    options: Option
  ): Removable;
  error(
    title: RenderX,
    duration: number,
    onClose: CloseCallback,
    option: Option
  ): Removable;
  error(
    title: RenderX,
    description: RenderX,
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
