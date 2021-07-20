import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault  } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/Relations';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

function ProfileSideBar(props){
  console.log(props)
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '6px'}}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>@{props.githubUser}</a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


export default function Home(props) {
  const user = props.githubUser;
  const [comunidades, setComunidades] = React.useState([{
    //id: '2021-07-14T02:43:44.677Z',
    //title: 'Esporte Clube Bahia',
    //image: 'https://www.ecbahia.com/global/fotos/camisa201113-1.jpg'
  }]);
  console.log(comunidades);
  const seguidores = [
    'fhdupuydelome',
    'matheusduplat',
    'omariosouto', 
    'peas',
    'birobirobiro',
    'marcobrunodev'
  ]

  React.useEffect(function(){
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '0f11df63d56d425f909fc1c87e6372',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"query": `query {
        allCommunities{
          title
          id
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then((response) => {
      return response.json();
    }).then((dataResponse) => {
      const dadosComunidades = dataResponse.data.allCommunities;
      setComunidades(dadosComunidades);
      console.log(dataResponse)
    })
  })
  
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
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreate(e){
              e.preventDefault();
              const dadosForm = new FormData(e.target);

             console.log('Campo: ', dadosForm.get('title'));
             console.log('Campo: ', dadosForm.get('image'));

             const novaComunidade = {
               title: dadosForm.get('title'),
               imageUrl: dadosForm.get('image'),
               creatorSlug: user,
             }

             fetch('/api/comunidades', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(novaComunidade)
             }).then(async (response) => {
               const dados = await response.json();
               console.log(dados.registroCriado);
               const novaComunidade = dados.registroCriado; 
               const atualizaComunidades = [...comunidades, novaComunidade]
               setComunidades(atualizaComunidades);
             })


            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
                <button>
                  Criar comunidade
                </button>
              </div>
            </form>
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
                <li key={item}>
                  <a href={`/users/${item}`} key={item}>
                    <img src={`https://github.com/${item}.png`}/>
                    <span>{item}</span>
                  </a>
                </li>
              )
            })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades({comunidades.length})
            </h2>

            <ul>
            {comunidades.map((item) => {
              return(
                <li key={item.id}>
                  <a href={`/comunidades/${item.id}`} key={item.title}>
                    <img src={item.imageUrl}/>
                    <span>{item.title}</span>
                  </a>
                </li>
              )
            })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
    )
}

export async function getServerSideProps(context){
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  console.log('token decodificado', jwt.decode(token))
  const githubUser = jwt.decode(token).githubUser;
  return{
    props: {
      githubUser
    },
  }
}
