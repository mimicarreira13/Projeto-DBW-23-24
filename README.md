# PROJETO_DBW (Classic Games) 🎮

## Indice 
- Descrição 
- Como Usar
- Tecnologias usadas



## 🤔 Descrição 

Este projeto foi desenvolvido em grupo no âmbito da unidade curricular de Desenvolvimento Baseado na Web (DBW) e consistiu na criação de uma plataforma de jogos clássicos intitulada **Classic Games**. O website inclui três jogos interativos: Jogo do Galo, Jogo da Memória e Jogo da Forca.

Além da componente de jogo, a aplicação implementa funcionalidades de autenticação, personalização de conta, sistema de pontuação e rankings. A arquitetura do projeto está preparada para a adição futura de novos jogos e funcionalidades.

A equipa deste projeto foi composta por três elementos, cujos nomes podem ser consultados na secção "Sobre" do próprio site. Este trabalho obteve a classificação final de **20 valores**.

## 🔗 Aceder ao Projeto Online

Podes aceder à versão online do projeto aqui:  
👉 [Classic Games no Render](https://classic-games.onrender.com)

## 📝 Como Usar 

Ao abrir o website o utilizador depara-se com a página inicial que contém os 3 jogos no centro da página.
Tem ainda a barra de navegação que estará presente em todas as páginas. A barra de navegação é composta pelo logo do site na parte esquerda da barra seguido de todas as páginas de navegação: Instruções, Sobre, Novidades e Página Inicial. Na parte direita da barra de navegação encontra-se um botão de Login que ao ser cicado redireciona para a página de criação de conta.

<img width="1280" alt="pagInicial" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/448c5c61-0509-45f1-85aa-8ed20e40a936">

Cada jogo que se encontra no centro da página é um botão e que redireciona para o menu inicial de cada jogo, no entanto se o utilizador tentar aceder a algum dos jogos e não tiver realizado o login será redirecionado para a página de criação de conta recebendo um pop up a dizer "É necessário se registar para ver este conteúdo!". Para o caso das outras páginas presentes na barra de navegação é possível aceder sem conta as páginas: Sobre, Novidades e Página inicial.

<img width="1278" alt="jogoNo" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/c74e0869-2905-48c6-94c5-e056e89b5d5e">

Se o utilizador selecinar a página 'Sobre' será redirecionado para uma página que fala um pouco sobre o site e mostra quem são os ciradores do mesmo.

<img width="1279" alt="sobre" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/91f7de46-31a4-4389-b6e7-082554554679">

Se o utilizador selecionar a página 'Novidades' será redirecionado para uma página com as novidades que são novos jogos que pretendemos trazer ao site. Fo decidido que esta página fosse acessível sem login como uma forma de cativar os utilizadores a se inscreverem e jogarem no nosso site.

<img width="1277" alt="Nov" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/48e82b22-2097-4058-b2c5-36740c60c8f7">

Se o utilizador selecinar a página 'Página Inicial' será redirecionado para uma página inical (descrita anteriormente).

Se o utilizador selecionar a página 'Instruções' acontecerá o mesmo que se selecionar um dos jogos se não tiver o login feito, uma vez que não é acessível a todos, sendo assim redirecionado para a página de criação de conta recebendo um pop up a dizer "É necessário se registar para ver este conteúdo!".

<img width="1280" alt="instrucoesLogin" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/0f6f953b-6179-46b3-b517-8fd5cf7f5c20">

Quando o utilizador está na página de criação de conta é apresentado com um formulário com os seguintes campos: Nome de Utilizador, Email, Palavra-passe, Confirme a Palavra-passe. Ao preencher corretamente os campos tem um botão 'Criar Conta' para poder avançar para a página de login e, assim o utilizador poder entrar na sua conta. Existe ainda um icon em forma de olho que ao ser clicado permite visualizar a palavra passe inserida. Caso o registo não seja possível, por , por exemplo, o utilizador já existir é mostrado um popup com essa informação.
Ainda na página de criação de conta, se o utilizador já tiver um conta no website existe um link abaixo do botão 'Criar Conta' com a seguinte informação 'Já tem conta? Login' que quando é carregado redireciona o utilizador para a página de Login.

<img width="1278" alt="criarConta" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/ac03516c-bbcb-462e-a16a-156c85dad60c">

Na página de login o utilizador é apresentado com dois campos: Nome de utilizador e Palavra-passe. Estes campos devem ser preenchidos de acorde com os dados de registo do utilizador, após preenchidos estes campos existe um botão de 'Login' abaixo do formulário. Após clicar no botão, se o login for bem sucedido, o utilizador é redirecionado para a página inicial. Caso o login não seja bem sucedido é mostrado um popup a indicar "O utilizador não existe!" e permanece na mesma página. Caso o utilizador queira voltar para o formulário de criar conta, existe um link abaixo do botão de login com a seguinte informação "Não tem conta? Registar" que ao ser clicado redireciona entao para a página de criação de conta.

<img width="1280" alt="login" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/92731ac0-86be-4edd-a700-a56bb369dc12">

Após o login o utilizador é redirecionado para a página inicial com algumas modificações na barra de navegação como a adição da página 'A Minha Conta' e a mudança do botão Login para Logout. Estando assim na sua conta, o utilizador já pode aceder a todos os conteúdos sem qualquer restrição.

Estando então na página inicial com o login efetuado, ao carregar num dos jogos é então direcionado para o menu inicial do jogo que contém 3 opções: Instruções, Dificuldade e uma seta que é um botão de play.
Ao carregar nas instruções o utilizador é redirecionado para a página das instruções para o local da página onde estão as instruções para o jogo em questão.
Se o utilizador carregar no botão de play será redirecionado para a página do jogo em si sendo o nível como default "fácil".
Quando o utilizador seleciona o botão de dificuldade é redirecionado para uma página com 4 botões, 3 sendo as dificuldades.

<img width="1280" alt="jogoIN" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/00778788-3f32-444c-b452-e9cc8b3e55a9">

Estando no menu de dificuldade de cada jogo é possível escolher uma dificuldade: "fácil", "média", "difícil".
Neste menu existe ainda outra vez um botão de play. 
Se o utilizador cerregar no botão de play sem escolher uma dificuldade é apresentado o popup "É necessário escolher uma dificuldade!". Assim após o o utilizador selecionar uma dificuldade tem de carregar no botão de play e assim será redirecionado para a página do jogo em si para poder jogar.

<img width="1280" alt="dif" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/fd16357f-00ce-4377-b072-7bafe0b281c7">

Na página do Jogo do Galo é só o utilizador começar a jogar, sendo mostrados popups quando o utilizador ganha e mostrando a sua pontuação.

Na página do Jogo da Memória é só o utilizador comecar a jogar escolhendo uma carta e assim começa o tempo a contar de forma descrescente. É adicionado ao score cada vez que o utilizador encontra os dois pares de cartas. No final do jogo é apresentado um popup a mostrar que o jogo foi concluido.

Na página do jogo da forca é apresentado um loading indicando que o jogo está a carregar. Após ser carregado o utilizador é apresentado com trés opções de categorias para as palavras. apóis selecionar uma categoria é a presentada uma palavra em forma de _ e os botões das letras para selecionar. Existe ainda um botão de dica que permite que o utilizador visualize uma dica relacionada a palavra. No nível de dificulade "medio" é adicionado ainda um timer de forma decrescente. Já no nível difícil tembém tem um timer mas o botão da "Dica" fica indisponível e o jogador tem de adivinhar a palavra sem dicas.

Ao caregar na página "A Minha Conta" o utilizador pode aceder às suas informações e alterá-las, como por exemplo: inserir uma imagem de perfil, alterar o username, alterar o email, alterar a palavra passe. Nesta página existem dois botões: "Pontuação" - para consultar as pontuações até ao momento de todos os jogos do site; "Classificações" - para consultar o ranking dos jogos com todos os utilizadores da plataforma.

<img width="1280" alt="minhaConta" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/ac21a99d-b1d8-4d5b-98eb-ee0fd461ceb1">

Para modo de telemóvel na barra de navegação temos à esquerda 3 linhas horizontais seguindas que, se o utilizador carregar aparece um menu com todas as páginas disponíveis. Ao lado desse menu aparece o logo do site, e na parte direita da barra de navegacao tem um icon de um boneco que, se o utilizador carregar redireciona-o para á página de criação de conta. Quando o utilizador tem o login efetuado o icon de um boneco passa a ser um icon de um retangulo com uma seta representando o logout.

<img width="305" alt="tel" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/72a86c45-ec16-4ebe-86d5-0b342dcecafe">

<img width="292" alt="telcom" src="https://github.com/elisagv/PROJETO_DBW/assets/128436366/7c841203-96f2-47af-bd28-17baeae7fb30">

## ⚙️ Tecnologias usadas

- EJS
- CSS
- MONGODB
- JAVA SCRIPT
- MULTER
- NODEMON
- PASSPORT
- FONT AWESOME (ICONS)
- BOODSTRAP
- SWEAT ALERT (POPUPS)

