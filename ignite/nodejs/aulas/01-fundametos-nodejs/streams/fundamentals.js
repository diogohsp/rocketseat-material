//Netflix & Spotify

// Importação de clientes via CVS (Excel)
// 1gb - 1.000.000

// 10mb/s -- 100s

// 100s -> inserções no banco de dados

// 10mb/s -> 10.000

// Readable Streams (receber arquivos, ler info aos poucos) / Writable Streams (spotify, enviado ao front-end uma info aos poucos, vai lendo conforme recebe ao poucos)

//Streams ->

// stdin = stream de leitura
// stdout = stream de saida

// process.stdin.pipe(process.stdout);
//pipe é o "encanamento" que leva a stream para o lugar aonde vai ser tratada
// stdin(entra) -> pipe -> stdout(sai)

import { Readable, Writable, Transform, Duplex } from "node:stream";
// Duplex pode tanto realizar a leitura quanto a escrita(exemplo arquivo fisico do sistema

class OneToHundredStream extends Readable {
  index = 1;

  //_read é um metodo obrigatorio de toda stream de leitura - retorna quais sao os dados dessa stream
  _read() {
    const i = this.index++;

    //Definindo um tempo para receber os dados (1 dado por segundo)
    setTimeout(() => {
      if (i > 100) {
        this.push(null);

        //push é o metodo que utiliza par a readable stream fornecer informações para quem estiver consumindo ela
      } else {
        // Dentro de stream o chunk (um pedaço dos dados) nao pode estar em um tipo primito, precisa estar em formato de buffer
        //Buffer -> é uma forma de transicionar dados entre stream

        //Buffer.from(info a ser convertida em buffer - (precisa ser uma string))

        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberSream extends Transform {
  // Transform é o metodo obrigatorio de toda stream de transformação

  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    // 1° Parametro é o erro (envia null caso nao tiver erro, ao contrario enviar o erro), 2° Parametro é o dado trasnformado

    const buf = Buffer.from(String(transformed));
    callback(null, buf);
  }
}

class MultiplyByTenStream extends Writable {
  // Write é o método obrigatorio de toda stream de escrita
  // Chunk é o pedaço lido da stream de leitura
  // Encoding é como que essa informação esta codificada
  // Callback é uma função que a stream de escrita deve chamar quando ela terminou de fazer oq precisafa fazer com a informação
  // A Stream de escrita nunca retorna nada ela apenas processa a informação
  _write(chunk, encondig, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream() //Só consigo ler dados com a stream de leitura
  .pipe(new InverseNumberSream()) //Precisa obrigatoriamente ler dados de algum lugar e escrever dados para outro lugar (intermeio para comunicação)
  .pipe(new MultiplyByTenStream()); //Só consigo escrever dados para a stream de escrita
