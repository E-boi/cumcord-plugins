import { batchFind } from '@cumcord/modules/webpack';

const [{ GuildIcon }, { TooltipContainer }] = batchFind(({ findByDisplayName, findByProps }) => {
  findByProps('GuildIcon');
  findByDisplayName('Tooltip', false);
});

export default ({ guilds }) => (
  <div className='ccbfl-guilds'>
    {guilds.map(guild => (
      <TooltipContainer text={guild.name} position='bottom'>
        <GuildIcon
          guild={guild}
          size={GuildIcon.Sizes.SMALLER}
          style={guild.icon && { backgroundImage: `url("https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=256")` }}
        />
      </TooltipContainer>
    ))}
  </div>
);
