import { findByDisplayName } from '@cumcord/modules/webpack';
import { i18n } from '@cumcord/modules/common';
import { before } from '@cumcord/patcher';
import Settings from './Settings';

const Slider = findByDisplayName('Slider');
let injection;

export default ({ persist }) => ({
  onLoad() {
    injection = before('render', Slider.prototype, function (args) {
      if (this.props?.['aria-label'] !== i18n.Messages.USER_VOLUME) return args;
      this.props.maxValue = persist.ghost.max ?? 400;
      this.state.max = persist.ghost.max ?? 400;
      this.state.range = persist.ghost.max ?? 400;
      this.state.value = this.state.initialValueProp;
      return args;
    });
  },
  onUnload() {
    injection?.();
  },
  settings: Settings,
});
