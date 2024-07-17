// Buffer é uma representação de um espaço na memória do computador (representação de dados na memória)
// usado especificamente para transitar dados de uma forma rapida
// os dados eles sao armazenados no buffer para logo serem tratados (enviados) para outro lugar e logo serem removidos
// ele guarda os dados na memória de forma binária (escreve e ler na memoria conversando de uma maneira binária)

// o buffer é uma api criada dentro do node por conta da incapacidade do JS de trabalhar com dados binarios
// atualmente existe o TypedArray para lidar com os dados binários no JS

const buffer = Buffer.from("ok");

console.log(buffer); // <Buffer 6f 6b> -> 6f = hexadecimal de O, 6b = hexadecimal de K

console.log(buffer.toJSON()); // { type: 'Buffer', data:[111 = (decimal de O), 107 = (decimal de K)]}
