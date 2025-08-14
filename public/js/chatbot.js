document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#chat-input");
    const sendBtn = document.querySelector("#chat-send");
    const chatBox = document.querySelector("#chat-box");

    sendBtn.addEventListener("click", async () => {
        const message = input.value.trim();
        if (!message) return;

        chatBox.innerHTML += `<div class='user-msg'>${message}</div>`;
        input.value = "";

        // Send to backend AI
        const res = await fetch("/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: message })
        });
        const data = await res.json();

        chatBox.innerHTML += `<div class='bot-msg'>${data.reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
});
