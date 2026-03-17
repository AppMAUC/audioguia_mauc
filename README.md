---

# AudioGuia MAUC 🎨🎧  
![Logo do Projeto](public/pwa-192x192.svg)  

---

## 🖼️ Visão Geral  
O **AudioGuia MAUC** é um aplicativo web que oferece guias de áudio interativos e acessíveis para visitantes do Museu de Arte da UFC. Desenvolvido com **React** e **TypeScript**, o projeto prioriza acessibilidade e uma experiência de usuário otimizada.  

---

## 🏗️ Arquitetura do Projeto  

O frontend é modular e utiliza boas práticas de organização:  

### 📂 Estrutura de Pastas  

```bash  
src/  
├── components/       # Componentes reutilizáveis (botões, cards, etc.)  
├── features/         # Funcionalidades organizadas (e.g., exposição, busca, login)  
├── hooks/            # Custom hooks (e.g., usePreview, useAuth)  
├── styles/           # CSS Modules organizados por tema e responsividade  
├── utils/            # Funções auxiliares e helpers  
└── App.tsx           # Arquivo principal do React  
```  

---

## ✨ Funcionalidades Principais  

1. **Exploração de Exposições:**  
   - Navegue pelas exposições e obras do museu com detalhes enriquecidos.  

2. **Guias de Áudio:**  
   - Áudios em Português e Inglês, com suporte a áudio descrição.  

3. **Busca Avançada:**  
   - Pesquise exposições e obras com facilidade.  

4. **Administração (Frontend):**  
   - Integração com funcionalidades administrativas para o gerenciamento de conteúdos (acesso exclusivo para admins).  

5. **Acessibilidade:**  
   - Design inclusivo e suporte a navegação em dispositivos móveis (PWA).  

---

## 🚀 Como Executar o Frontend  

### 📋 Pré-requisitos  
- **Node.js** (>= 16.x)  
- **npm** ou **yarn**  

### 🔧 Passos  

#### 1. Clonar o Repositório  
```bash  
git clone https://github.com/appmauc/audioguia_mauc.git  
cd audioguia_mauc-frontend  
```  

#### 2. Instalar Dependências  
```bash  
npm install  
```  

#### 3. Configurar Variáveis de Ambiente  
Crie um arquivo `.env` na raiz com:  
```env  
VITE_API_URL=https://audioguia-mauc-api.vercel.app/  
```  

#### 4. Rodar o Projeto  
```bash  
npm run dev  
```  

---

## 🌟 Tecnologias Utilizadas  

- **React** (TypeScript)  
- **React Router** (roteamento)  
- **React Hook Form + Zod** (validação de formulários)  
- **Axios** (requisições HTTP)  
- **CSS Modules** (estilização modular e temas)  

---

## 🤝 Contribuição  

1. Faça um fork do repositório.  
2. Crie uma branch com sua funcionalidade (`git checkout -b feature/nova-feature`).  
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).  
4. Submeta um pull request.  

---

## 🧑‍🤝‍🧑 Devs  

- **[Victor Emanuel Tomaz](https://github.com/victor280504)**  
- **[Mateus de Aquino](https://github.com/mateusaquinomr)**  
---


**Desenvolvido com ❤️ para o MAUC**  
