# 🛡️ Cypress Hero Manager - Test Automation

![Hero Manager App Screenshot](./Pictures/Cypres%20Heroes%20-%20img.png)

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

---

## 🛠️ Tecnologias Utilizadas

* **Cypress**: Framework de automação de testes End-to-End
* **JavaScript**: Linguagem de programação
* **Node.js**: Ambiente de execução para o JavaScript (necessário para o Cypress e npm)
* **npm / Yarn**: Gerenciador de pacotes

## 🚀 Como Rodar os Testes

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada) e o `npm` (que vem com o Node.js) ou `Yarn` instalados em sua máquina.

### 1. Configuração da Aplicação (Hero Manager)

Para rodar os testes, a aplicação "Hero Manager" precisa estar em execução.

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/WarleyZucoloto/Cypress-Heroes.git](https://github.com/WarleyZucoloto/Cypress-Heroes.git)
    cd Cypress-Heroes
    ```
2.  **Inicie a aplicação:**
    ```bash
    # A partir da raiz do projeto (Cypress-Heroes)
    # Navegue para a pasta 'HEROESAPP' (se for o caso) ou inicie na raiz do projeto
    yarn dev
    ```
    Isso fará o projeto base rodar localmente (geralmente em `http://localhost:3000` para o frontend e `http://localhost:3001` para a API, conforme configurado).

### 2. Configuração do Ambiente de Testes (Cypress)

1.  **Navegue para a pasta `client`:**
    ```bash
    cd client
    ```
2.  **Instale as dependências do Cypress:**
    ```bash
    npm install
    # ou
    yarn install
    ```

### 3. Executando os Testes

Certifique-se de que a aplicação "Hero Manager" esteja rodando (conforme o passo 1 da configuração da aplicação) antes de executar os testes.

1.  **Abra o Cypress Test Runner (modo interativo):**
    ```bash
    # A partir da pasta 'client'
    npx cypress open
    ```

2.  **Execute os testes em modo Headless (linha de comando):**
    ```bash
    # A partir da pasta 'client'
    npx cypress run
    ```

## 📁 Estrutura do Projeto

* `cypress/e2e`: Contém os arquivos de testes (`.cy.js`)
* `cypress/fixtures`: Dados de teste (ex: `HeroData.js`)
* `cypress/page-objects`: Implementação do Page Object Model para organização dos seletores e ações de página (`HomePage.js`, `LoginPage.js`, etc.)
* `cypress/support`: Comandos customizados e configurações gerais

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Contato

* **Nome:** Warley Zucoloto
* **LinkedIn:** [https://www.linkedin.com/in/warley-zucoloto-a787201b1/](https://www.linkedin.com/in/warley-zucoloto-a787201b1/) *(Ajuste este link para o seu)*
* **GitHub:** [https://github.com/WarleyZucoloto](https://github.com/WarleyZucoloto)
