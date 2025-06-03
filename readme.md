# 🛡️ Cypress Hero Manager - Test Automation

![Cypress Logo](https://img.shields.io/badge/Cypress-10.0.0-green?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)

Este repositório contém a suíte de testes automatizados para a aplicação "Hero Manager", desenvolvida utilizando o Cypress. O objetivo é garantir a qualidade e o bom funcionamento das funcionalidades CRUD (Create, Read, Update, Delete) dos heróis, bem como as validações do formulário.

## ✨ Funcionalidades Testadas

Os testes automatizados cobrem os seguintes cenários:

### 1. **Criação de Heróis**
- Criação bem-sucedida de um novo herói com dados válidos.
- Validação de campos obrigatórios (cenário de "todos os campos vazios").
- Prevenção da criação de heróis com nomes duplicados (validação de unicidade).
    - **Observação:** Atualmente, a aplicação permite a criação de nomes duplicados, o que é um `bug` reportado e documentado (`Test passa porque não existe essa validação hoje, criar documentação de report Bug`).

### 2. **Edição (Update) de Heróis Existentes**
- Edição bem-sucedida das informações de um herói (nome, preço, fãs, saves, etc.).
- Validação de campos com dados inválidos durante a edição (ex: preço inválido, etc.), garantindo que mensagens de erro são exibidas e o herói original não é alterado.
- Cancelamento da edição, verificando que o herói permanece inalterado na listagem.

### 3. **Exclusão (Delete) de Heróis**
- Exclusão bem-sucedida de um herói da listagem principal através do card.
- Exclusão bem-sucedida de um herói através da tela de edição.
- Cancelamento da exclusão via modal de confirmação, verificando que o herói permanece na listagem.

### 4. **Validações Negativas (Gerais do Formulário)**
- Tratamento de campos numéricos (preço, fãs, saves) com valores negativos ou zero (se não permitido pela regra de negócio).
    - **Observação:** Não há limite máximo implementado para campos numéricos, documentado como `feature a ser implementada`.

---

## 🛠️ Tecnologias Utilizadas

* **Cypress**: Framework de automação de testes End-to-End.
* **JavaScript**: Linguagem de programação.
* **Node.js**: Ambiente de execução para o JavaScript (necessário para o Cypress e npm).
* **npm / Yarn**: Gerenciador de pacotes.

## 🚀 Como Rodar os Testes

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada) e o `npm` (que vem com o Node.js) ou `Yarn` instalados em sua máquina.

### Instalação

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/SeuUsuario/NomeDoSeuRepositorio.git](https://github.com/SeuUsuario/NomeDoSeuRepositorio.git)
    cd NomeDoSeuRepositorio
    ```
    (Substitua `SeuUsuario/NomeDoSeuRepositorio` pelo caminho real do seu repositório)

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

### Executando os Testes

1.  **Certifique-se de que a aplicação "Hero Manager" esteja rodando** (geralmente em `http://localhost:3000` para o frontend e `http://localhost:3001` para a API, conforme configurado).

2.  **Abra o Cypress Test Runner (modo interativo):**
    ```bash
    npx cypress open
    ```
    Isso abrirá a interface do Cypress, onde você pode selecionar e executar os testes individualmente ou em grupo.

3.  **Execute os testes em modo Headless (linha de comando):**
    ```bash
    npx cypress run
    ```
    Isso executará todos os testes em segundo plano (sem interface gráfica) e exibirá os resultados no terminal.

## 📁 Estrutura do Projeto

* `cypress/e2e`: Contém os arquivos de testes (`.cy.js`).
* `cypress/fixtures`: Dados de teste (ex: `HeroData.js`).
* `cypress/page-objects`: Implementação do Page Object Model para organização dos seletores e ações de página (`HomePage.js`, `LoginPage.js`, etc.).
* `cypress/support`: Comandos customizados e configurações gerais.

## 📝 Pontos para Documentação / Melhorias Futuras

Durante o desenvolvimento dos testes, os seguintes pontos foram identificados e merecem documentação ou consideração para futuras melhorias na aplicação:

* **Seleção de Múltiplos Poderes:** É possível criar um herói com mais de um poder, porém a funcionalidade não é explicitamente comunicada ao usuário, levando a entender que o recurso é de seleção única.
* **Redirecionamento Pós-Login:** Melhorar o redirecionamento da página de login para a página home (após entrar no sistema), garantindo uma experiência mais fluida.
* **Significado de "Contratar Herói":** O recurso de "contratar herói" não significa que ele teve um salvamento bem-sucedido na UI. Necessita de clareza na regra de negócio e no feedback visual.
* **Validação de Imagem:** Definir o tipo de arquivo e o tamanho máximo para a imagem de cada herói.
* **Limites para Campos Numéricos:** Implementar validação de limites máximos para campos como "fãs", "preço" e "saves".

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

---
