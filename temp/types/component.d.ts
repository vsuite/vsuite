import Vue from 'vue';

export declare class VComponent extends Vue {
  static install(vue: typeof Vue): void;

  /**
   * The prefix of the component CSS class
   *
   * @type: string
   */
  classPrefix: string;
}
