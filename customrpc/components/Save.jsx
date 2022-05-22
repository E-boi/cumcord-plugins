import { findByProps } from '@cumcord/modules/webpack';
import { Notice, SlideIn, TransitionGroup } from '.';

const { noticeRegion } = findByProps('noticeRegion');

export default ({ onReset, onSave }) => (
  <TransitionGroup>
    <SlideIn className={[noticeRegion, 'crpc-notice'].join(' ')}>
      <Notice onReset={onReset} onSave={onSave} theme='dark' />
    </SlideIn>
  </TransitionGroup>
);
