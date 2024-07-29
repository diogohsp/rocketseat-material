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