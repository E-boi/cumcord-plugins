import { batchFind } from '@cumcord/modules/webpack';
import { constants, FluxDispatcher } from '@cumcord/modules/common';
import { darkenChat, undarkenChat } from './Popout';
import PlaceholderMessages from './PlaceholderMessages';
import { persist } from '@cumcord/pluginData';

const [
  { default: Message },
  { getMessages, getMessage },
  { fetchMessages },
  { divider, hasContent, content },
  { divider: divider2 },
  { MessageDisplayCompact },
  MessageGroup,
  { thin: scroller },
  { tabBar, tabBarItem },
  { DEFAULT_COMPACT_SPACING, DEFAULT_COZY_SPACING },
  { EmptyStateText, default: EmptyState },
  FluxTypingUsers,
  ThreadsPopout,
  TabBar,
] = batchFind(f => {
  f.findByProps('ThreadStarterChatMessage');
  f.findByProps('getMessages');
  f.findByProps('sendBotMessage');
  f.findByProps('divider', 'isUnread');
  f.findByProps('divider', 'hasContent');
  f.findByProps('MessageDisplayCompact');
  f.findByProps('messageGroupSpacing');
  f.findByProps('thin');
  f.findByProps('tabBar', 'tabBarItem');
  f.findByProps('MESSAGE_GROUP_SPACING');
  f.findByProps('EmptyStateText');
  f.findByDisplayName('FluxContainer(TypingUsers)');
  f.findByDisplayName('ActiveThreadsPopout');
  f.findByDisplayName('TabBar');
});
const INTERVAL = constants.MESSAGE_GROUP_INTERVAL / 1000;
const Types = constants.MessageTypes;
let currentGroupId;

export default class Messages extends React.PureComponent {
  constructor(props) {
    super();
    this.ref = React.createRef();
    const messages = getMessages(props.channel.id);
    this.state = {
      messages: messages.length === 0 && messages.ready ? null : messages.toArray().reverse().slice(0, 20).reverse(),
      tab: 'MESSAGES',
    };

    this.MESSAGE_CREATE = this.MESSAGE_CREATE.bind(this);
    this.MESSAGE_UPDATE = this.MESSAGE_UPDATE.bind(this);
    this.MESSAGE_DELETE = this.MESSAGE_DELETE.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    if (this.state.messages?.length === 0)
      fetchMessages({ channelId: this.props.channel.id, limit: 20 })?.then(ok => {
        if (!ok) return this.setState({ messages: null });
        const messages = getMessages(this.props.channel.id).toArray().reverse().slice(0, 20).reverse();
        if (messages.length === 0) return this.setState({ messages: null });
        this.setState({ messages });
        this.scrollToBottom();
      });
    else this.scrollToBottom();

    FluxDispatcher.subscribe('MESSAGE_CREATE', this.MESSAGE_CREATE);
    FluxDispatcher.subscribe('MESSAGE_UPDATE', this.MESSAGE_UPDATE);
    FluxDispatcher.subscribe('MESSAGE_DELETE', this.MESSAGE_DELETE);
  }

  componentWillUnmount() {
    FluxDispatcher.unsubscribe('MESSAGE_CREATE', this.MESSAGE_CREATE);
    FluxDispatcher.unsubscribe('MESSAGE_UPDATE', this.MESSAGE_UPDATE);
    FluxDispatcher.unsubscribe('MESSAGE_DELETE', this.MESSAGE_DELETE);
  }

  MESSAGE_CREATE(e) {
    if (this.props.channel.id !== e.channelId) return;
    this.setState(state => ({
      messages: [...state.messages, getMessage(this.props.channel.id, e.message.id)],
    }));
    this.scrollToBottom();
  }

  MESSAGE_UPDATE(e) {
    if (this.props.channel.id !== e.message.channel_id) return;
    this.setState(state => {
      const idx = state.messages.findIndex(m => m.id === e.message.id);
      if (idx < 0) return;
      state[idx] = getMessage(channel.id, e.message.id);
      return state;
    });
  }

  scrollToBottom() {
    if (this.ref.current) this.ref.current.scrollTop = this.ref.current.scrollHeight;
  }

