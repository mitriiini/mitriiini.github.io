const API_KEY = "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"; // à remplacer uniquement pour tests temporaires

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;
  if (!message) return;

  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += `<div class="message user">👤 Vous : ${message}</div>`;
  input.value = "";

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
  const botReply = data.choices[0].message.content;
  messagesDiv.innerHTML += `<div class="message assistant">🤖 ChatGPT : ${botReply}</div>`;
}
