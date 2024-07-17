// O # torna a propriadade da classe privado, impedindo de ser acessada de outro arquivo e obrigando a usar os metodos da classe para obter o dado

//modulo de filesystem do node "fs e fs/promises(permite utilizar as promisses do then,catch, async, await...)"

// o node por padrão quando passa o caminho para função exemplo writeFile leva em consideração o local aonde esta executando a aplicação(servidor)
import fs from "node:fs/promises";

//forma atual para lidar com caminhos no node
//console.log(import.meta.url); //retorna o caminho inteiro do computador ate o arquivo do database

//comando a baixo é como se fosse um "cd"
const databasePath = new URL("../db.json", import.meta.url);

//formas antigas
// __dirname

export class Database {
  #database = {};

//constructor é um método especial executado no momento em que a classe é instanciada, além disso os atributos da classe são definidos dentro deste método
  constructor() {
    //ler arquivo passando(path,encoding)
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  //metodo que insers o BD no arquivo fisico
  #persist() {
    //writeFile espera uma string
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}
