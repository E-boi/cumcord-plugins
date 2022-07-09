import css from './style.css';
import PeopleList from './patches/PeopleList';
import TabBar from './patches/TabBar';
import FriendRow from './patches/FriendRow';
import settings from './settings';

const injections = [];

export default {
  onLoad() {
    injections.push(css(), PeopleList(), TabBar(), FriendRow());
  },
  onUnload() {
    injections.forEach(i => i?.());
  },
  settings,
};
