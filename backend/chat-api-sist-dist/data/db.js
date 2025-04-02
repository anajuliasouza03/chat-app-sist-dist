// db.js atualizado com grupos e contatos

const cadastros = [
  { id: 1, name: "Ana Júlia", email: "ana@gmail.com", password: "1234" },
  { id: 2, name: "Leonardo", email: "leo@gmail.com", password: "abcd" },
  { id: 3, name: "Ciclano", email: "ciclano@email.com", password: "1234" },
  { id: 4, name: "Fulano", email: "fulano@email.com", password: "1234" },
  { id: 5, name: "Beltrano", email: "beltrano@email.com", password: "1234" },
  { id: 6, name: "João", email: "joao@email.com", password: "1234" },
  { id: 7, name: "Maria", email: "maria@email.com", password: "1234" },
  { id: 8, name: "Aluno A", email: "alunoa@email.com", password: "1234" },
  { id: 9, name: "Aluno B", email: "alunob@email.com", password: "1234" },
  { id: 10, name: "Lucas", email: "lucas@email.com", password: "1234" },
];

const chats = [
  {
    id: "1",
    name: "Friends Forever",
    avatar: "/assets/icon1.png",
    participants: [
      { id: 1, name: "Ana Júlia" },
      { id: 4, name: "Fulano" },
      { id: 5, name: "Beltrano" }
    ],
    messages: [
      { id: "m1", userId: 3, userName: "Ciclano", chatId: "1", content: "Olá", timestamp: "Today, 8.30pm" },
      { id: "m2", userId: 3, userName: "Ciclano", chatId: "1", content: "Como estão?", timestamp: "Today, 8.30pm" },
      { id: "m3", userId: 4, userName: "Fulano", chatId: "1", content: "Estou bem. Vamos almoçar amanhã?", timestamp: "Today, 8.36pm" },
      { id: "m4", userId: 1, userName: "Ana Júlia", chatId: "1", content: "Oii", timestamp: "Today, 8.33pm" },
      { id: "m5", userId: 1, userName: "Ana Júlia", chatId: "1", content: "Bem e você?", timestamp: "Today, 8.34pm" },
      { id: "m6", userId: 1, userName: "Ana Júlia", chatId: "1", content: "Claro", timestamp: "Today, 8.58pm" },
    ],
    clients: new Set()
  },
  {
    id: "2",
    name: "Aniversário",
    avatar: "/assets/icon1.png",
    participants: [
      { id: 6, name: "João" },
      { id: 7, name: "Maria" }
    ],
    messages: [
      { id: "m1", userId: 6, userName: "João", chatId: "2", content: "??", timestamp: "Yesterday, 12.31pm" }
    ],
    clients: new Set()
  },
  {
    id: "3",
    name: "Curso",
    avatar: "/assets/icon1.png",
    participants: [
      { id: 8, name: "Aluno A" },
      { id: 9, name: "Aluno B" }
    ],
    messages: [
      { id: "m1", userId: 8, userName: "Aluno A", chatId: "3", content: "Isso não vai dar certo...", timestamp: "Wednesday, 9.12am" }
    ],
    clients: new Set()
  },
  {
    id: "4",
    name: "Ciclano",
    avatar: "/assets/icon3.png",
    participants: [
      { id: 1, name: "Ana Júlia" },
      { id: 3, name: "Ciclano" }
    ],
    messages: [
      { id: "m1", userId: 3, userName: "Ciclano", chatId: "4", content: "Olá", timestamp: "Today, 8.30pm" }
    ],
    clients: new Set()
  },
  {
    id: "5",
    name: "Lucas",
    avatar: "/assets/icon3.png",
    participants: [
      { id: 1, name: "Ana Júlia" },
      { id: 10, name: "Lucas" }
    ],
    messages: [
      { id: "m1", userId: 10, userName: "Lucas", chatId: "5", content: "Olá", timestamp: "Today, 8.30pm" }
    ],
    clients: new Set()
  }
];

module.exports = { cadastros, chats };