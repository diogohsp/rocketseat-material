# Containers
	- Ambiente isolado
	- Compartilha um host de controle (cada aplicação é um container, caso tiver um container defeituoso isso nao afeta toda a aplicação somente o container)
	- Contem todos os elemento necessarios para rodar uma palicação
	- LXC (é um recurso nativo do linux para rodar container)

# Maquinas virtuais
	- Tudo roda na mesma maquina (um servidor tem todas as operações, caso o servidor caia toda as operações tbm cai, diferente dos containers onde cada operaçao tem seu ambiente isolado)
	- Possui seu proprio SO (o container nao possui seu proprio SO)
# Docker
	- Surgiu há cerca de 15 anos, escrito em Go (2007/2008)
	- Interface para lidar com containers (Docker é uma interface para lidar com containers, e containers é uma forma de vc isolar ambientes)
	- Utiliza o kernel do Linux (Recursos como: namespace, cgroups...)
	- Baseado em imagem (Arquivo declarativo do que tal aplicação necessita e gera uma imagem que de fato executa) - a imagem é o empacotamento, é o binario da aplicação (aplicação buildada) dentro de um ambiente que tem todos os recursos para rodar a aplicação
	- Facilita o ciclo de entrega
	- É leve e portatil
# Isolamento
	Host { n Containers, onde cada container tem seu proprio escopo com relação a aplicação e recursos } ---- Kernel{cgroups}
	
	- CGroup: É uma funcionalidade que possibilita o controle e a limitação de recursos de um processo (fica no kernel do linux, ele serve para impor limites de memoria, cpu, input, output e outros recursos do container)

	a ideia é que um container nao monopolize todo o recurso de um host

	caso o controle do cgroup nao fosse a nivel de kernel poderiam ocorrer varios problemas, o container poderia utilizar qlq valor disponivel no host

	- Namespace: Isolamento de recursos (sistema de arquivos, processos, rede), um container so enxerga os proprios processos, arquivos e interfaces de rede....

	- Unshare: visa criar um novo namespace para um processo ja existente, a ideia é possibilitar a execução de processo em um ambiente isolado sem a necessidade de uma interface de container

# OCI(Open Container Initiative)

	- Estrutura de governança
	- Visa facilitar a interoperabilidade
	- Garante padrões mantendo a flexibilidade
	- Runtime (implementação: RunCI) ; Image; Distro

	principais objetivos:

	- promover conteineres agnosticos (os containers nao devem estar vinculados a um cliente especifico)
	- Portabilidade
	
# Dockerfile
	- ele por padrao aponta para o docker hub.
	- "FROM" fala para qual imagem do docker hub ele vai apontar (as imagens do dockerhub apontam para outras imagens...)
	- Caso tiver uma BaseImage local tem que configurar para o dockerfile apontar para ela
	- "WORKDIR" é o diretorio que eu quero trabalhar dentro da imagem base (por padrao roda no base path do SO, nao é uma boa pratica) - /usr/src/app, o usr existe na distro linux src/build é criado em tempo de build
	- "COPY" para rodar o npm i eu preciso do packe.json, o "COPY" copia um arquivo da interface para o container - COPY package.json ./ , cria o arquivo em "./" no caso "app"
	- "RUN" executa um comando dentro do container
	- "COPY . ." copia tudo da interface para o diretorio inicial do workdir dentro do container
	- "EXPOSE" expoem uma porta do container
	- "CMD" executavel da aplicação (o CMD define parametros padroes que podem ser substituidos na CLI)
	
	- "docker build -t api-rocket ."  ou "docker build -t api-rocket -f nome_do_arquivo_dockerfile" - realiza o build da imagem docker
	
# Comandos
	- "curl http://localhost:3000" me retorna o "hello world" do docker
	- "docker build -t 'api-rocket' . " buildar a imagem do docker
	- "docker run -rm  -p 3000:3000 -d api-rocket"
	- "--rm" fala que ao final do ciclo de vida o container deve ser deletado
	- "-p" é de PORT que mapeia uma porta da minha interface para apontar para uma porta do container docker
	- "-d"
	- "docker ps" mostra todos os containers que estao em execução
	
# REDES

	- Rede é uma abstração que visa facilitar toda a parte comunicativa do docker (comunicação entre containers ou externa)
	- "docker network"
	- todo container tem uma rede, caso nao especifar a rede no "run" por padrao ela sera a rede "bridge" que fornece uma interface que fará o bridge com o DOCKER ZERO do host, da para fazer comunicação via tcp por default
	- quando for trabalhar com container localmente principalmente, é uma boa pratica ter suas redes de acordo com seus projetos
	- rede "none" isola o container
	- rede "host" tem como objetivo entregar todas as interfaces existentes no DOCKERHOST para o container
	- "docker network create [nome da rede]"
	- "docker network create --driver bridge [nome da rede]" especifica a rede bridge
	- "docker network connect [nome ou id] [id do container ou nome]"
	- "docker network inspect [nome da rede ou id]" inspeciona a rede, mostra se a rede esta conectada a algum container
	- "docker container inspect [nome da rede ou id]" inspeciona o container, mostra as redes que o container esta conectado
	- "docker run --network=primeira-network -p 3000:4000 -d api ." inicia o container ja conectado a rede especificada, quando eu crio um container ja associando ele a uma rede ele fica somente associado a essa rede em especifica
	
# VOLUMES
	-"docker exec -it bash", entra no diretorio padrao do docker - caso criar arquivos por aqui eles sumirao quando o container for DESTRUIDO (diferente do container ser parado)