  MESSAGE_DELETE(e) {
    if (this.props.channel.id !== e.channelId) return;
    this.setState(state => {
      const idx = state.messages.findIndex(m => m.id === e.id);
      if (idx < 0) return;
      delete state.messages[idx];
      return { ...e, messages: [...state.messages.filter(m => m)] };
    });
  }

  getGroupId(message) {
    const prevMess = this.state.messages.indexOf(message) === 0 ? null : this.state.messages[this.state.messages.indexOf(message) - 1];
    if (!prevMess) return (currentGroupId = message.id);

    return message.author.id !== prevMess.author.id ||
      message.type !== Types.DEFAULT ||
      ![Types.DEFAULT, Types.REPLY].includes(prevMess.type) ||
      Math.abs(prevMess.timestamp.unix() - message.timestamp.unix()) > INTERVAL ||
      !message.timestamp.isSame(prevMess.timestamp, 'day')
      ? (currentGroupId = message.id)
      : currentGroupId;
  }

  sortMessages() {
    const { messages } = this.state;
    const elms = [];

    messages.forEach(m => {
      const groupId = this.getGroupId(m);

      const prevMess = messages.indexOf(m) === 0 ? null : messages[messages.indexOf(m) - 1];
      if (!prevMess || !m.timestamp.isSame(prevMess.timestamp, 'day')) elms.push(<Divider timestamp={m.timestamp} />);

      const compact =
        (persist.ghost.displayMode || 'sync') === 'sync'
          ? MessageDisplayCompact.getSetting()
          : persist.ghost.displayMode === 'compact'
          ? true
          : false;

      elms.push(<Message compact={compact} channel={this.props.channel} message={m} groupId={groupId} id={`chat-messages-${m.id}`} />);
    });

    return elms;
  }

  renderMessagesPopout() {
    const compact =
      (persist.ghost.displayMode || 'sync') === 'sync' ? MessageDisplayCompact.getSetting() : persist.ghost.displayMode === 'compact' ? true : false;
    const groupSpacing =
      persist.ghost.groupSpacing ?? 'sync'
        ? MessageGroup.messageGroupSpacing
        : persist.ghost.groupSpacingNum ?? compact
        ? DEFAULT_COMPACT_SPACING
        : DEFAULT_COZY_SPACING;

    return (
      <div className={['cc-ChannelPreview', `group-spacing-${groupSpacing}`, scroller].join(' ')} ref={this.ref}>
        {!this.state.messages ? (
          <EmptyState>
            <EmptyStateText note='This channel has no messages' />
          </EmptyState>
        ) : this.state.messages.length === 0 ? (
          <PlaceholderMessages amount={10} />
        ) : (
          <div className='cc-ChannelPreviewTyping'>
            {this.sortMessages()}
            {(persist.ghost.typingUsers ?? true) && <FluxTypingUsers channel={this.props.channel} />}
          </div>
        )}
      </div>
    );
  }

  renderThreadPopout() {
    return (
      <div className='cc-ChannelPreviewThreadPopout'>
        <ThreadsPopout {...this.props.popout} channel={this.props.channel} />
      </div>
    );
  }

  renderContent() {
    if (this.state.tab === 'MESSAGES') return this.renderMessagesPopout();
    else if (this.state.tab === 'THREADS') return this.renderThreadPopout();
  }

  render() {
    return (
      <div onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
        {(persist.ghost.tabs ?? true) && !this.props.dm && (
          <TabBar
            className={['cc-ChannelPreviewTabBar', tabBar].join(' ')}
            selectedItem={this.state.tab}
            onItemSelect={item => this.setState({ tab: item })}
            look={TabBar.Looks.BRAND}
            type={TabBar.Types.TOP}
          >
            <TabBar.Item className={tabBarItem} id='MESSAGES'>
              Messages
            </TabBar.Item>
            <TabBar.Item className={tabBarItem} id='THREADS'>
              Threads
            </TabBar.Item>
          </TabBar>
        )}

        {this.renderContent()}
      </div>
    );
  }
}

const Divider = ({ timestamp }) => (
  <div className={[divider, hasContent, divider2, 'cc-ChannePreviewDivider'].join(' ')} aria-label={timestamp.format('LL')} role='separator'>
    <span className={content}>{timestamp.format('LL')}</span>
  </div>
);
