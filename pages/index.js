import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/Relations'

function ProfileSideBar(props){
  console.log(props)
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '6px'}}/>
    </Box>
  )
}


export default function Home() {
  const user = 'uitallorss';
  const seguidores = [
    'fhdupuydelome',
    'matheusduplat',
    'omariosouto', 
    'peas',
    'birobirobiro',
    'marcobrunodev'
  ]
  
  return (
    <>
    <AlurakutMenu />
      <MainGrid>
        <div className="profile" style={{gridArea: 'profile'}}>
          <ProfileSideBar githubUser={user} />
        </div>
        <div className="welcome" style={{gridArea: 'welcome'}}>
          <Box>
            <h1 className="title">
              Bem vindo

              <OrkutNostalgicIconSet />
            </h1>
          </Box>
        </div>
        <div className="relations" style={{gridArea:'relations'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores({seguidores.length})
            </h2>

            <ul>
            {seguidores.map((item) => {
              return(
                <li>
                  <a href={`/users/${item}`} key={item}>
                    <img src={`https://github.com/${item}.png`}/>
                    <span>{item}</span>
                  </a>
                </li>
              )
            })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div>

      </MainGrid>
    </>
    )
}
