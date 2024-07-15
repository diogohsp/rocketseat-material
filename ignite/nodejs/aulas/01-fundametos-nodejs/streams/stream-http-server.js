import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberSream extends Transform {
  // Transform é o metodo obrigatorio de toda stream de transformação

  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    // 1° Parametro é o erro (envia null caso nao tiver erro, ao contrario enviar o erro), 2° Parametro é o dado trasnformado

    console.log(transformed);

    const buf = Buffer.from(String(transformed));
    callback(null, buf);
  }
}

//Tudo no node (portas de entrada e saidas) são streams

// req -> ReadableStream
// res -> WritableStream
const server = http.createServer(async (req, res) => {
    const buffers = []

    // O await dentro de uma stream aguar cada pedaço de uma stream ser retornado
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent);
    return res.end(fullStreamContent)

    // return req.pipe(new InverseNumberSream()).pipe(res);
});

server.listen(3334);
