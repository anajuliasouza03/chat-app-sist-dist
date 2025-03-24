import { Chat } from '@/context/ChatContext';

export const chats: Chat[] = [
  {
    id: '1',
    name: 'Friends Forever',
    avatar: '/assets/icon1.png',
    participants: ['Ciclano', 'Fulano', 'Beltrano'],
    messages: [
      { id: 'm1', sender: 'Ciclano', content: 'Olá', timestamp: 'Today, 8.30pm' },
      { id: 'm2', sender: 'Ciclano', content: 'Como estão?', timestamp: 'Today, 8.30pm' },
      { id: 'm3', sender: 'Fulano', content: 'Estou bem. Vamos almoçar amanhã?', timestamp: 'Today, 8.36pm' },
      { id: 'm4', sender: 'Você', content: 'Oii', timestamp: 'Today, 8.33pm' },
      { id: 'm5', sender: 'Você', content: 'Bem e você?', timestamp: 'Today, 8.34pm' },
      { id: 'm6', sender: 'Você', content: 'Claro', timestamp: 'Today, 8.58pm' },
    ],
  },
  {
    id: '2',
    name: 'Aniversário',
    avatar: '/assets/icon1.png',
    participants: ['João', 'Maria'],
    messages: [
      { id: 'm1', sender: 'João', content: '??', timestamp: 'Yesterday, 12.31pm' }
    ],
  },
  {
    id: '3',
    name: 'Curso',
    avatar: '/assets/icon1.png',
    participants: ['Aluno A', 'Aluno B'],
    messages: [
      { id: 'm1', sender: 'Aluno A', content: 'Isso não vai dar certo...', timestamp: 'Wednesday, 9.12am' }
    ],
  },
  
];
