// Importação das bibliotecas
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

// Geração do QR Code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Mensagem de sucesso ao conectar
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// Inicialização do cliente
client.initialize();

// Função para criar delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Manipulação de mensagens recebidas
client.on('message', async msg => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname ? contact.pushname.split(" ")[0] : 'Usuário';
    const from = msg.from.endsWith('@c.us');

    if (/^(menu|dia|tarde|noite|oi|olá|ola)$/i.test(msg.body.trim()) && from) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        
        const menuMessage = `Olá, ${name}! Sou o assistente virtual do Luiz Carlos. Como posso ajudá-lo hoje? Escolha uma opção abaixo:\n\n` +
            `1️⃣ - Solicitação de boleto\n` +
            `2️⃣ - Renovação de grupo\n` +
            `3️⃣ - Renovação individual\n` +
            `4️⃣ - Consulta de processo\n` +
            `5️⃣ - Outras perguntas`;
        
        await client.sendMessage(msg.from, menuMessage);
    }

    if (msg.body === '1' && from) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Ótimo! Para solicitar seu boleto, acesse o link abaixo e informe seu CPF no sistema:');
        await delay(3000);
        await client.sendMessage(msg.from, '🔗 https://tinyurl.com/mry2pc44');
    }

    if (msg.body === '2' && from) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Certo! Aqui estão as informações importantes para renovar seu crédito em grupo:');
        await delay(3000);
        await client.sendMessage(msg.from, '✅ *Primeiro:* Todas as parcelas devem estar quitadas ou, no máximo, a última em aberto.');
        await delay(3000);
        await client.sendMessage(msg.from, '✅ *Segundo:* Não pode haver atraso nas parcelas, pois isso influencia no valor da renovação.');
        await delay(3000);
        await client.sendMessage(msg.from, '✅ *Terceiro:* Precisamos agendar a reunião do grupo. Me informe o endereço de costume ou envie sua *localização fixa*.');
        await delay(3000);
        await client.sendMessage(msg.from, '✅ *Quarto:* Todos os integrantes devem comparecer na reunião com seus documentos.');
        await delay(3000);
        await client.sendMessage(msg.from, 'Agora, basta me passar seus dados e a localização! O Luiz Carlos entrará em contato em breve. Obrigado!');
    }

    if (msg.body === '3' && from) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Certo! Aqui estão as informações para renovação individual:');
        await delay(3000);
        await client.sendMessage(msg.from, '✅ *Primeiro:* Todas as parcelas devem estar quitadas ou, no máximo, a última em aberto.');
        await delay(3000);
        await client.sendMessage(msg.from, '✅ *Segundo:* Não pode haver atraso nas parcelas, pois isso influencia no valor da renovação.');
        await delay(3000);
        await client.sendMessage(msg.from, '✅ *Terceiro:* Precisamos agendar uma reunião. Me informe o endereço ou envie sua *localização fixa*.');
        await delay(3000);
        await client.sendMessage(msg.from, '✅ *Quarto:* Compareça à reunião com seus documentos.');
        await delay(3000);
        await client.sendMessage(msg.from, 'Agora, antes de marcarmos a reunião, me passar seus dados e os dados dos seus avalistas,  para que possamos consultar e tambem a localização do local da reunião! Assim que possivel o Luiz Carlos entrará em contato com mais informações, ta bom. Obrigado!');
    }

    if (msg.body === '4' && from) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Estou verificando a situação da sua renovação...');
        await delay(3000);
        await client.sendMessage(msg.from, '🔎 Sua renovação está atualmente em: *Análise de liberação*.');
        await delay(3000);
        await client.sendMessage(msg.from, '💨 Mas não se preocupe! Nossa equipe está agilizando o processo o mais rápido possível.');
        await delay(3000);
        await client.sendMessage(msg.from, 'Se precisar de mais informações, estou à disposição. O Luiz Carlos também entrará em contato em breve!');
    }

    if (msg.body === '5' && from) {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Parece que você precisa de uma informação específica. Me conte um pouco mais para que eu possa anotar e repassar ao Luiz Carlos.');
        await delay(3000);
        await client.sendMessage(msg.from, 'Caso queira ver as opções novamente, basta me mandar um *OI*! Até mais!');
    }
});
