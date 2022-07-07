import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';
import { React } from '@cumcord/modules/common';
import { after } from '@cumcord/patcher';
import { findInReactTree } from '@cumcord/utils';
import { Pin, Tooltip } from '../components';
import { getSetting, setupContextMenu } from '../utils';
import Channel from '../components/Channel';
import CategoryTitle from '../components/CategoryTitle';

const { default: PrivateChannel } = findByProps('DirectMessage');
const ConnectedPrivateChannelsList = findByDisplayName('ConnectedPrivateChannelsList', false);
const { openContextMenu } = findByProps('openContextMenu');
const { lastMessageId } = findByProps('lastMessageId');

export default function () {
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
              const menu = setupContextMenu(this.props.channel);
              openContextMenu(e, () => menu);
            },
            icon: Pin,
          })
        );
        children.props.children.props.children.splice(1, 0, pin);
        return children;
      };
      return res;
    })
  );
  this.injections.push(
    after('default', ConnectedPrivateChannelsList, (_, res) => {
      const props = findInReactTree(res, e => e?.privateChannelIds);
      if (!props) return res;
      const idList = [];
      const categories = getSetting('categories', []);

      categories.forEach(cat => idList.push(...cat.dms));

      props.privateChannelIds = props.privateChannelIds.filter(id => !idList.includes(id));
      props.children = [...props.children];

      categories.forEach(category => {
        const title = React.createElement(CategoryTitle, { category });
        props.children.push(title);
        if (!category.collapsed) {
          const dms = category.dms
            .sort((a, b) => lastMessageId(b) - lastMessageId(a))
            .map(id => React.createElement(Channel, { channelId: id, selected: props.selectedChannelId === id }));

          props.children.push(...dms);
        } else if (category.dms.includes(props.selectedChannelId)) {
          const dm = category.dms.find(id => id === props.selectedChannelId);
          if (!dm) return; // idk why not
          props.children.push(React.createElement(Channel, { channelId: dm, selected: true }));
        }
      });
      return res;
    })
  );
}
