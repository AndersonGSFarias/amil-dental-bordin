Claro, aqui está uma sugestão de README para o seu projeto, explicando o essencial de forma clara e concisa.

---

# Landing Page Amil Dental — Seguros Bordin

Este projeto é uma landing page desenvolvida para a Bordin Seguros, com foco nos planos da Amil Dental.

## Tecnologias Utilizadas

- **HTML5**
- **CSS3** com **Tailwind CSS** para estilização ágil e responsiva.
- **JavaScript** (ES6+) para interatividade e manipulação do DOM.
- **Node.js** com **npm** para gerenciamento de dependências e scripts.

## Dependências do Projeto

As dependências podem ser encontradas no arquivo `package.json` e são gerenciadas via npm.

- **`tailwindcss`**: Um framework CSS utility-first que permite construir designs customizados de forma rápida e eficiente diretamente no HTML.
- **`daisyui`**: Um plugin para o Tailwind CSS que adiciona um conjunto de componentes de UI (como botões, cards, etc.), agilizando o desenvolvimento visual.
- **`cross-env`**: Utilitário que permite definir variáveis de ambiente de forma compatível entre diferentes sistemas operacionais (Windows, macOS, Linux).

## Scripts Disponíveis

Os seguintes scripts estão configurados no `package.json`:

- **`npm run dev`**: Inicia o Tailwind CSS em modo "watch". Ele observa as alterações nos arquivos (`./src/css/input.css` e arquivos JavaScript) e compila o CSS automaticamente para `./dist/css/output.css`. Ideal para desenvolvimento.
- **`npm run build`**: Executa o processo de build do Tailwind CSS, gerando o arquivo final de CSS (`output.css`) de forma minificada e otimizada para produção.

## Funcionalidades do JavaScript (`main.js`)

O arquivo `src/js/main.js` é responsável por toda a interatividade da página, principalmente o controle dos carrosséis de planos.

- **Seleção e Configuração de Carrosséis**: O script identifica todos os elementos com a classe `.carousel` na página.
- **Navegação por Setas e "Dots"**:
  - Permite a navegação pelos itens do carrossel clicando nas setas de "anterior" e "próximo".
  - Um `IntersectionObserver` é utilizado para observar qual item está visível no carrossel e atualizar o "dot" (indicador de posição) correspondente.
  - Clicar em um "dot" também leva o usuário diretamente ao item correspondente.
- **Cooldown de Navegação**: Para evitar múltiplos cliques rápidos nas setas, foi implementado um _cooldown_ de 800ms entre as transições, garantindo uma experiência de uso mais suave.

## Configuração do Tailwind CSS (`tailwind.config.js`)

O arquivo `tailwind.config.js` define as configurações do framework para o projeto.

- **`content`**: Especifica os arquivos que o Tailwind deve analisar para encontrar as classes utilizadas e, assim, gerar o CSS final apenas com o necessário.
- **`theme.extend`**:
  - **`fontFamily`**: Adiciona a fonte "Poppins" como uma opção de fonte customizada para o projeto.
- **`plugins`**:
  - Habilita o plugin **daisyUI** para disponibilizar seus componentes no projeto.
