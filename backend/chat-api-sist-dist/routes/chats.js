const express = require('express');
const router = express.Router();
const { cadastros, chats } = require('../data/db');
const Chat = require('../models/Chat');

// GET: lista todos os chats
router.get('/chats', (req, res) => {
  res.json(chats);
});

// POST: cria um novo chat
router.post('/chats', (req, res) => {
    const { participants, messages } = req.body;
  
    console.log('🔍 Body recebido em POST /chats:', req.body);
  
    if (!participants || !Array.isArray(participants) || participants.length < 2) {
      return res.status(400).json({ error: 'Pelo menos dois participantes são obrigatórios' });
    }
  
    // Validação de participantes (precisam estar no banco)
    const invalidParticipant = participants.find((p) => {
      const found = cadastros.find(user => user.id === parseInt(p.id));
      return !found;
    });
  
    if (invalidParticipant) {
      return res.status(400).json({ error: 'Participante inválido: ' + JSON.stringify(invalidParticipant) });
    }
  
    const newChatId = (chats.length + 1).toString();
    const newChat = new Chat(newChatId, participants, messages || []);
    chats.push(newChat);
  
    console.log('✅ Novo chat criado:', newChat);
    res.status(201).json(newChat);
    console.log("🛠 Participantes recebidos:", participants);

  });
  
// DELETE: remove um chat
router.delete('/chats/:id', (req, res) => {
  const chatId = req.params.id;
  const index = chats.findIndex(chat => chat.id === chatId); // chat.id já é string

  if (index === -1) {
    return res.status(404).json({ error: 'Chat não encontrado' });
  }

  chats.splice(index, 1);
  console.log(`🗑️ Chat ${chatId} excluído`);
  res.status(200).json({ message: 'Chat excluído com sucesso' });
});

// PUT: edita nome de um grupo
router.put('/chats/:id', (req, res) => {
  const chatId = req.params.id;
  const { newName } = req.body;

  const chat = chats.find(chat => chat.id === chatId);
  if (!chat) {
    return res.status(404).json({ error: 'Chat não encontrado' });
  }

  chat.name = newName;
  console.log(`✏️ Chat ${chatId} renomeado para "${newName}"`);
  res.status(200).json({ message: 'Nome do grupo atualizado com sucesso' });
});

module.exports = router;
