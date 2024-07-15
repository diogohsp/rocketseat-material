import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  //_read é um metodo obrigatorio de toda stream de leitura - retorna quais sao os dados dessa stream
  _read() {
    const i = this.index++;

    //Definindo um tempo para receber os dados (1 dado por segundo)
    setTimeout(() => {
      if (i > 5) {
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

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half",
})
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(data);
  });
