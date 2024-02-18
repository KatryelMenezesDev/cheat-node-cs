const memoryjs = require('memoryjs'); // Importa o módulo memoryjs para acessar funções de leitura e escrita de memória.
const express = require('express'); // Importa o framework Express.js para criar a aplicação web.

const app = express(); // Inicializa a aplicação Express.
app.use(express.json()); // Configura a aplicação para usar o middleware de análise de JSON.

const processName = 'hl.exe'; // Nome do processo que será modificado.

const process = memoryjs.openProcess(processName); // Abre o processo especificado utilizando o módulo memoryjs.

const addressHP = 0x13CB3C5C; // Endereço na memória onde está armazenada a saúde do jogador.
const addressMoney = 0x08C313C4; // Endereço na memória onde está armazenado o dinheiro do jogador.

// Rota para modificar a saúde do jogador.
app.post('/hp', (req, res) => {
  const { value } = req.body; // Extrai o valor da propriedade 'value' do corpo da requisição.
  memoryjs.writeMemory(process.handle, addressHP, value, memoryjs.FLOAT); // Escreve o novo valor na memória do processo.
  res.send({ type: `Life`, value: `${value}` }).status(200); // Retorna uma resposta de sucesso com a nova vida do jogador.
});

// Rota para modificar a quantidade de dinheiro do jogador.
app.post('/money', (req, res) => {
  const value = req.body.value; // Extrai o valor da propriedade 'value' do corpo da requisição.
  memoryjs.writeMemory(process.handle, addressMoney, value, memoryjs.INT); // Escreve o novo valor na memória do processo.
  res.send({ type: `Money`, value: `${value}` }).status(200); // Retorna uma resposta de sucesso com a nova quantidade de dinheiro do jogador.
});

const PORT = 3000; // Porta em que o servidor estará escutando.
app.listen(PORT, () => {
  console.log(`Servidor Cheat Online! Porta -> ${PORT}`); // Inicia o servidor e exibe uma mensagem indicando que está pronto para receber requisições.
});
