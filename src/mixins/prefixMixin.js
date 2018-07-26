import prefix, { defaultClassPrefix } from 'utils/prefix';

export default cls => ({
  data() {
    return {
      classPrefix: defaultClassPrefix(cls),
    };
  },

  methods: {
    addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
});
