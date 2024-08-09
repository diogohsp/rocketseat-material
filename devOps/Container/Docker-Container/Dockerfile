# Use a versão slim do Node.js 18
FROM node:18-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e yarn.lock para o diretório de trabalho
COPY package*.json pnpm-lock.yaml ./

# Instale o pnpm globalmente
RUN npm install -g pnpm

# Instale as dependências do projeto usando o pnpm
RUN pnpm install

# Copie todos os arquivos de código-fonte e o tsconfig.json
COPY . .

# Execute o comando de build do projeto
RUN pnpm run build

# Exponha a porta 3000 para que o aplicativo possa ser acessado externamente
EXPOSE 3000

# Defina o comando a ser executado quando o contêiner for iniciado
CMD ["pnpm", "run", "start"]
