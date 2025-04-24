const API_KEY = "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";  // Remplace ici par ta clé API OpenAI (attention !)

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;
  if (!message) return;

  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += `<div class="message user">👤 Vous : ${message}</div>`;
  input.value = "";

  try {
    // Envoie la requête à l'API OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    
    // Vérifie si l'API a retourné une réponse valide
    if (data.choices && data.choices[0]) {
      const botReply = data.choices[0].message.content;
      messagesDiv.innerHTML += `<div class="message assistant">🤖 ChatGPT : ${botReply}</div>`;
    } else {
      messagesDiv.innerHTML += `<div class="message assistant">🤖 ChatGPT : Désolé, il y a un problème avec l'API.</div>`;
    }
  } catch (error) {
    console.error(error);
    messagesDiv.innerHTML += `<div class="message assistant">🤖 ChatGPT : Une erreur est survenue. Réessaie plus tard.</div>`;
  }
}
