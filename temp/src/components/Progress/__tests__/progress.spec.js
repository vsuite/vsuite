import { mount } from '@vue/test-utils';
import Progress from 'components/Progress';

describe('Progress Component', () => {
  it('should have correct percent value', done => {
    const $wrapper = mount({
      data() {
        return { percent: 30 };
      },

      render() {
        return (
          <div>
            <button class="minus" onClick={this._handleMinus}>
              -
            </button>
            <button class="add" onClick={this._handleAdd}>
              +
            </button>
            <hr />
            <Progress.Line percent={this.percent} />
            <Progress.Circle percent={this.percent} />
          </div>
        );
      },

      methods: {
        _handleMinus() {
          this.percent = this.percent - 10 <= 0 ? 0 : this.percent - 10;
        },
        _handleAdd() {
          this.percent = this.percent + 10 >= 100 ? 100 : this.percent + 10;
        },
      },
    });
    const $minusBtn = $wrapper.find('button.minus');
    const $addBtn = $wrapper.find('button.add');
    const $line = $wrapper.find(Progress.Line);
    const $circle = $wrapper.find(Progress.Circle);

    expect($line.props('percent')).toBe(30);
    expect($circle.props('percent')).toBe(30);

    $addBtn.trigger('click');

    $wrapper.vm.$nextTick(() => {
      expect($line.props('percent')).toBe(40);
      expect($circle.props('percent')).toBe(40);

      $minusBtn.trigger('click');

      $wrapper.vm.$nextTick(() => {
        expect($line.props('percent')).toBe(30);
        expect($circle.props('percent')).toBe(30);

        done();
      });
    });
  });
});
