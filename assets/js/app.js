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

function appendMessage(sender,text){
    const msgContainer=document.createElement("div");
    msgContainer.className=`flex flex-col ${sender === "bot" ? "items-start" : "items-end"}`;

    const bubble=document.createElement("div");
    bubble.className= `px-4 py-2 rounded-xl max-w-xs ${sender === "bot" ? "bg-gray-200 text-gray-800" : "bg-blue-600 text-white"}`;
    bubble.textContent=text;
    msgContainer.appendChild(bubble);

    const timestamp=document.createElement("span");
    timestamp.className="text-xs text-gray-500 mt-1";
    timestamp.textContent=getTimestamp();
    msgContainer.appendChild(timestamp);

    chatBox.appendChild(msgContainer);
    chatBox.scrollTop=chatBox.scrollHeight;


}