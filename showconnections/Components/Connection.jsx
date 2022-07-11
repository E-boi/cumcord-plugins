import { webpack } from '@cumcord/modules';
import { i18n } from '@cumcord/modules/common';

const { TooltipContainer } = webpack.findByProps('TooltipContainer');
const { get, isSupported } = webpack.findByProps('get', 'isSupported');

export default ({ account }) => {
  if (!isSupported(account.type)) return null;
  const connection = get(account.type);
  return (
    <TooltipContainer className='sc-connection' text={account.name}>
      <a target='_blank' href={connection.getPlatformUserUrl?.(account)}>
        <img alt={i18n.Messages.IMG_ALT_LOGO.format({ name: connection?.name })} src={connection?.icon?.darkSVG} />
      </a>
    </TooltipContainer>
  );
};
