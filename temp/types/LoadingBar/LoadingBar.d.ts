interface Configuration {
  color: string;
  failedColor: string;
  height: number;
  progress: boolean;
}

export default interface LoadingBar {
  start: () => void;

  finish: () => void;

  error: () => void;

  config: (options: Configuration) => void;
}
