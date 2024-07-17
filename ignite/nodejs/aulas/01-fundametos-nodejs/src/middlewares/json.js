// middlewares é um iterceptador que manipula as req e res de uma rota - interceptada a nosas função, sempre recebem req e res como parametros

export async function json(req, res) {
  //JSON de entrada

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  //JSON de saida

  res.setHeader("Content-type", "application/json");
}
