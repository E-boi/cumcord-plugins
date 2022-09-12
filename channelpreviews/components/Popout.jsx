import { batchFind } from '@cumcord/modules/webpack';
import { channels } from '@cumcord/modules/common';
import Messages from './Messages';
import { persist } from '@cumcord/pluginData';
import { Events } from '@cumcord/modules/internal/nests';

const [DPopout, { chat }, { getChannel }] = batchFind(f => {
  f.findByDisplayName('Popout');
  f.findByProps('chat');
  f.findByProps('getDMFromUserId');
});

// using class components because it feels more orginized
export default class extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      show: false,
    };
    this.enterTimer = 0;
    this.exitTimer = 0;

    this.channel = getChannel(props.channelId);
    this.nestUpdate = this.nestUpdate.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handlePopoutOpen = this.handlePopoutOpen.bind(this);
  }

  nestUpdate() {
    this.forceUpdate();
  }

  componentDidMount() {
    try {
      persist.on(Events.UPDATE, this.nestUpdate);
      persist.on(Events.SET, this.nestUpdate);
      persist.on(Events.DELETE, this.nestUpdate);
    } catch {}
  }

  componentWillUnmount() {
    undarkenChat();
    persist.off(Events.UPDATE, this.nestUpdate);
    persist.off(Events.SET, this.nestUpdate);
    persist.off(Events.DELETE, this.nestUpdate);
  }

  handleMouseEnter() {
    this.resetPopoutTimers();
    if (this.channel.id === channels.getChannelId()) return;
    this.enterTimer = setTimeout(() => {
      this.setState({ show: true });
      setTimeout(() => darkenChat());
    }, (persist.ghost.delay || 0.3) * 1000);
  }

  handleMouseLeave() {
    this.resetPopoutTimers();
    this.exitTimer = setTimeout(() => {
      this.setState({ show: false });
      undarkenChat();
    }, 300);
  }

  handlePopoutClose() {
    this.resetPopoutTimers();
    this.setState({ show: false });
    undarkenChat();
  }

  handlePopoutOpen() {
    this.resetPopoutTimers();
    this.setState({ show: true });
    setTimeout(() => darkenChat(), this.state.show ? 300 : 0);
  }

  renderPopout(p) {
    return <Messages popout={p} onMouseEnter={this.handlePopoutOpen} onClose={this.handlePopoutClose.bind(this)} channel={this.channel} />;
  }

  resetPopoutTimers() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.exitTimer);
  }

  render() {
    if ((persist.ghost.displayOn || 'hover') === 'hover') {
      this.props.res.props.onMouseEnter = this.handleMouseEnter;
      this.props.res.props.onMouseDown = null;
    } else {
      this.props.res.props.onMouseDown = e => e.button === 1 && this.handlePopoutOpen();
      this.props.res.props.onMouseEnter = () => this.state.show && this.handlePopoutOpen();
    }
    this.props.res.props.onMouseLeave = this.handleMouseLeave;

    return (
      <DPopout
        nudgeAlignIntoViewport
        autoInvert
        renderPopout={this.renderPopout.bind(this)}
        shouldShow={!!this.state.show}
        spacing={20}
        onRequestClose={this.handlePopoutClose.bind(this)}
        align={DPopout.Align.CENTER}
        animation={DPopout.Animation.TRANSLATE}
      >
        {(_, l) => {
          const e = this.props.item();
          e.props.onClick = this.handlePopoutClose.bind(this);
          if (l.isShown) e.props.selected = true;
          return e;
        }}
      </DPopout>
    );
  }
}

export function darkenChat() {
  document.querySelector(`.${chat}`)?.style.setProperty('--darken-opacity', new String(persist.ghost.opacity ?? 0.3));
}

export function undarkenChat() {
  document.querySelector(`.${chat}`)?.removeAttribute('style');
}
