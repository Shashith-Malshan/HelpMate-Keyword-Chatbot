console.log("connected");

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function getTimestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function appendMessage(sender, text) {
    const msgContainer = document.createElement("div");
    msgContainer.className = `flex flex-col ${sender === "bot" ? "items-start" : "items-end"}`;

    const bubble = document.createElement("div");
    bubble.className = `px-4 py-2 rounded-xl max-w-xs ${sender === "bot" ? "bg-gray-200 text-gray-800" : "bg-blue-600 text-white"}`;
    bubble.textContent = text;
    msgContainer.appendChild(bubble);

    const timestamp = document.createElement("span");
    timestamp.className = "text-xs text-gray-500 mt-1";
    timestamp.textContent = getTimestamp();
    msgContainer.appendChild(timestamp);

    chatBox.appendChild(msgContainer);
    chatBox.scrollTop = chatBox.scrollHeight;


}

function showTyping(duration = 1000) {
    const typingContainer = document.createElement("div");
    typingContainer.id = "typingBubble";
    typingContainer.className = "flex flex-col items-start";

    const bubble = document.createElement("div");
    bubble.className = "px-4 py-2 rounded-xl max-w-xs bg-gray-200 text-gray-800 flex items-center";
    bubble.innerHTML = 'Bot is typing <span class="animate-pulse">...</span>';

    typingContainer.appendChild(bubble);
    chatBox.appendChild(typingContainer);
    chatBox.scrollTop = chatBox.scrollHeight;

    return new Promise(resolve => {
        setTimeout(() => {
            typingContainer.remove();
            resolve();
        }, duration);
    });
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    // Typing animation
    await showTyping(1000);

    appendMessage("bot", "Hello! I am here to help you.");
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});