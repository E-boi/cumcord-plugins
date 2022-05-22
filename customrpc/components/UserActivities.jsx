import { findByProps } from '@cumcord/modules/webpack';
import { ActivityContainer, ScrollerThin } from '.';

const ActivityStore = findByProps('getActivities');
const { useStateFromStores } = findByProps('useStateFromStores');

export default ({ user }) => {
  const activites = useStateFromStores([ActivityStore], () => ActivityStore.getActivities(user.id));

  return (
    <ScrollerThin className='userProfileScroll-crpc'>
      {activites.map(activity => (
        <ActivityContainer
          type='Profile'
          activity={activity}
          user={user}
          source='Profile Modal'
          className={['userProfile-crpc', 'newProfileActivityStyles'].join(' ')}
        >
          {activity.application_id} - {activity.session_id} - {activity.name}
        </ActivityContainer>
      ))}
    </ScrollerThin>
  );
};
