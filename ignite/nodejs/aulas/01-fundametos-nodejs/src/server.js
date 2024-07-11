import http from "node:http";

// Rotas são meios de entrada e formas do fronted ou quem ta consumindo a api executar diferentes operações dentro do backend
// Exemplo rota para :
// Criação de usuarios
// Listagem de usuarios
// Remoção de usuarios
// Edição de usuarios

// Requisição HTTP
// Principais recursos: Método e URL

// GET, POST, PUT, PATCH, DELETE

// GET = buscar uma informação no back-end
// CRIAR = criar uma informação no back-end
// PUT = atualizar uma informação no back-end
// PATCH = atualizar uma informação especifica de um recurso do back-end
// DELETE = deleter um recuso do back-end

// GET /users -> buscando usuarios no back-end
// POST /users -> criando um usuario no back-end

// Stateful = sempre tem um tipo de informação guardada em memoria, depende da informação guardada em memoria para funcionar, caso for derrubada e perder os dados salvos em memoria pode volta a funcionar de maneira diferente
// Stateless = não salva nada em memoria, salva em dispositivos externos(banco de dados, arquivos de texto...), independente de para a aplicação os dados ficam iguais

// Quando cria um server em node e devolve uma resposta para o front-emd, a resposta tem que ser nos seguintes formatos : String, Buffer, Uint8Array

// JSON - Javascript Object Notation (É um estrutura de dados comum na transição de dados entre front e back / back e back, realiza a representação de tipos primitivos de dados dentro de uma string)

// Cabeçalhos (Requição/Resposta) -> Metadados (Informações adicionais que não tem haver com o dado retornado mas sim como que aquele dado pode ser interpretado pelo front-end)

// HTTP Status Code - indica o status da resposta da requisição
// 100 - 199 = Informativos
// 200 - 299 = Sucesso (200 é o padrao de todas as rotas)
// 300 - 399 = Redirecionamento
// 400 - 499 = Erros originados por conta da requisição (Front-end)
// 500 - 599 = Erros inesperados originados no server (Back-end)

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Due",
      email: "johndue@gmail.com",
    });

    return res.writeHead(201).end();
  }

  console.log(method, url);

  return res.writeHead(404).end();
});

server.listen(6969);
