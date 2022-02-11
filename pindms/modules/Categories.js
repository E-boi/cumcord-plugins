import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';
import { React } from '@cumcord/modules/common';
import { after } from '@cumcord/patcher';
import { Pin, Tooltip } from '../components';
import { setupContextMenu } from '../utils';
import Channel from '../components/Channel';
import CategoryTitle from '../components/CategoryTitle';

const { default: PrivateChannel } = findByProps('DirectMessage');
const ConnectedPrivateChannelsList = findByDisplayName('ConnectedPrivateChannelsList', false);
const { openContextMenu } = findByProps('openContextMenu');
const { lastMessageId } = findByProps('lastMessageId');

export default function () {
  const _this = this;
  this.injections.push(
    after('render', PrivateChannel.prototype, function (_, res) {
      const children = res.props.children({ role: 'listitem' });
      res.props.children = () => {
        const pin = React.createElement(
          Tooltip,
          { text: 'Pin', position: 'top' },
          React.createElement(Pin, {
            className: 'cc-pd-pin',
            onClick: e => {
              e.preventDefault();
              const menu = setupContextMenu(this.props.channel, _this.settings);
              openContextMenu(e, () => menu);
            },
            icon: Pin,
          })
        );
        children.props.children.props.children.splice(1, 0, pin);
        console.log(children);
        return children;
      };
      return res;
    })
  );
  this.injections.push(
    after('default', ConnectedPrivateChannelsList, (args, res) => {
      const idList = [];
      const selected = res.props.children.props.selectedChannelId;
      const categories = this.settings.get('categories', []);

      categories.forEach(cat => idList.push(...cat.dms));

      res.props.children.props.privateChannelIds = res.props.children.props.privateChannelIds.filter(id => !idList.includes(id));
      res.props.children.props.children = [...res.props.children.props.children];

      categories.forEach(category => {
        const title = React.createElement(CategoryTitle, { category, settings: this.settings });
        res.props.children.props.children.push(title);
        if (!category.collapsed) {
          const dms = category.dms
            .sort((a, b) => lastMessageId(b) - lastMessageId(a))
            .map(id => React.createElement(Channel, { channelId: id, selected: selected === id }));

          res.props.children.props.children.push(...dms);
        } else if (category.dms.includes(selected)) {
          const dm = category.dms.find(id => id === selected);
          if (!dm) return; // idk why not
          res.props.children.props.children.push(React.createElement(Channel, { channelId: dm, selected }));
        }
      });
      return res;
    })
  );
}
