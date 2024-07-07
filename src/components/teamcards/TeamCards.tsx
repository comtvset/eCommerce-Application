import style from 'src/components/teamcards/TeamCards.module.scss';

interface PersonalCardProps {
  photo: string;
  name: string;
  title: string;
  biography: string;
  linkedIn: string;
  github: string;
  features: string;
  challenge: string;
  ideas?: string;
}
export const PersonalCard: React.FC<PersonalCardProps> = ({
  photo,
  name,
  title,
  biography,
  linkedIn,
  github,
  features,
  challenge,
  ideas,
}) => {
  return (
    <div className={style.card}>
      <div className={style.photo}>
        <img src={photo} alt="PersonalPhoto" />
      </div>
      <h2>{name}</h2>
      <h3>{title}</h3>
      <p className={style.bio}>{biography}</p>
      <div className={style.constacts}>
        <h2>Constacts:</h2>
        <ul>
          <li>
            <a href={linkedIn}>LinkedIn</a>
          </li>
          <li>
            <a href={github}>GitHub</a>
          </li>
        </ul>
      </div>
      <div className={style.contribution}>
        <h2>Features:</h2>
        <div>{features}</div>
        <h2>Challenges:</h2>
        <div>{challenge}</div>
        {ideas && <h2>Innovative ideas:</h2>}
        {ideas && <div>{ideas}</div>}
      </div>
    </div>
  );
};
