import style from 'src/components/form/aboutUS/AboutUSForm.module.scss';
import { PersonalCard } from 'src/components/teamcards/TeamCards.tsx';

export const AboutUS: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <div className={style.rsslogo}>
          <a href="https://rs.school/" target="_blank" rel="noreferrer">
            <img src="src/public/rs_school_js.svg" alt="rss logo" />
          </a>
        </div>
        <h1>About Us - Dream Team</h1>

        <div className={style.teamlogo}>
          <img src="src/public/DreamTeamLogo.jpg" alt="DreamTeam Logo" />
        </div>
      </header>
      <p className={style.about_team}>
        We are a team of three Junior Frontend Developers from RSS School, working on our final
        e-commerce shop project. We follow Scrum methodology, use Jira for project management, and
        Confluence for documentation. Our daily standups are at 10 AM UTC+2. Our comprehensive
        project documentation includes role descriptions, project architecture, MoMs, and other
        essential information. Basic communication channel is Discord/DreamTeam server.
      </p>

      <div className={style.profile_cards}>
        <div className={style.technology}>
          {' '}
          <h2> Technology:</h2>
          <ul>
            <li>TypeScript</li>
            <li>React</li>
            <li>Vite</li>
            <li>SCSS</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>CommerceTools</li>
            <li>Linters</li>
            <li>Husky</li>
            <li>gitHub</li>
          </ul>
        </div>
        <PersonalCard
          photo="src/public/DreamTeam/Vadzim.png"
          name="Vadzim Tsikhaniuk"
          title="TeamLead / Junior FE"
          biography="I am passionate about frontend development and eager to gain experience working on real projects within a team. I am studying JavaScript through RSSchool and ChatGPT, while also learning English and Polish. Every day, I acquire new knowledge and look to the future with optimism."
          linkedIn="https://www.linkedin.com/in/vadzim-tsikhaniuk-69643b155/"
          github="https://github.com/comtvset"
          features="Login pages, Main page 🏠, Catalog Product page 📋,  Basket page"
          challenge="Token, ecommercetools"
          ideas=""
        />
        <PersonalCard
          photo="src/public/DreamTeam/MargoLIn.png"
          name="Margarita Masko"
          title="Junior FE Developer"
          biography="I am a budding frontend developer. This field has captured my heart. After completing courses in UX/UI design, I decided to bring my own website design to life — and that marked the beginning of my journey in development. I am constantly working on improving my skills. Additionally, I am actively studying English to expand my professional horizons and enhance my communication skills."
          linkedIn="https://www.linkedin.com/in/margarita-masko-032011248/"
          github="https://github.com/margo06"
          features="Routing, Header, Detailed Product page 🔎, Basket page"
          challenge="ecommercetools"
          ideas="React components: Slider, Router"
        />
        <PersonalCard
          photo="src/public/DreamTeam/Maria.png"
          name="Maria Akulova"
          title="Scrum Master / Junior FE Developer"
          biography="With 18 years of diverse IT experience, I have held roles ranging from Junior Java Developer to Lead Manual QA, Lead Automation QA, and QA Manager. I am certified as a ScrumMaster, Product Owner, and in SAFe and ISTQB, and have not completed Project Management courses. I am now pursuing a position as a Junior Frontend Developer to bring my extensive background and dedication to a new area of expertise."
          linkedIn="https://www.linkedin.com/in/maria-akulova-96b12220/"
          github="https://github.com/maria-akulova"
          features="Registration pages, User Profile page 👤,  Basket page, About Us page 🙋‍♂️🙋‍♀️"
          challenge="ecommercetools"
          ideas="Jira, Confluence, Scrum, React, ecommercetools-sdk"
        />
      </div>
    </div>
  );
};
