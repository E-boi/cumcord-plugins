import { batchFind, findByProps } from '@cumcord/modules/webpack';
import { after, injectCSS } from '@cumcord/patcher';
import { persist } from '@cumcord/pluginData';
import { findInReactTree } from '@cumcord/utils';
import Popout, { undarkenChat } from './components/Popout';
import Settings from './components/Settings';
import css from './style.css';

const [TextChannel, ChannelItem, PrivateChannel, ChannelList] = batchFind(f => {
  f.findByDisplayName('ConnectedTextChannel', false);
  f.findByDisplayName('ChannelItem', false);
  f.findByDisplayName('PrivateChannel');
  f.findByProps('GuildChannelList');
});
const injections = [];

const moreCss = `
.${findByProps('chat').chat},
.${findByProps('tabBody').container} {
  --darken-opacity: 1;
  opacity: var(--darken-opacity);
  transition: 0.3s opacity;
}`;

export default {
  onLoad() {
    injections.push(
      after('default', TextChannel, function (_, res) {
        let a = after(
          'render',
          res.type.DecoratedComponent.prototype,
          function (_, res) {
            if (![15, 14, 4, 13].includes(this.props.channel.type) && res.props?.children?.props?.children && !res.props?.children?.props?.res)
              res.props.children = <Popout res={res} item={res.props.children.props.children} channelId={this.props.channel.id} />;

            a();
            return res;
          },
          true
        );
        return res;
      })
    );

    injections.push(
      after('default', ChannelItem, (args, res) => {
        if (persist.ghost.displayOn === 'mwheel') {
          const clickable = getClickable(res);
          if (clickable?.ref?.current) clickable.ref.current.onauxclick = e => e.preventDefault();
        }
        return res;
      })
    );

    injections.push(
      after('render', PrivateChannel.prototype, (_, res) => {
        after('children', res.props, (_, r1) => <Popout res={r1} dm={true} channelId={res.props.id} />, true);
        return res;
      })
    );

    injections.push(css(), injectCSS(moreCss));
    this.setVars();
  },
  onUnload() {
    undarkenChat();
    this.setVars(true);
    injections.forEach(i => i?.());
  },
  settings: Settings,
  setVars(clear) {
    if (clear) {
      document.body.style.removeProperty('--popout-height');
      document.body.style.removeProperty('--popout-width');
    }
    document.body.style.setProperty('--popout-height', `${persist.ghost.hpopout || 30}vh`);
    document.body.style.setProperty('--popout-width', `${persist.ghost.wpopout || 40}vh`);
  },
};

function getClickable(obj) {
  let result = null;
  for (const key in obj)
    if (obj[key] && typeof obj[key] === 'object')
      if (obj[key].props?.onClick && obj[key].props?.role === 'link') result = obj[key] ?? result;
      else if (shouldDescend(key)) result = getClickable(obj[key]) ?? result;

  return result;
}

function shouldDescend(key) {
  return key === 'props' || key === 'children' || !isNaN(key);
}
