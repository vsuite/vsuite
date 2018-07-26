<template>
  <button
    v-if="!href"
    :class="classes"
    :disabled="disabled"
    @click="_onClick"
  >
    <span :class="addPrefix('spin')"/>
    <slot/>
  </button>
  <safe-anchor
    v-else
    :class="classes"
    :href="href"
    @click="_onClick"
  >
    <span :class="addPrefix('spin')"/>
    <slot/>
  </safe-anchor>
</template>

<script>
import SafeAnchor from 'components/SafeAnchor';
import cls from 'classnames';
import { validateSize, validateColor, validateEnum } from 'utils/props';
import prefixMixin from 'mixins/prefixMixin';

const CLASS_PREFIX = 'btn';

export default {
  name: 'Button',

  components: { SafeAnchor },

  props: {
    active: Boolean,
    disabled: Boolean,
    loading: Boolean,
    block: Boolean,
    size: {
      validator: validateSize,
      default: 'md',
    },
    type: {
      validator: validateEnum([
        'default',
        'primary',
        'link',
        'subtle',
        'ghost',
      ]),
      default: 'default',
    },
    color: { validator: validateColor },
    href: String,
  },

  mixins: [prefixMixin(CLASS_PREFIX)],

  data() {
    return {};
  },

  computed: {
    classes() {
      return cls([
        this.classPrefix,
        this.addPrefix(this.type),
        {
          [this.addPrefix(this.color)]: this.color,
          [this.addPrefix(this.size)]: this.size,
          [this.addPrefix('active')]: this.active,
          [this.addPrefix('disabled')]: this.disabled,
          [this.addPrefix('loading')]: this.loading,
          [this.addPrefix('block')]: this.block,
        },
      ]);
    },
  },

  methods: {
    _onClick() {
      this.$emit('click');
    },
  },
};
</script>
