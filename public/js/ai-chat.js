// Grab DOM elements
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

// Append messages to the chat box
function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message to server and handle AI response
async function sendMessage() {
  const question = userInput.value.trim();
  if (!question) return;

  appendMessage("user", question);
  userInput.value = "";
  appendMessage("ai", "Thinking...");

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    chatBox.lastChild.textContent = data.answer || "No answer received.";
  } catch (err) {
    console.error("Chat error:", err);
    chatBox.lastChild.textContent = "Error contacting AI.";
  }
}

// Send button click
sendBtn.addEventListener("click", sendMessage);

// Send on Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
