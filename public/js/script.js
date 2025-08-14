document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    // Listen for form submit
    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const question = userInput.value.trim();
        if (!question) return;

        // Display user message
        appendMessage("user", question);
        userInput.value = "";

        // Show loading indicator
        appendMessage("bot", "Thinking...");

        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question })
            });

            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const data = await res.json();

            // Remove "Thinking..."
            chatBox.removeChild(chatBox.lastChild);

            // Show AI answer
            appendMessage("bot", data.answer || "No answer received.");
        } catch (error) {
            console.error(error);
            chatBox.removeChild(chatBox.lastChild);
            appendMessage("bot", "⚠ Error: Could not get a response.");
        }
    });

    function appendMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = `message ${sender}`;
        msg.textContent = text;
        chatBox.appendChild(msg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
