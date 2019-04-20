import VueTypes from 'vue-types';

export const IconX = VueTypes.oneOfType([
  VueTypes.string,
  VueTypes.shape({ viewBox: VueTypes.string, id: VueTypes.string }),
]).loose;
