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
    bubble.innerHTML = 'HelpMate is typing <span class="animate-pulse">...</span>';

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

function getBotResponse(msg) {
    const text = msg.toLowerCase().trim();

    // 1. Greetings
    if (text.match(/hello|hi|hey|good morning|good evening/)) {
        return "Hi there!👋 Welcome to Clothify. How can I help you today?";
    }

    // 2. Delivery Time
    if (text.match(/delivery|ship|when.*arrive|how long/)) {
        return "Our delivery usually takes 2–5 business days depending on your location.";
    }

    // 3. Cash on Delivery
    if (text.match(/cod|cash on delivery|pay on delivery/)) {
        return "Yes, we offer Cash on Delivery";
    }

    // 4. Return Policy
    if (text.match(/return|refund|exchange/)) {
        return "We have a 7-day return & exchange policy as long as the item is unused and in original condition.";
    }

    // 5. Size Guide
    if (text.match(/size|fit|measurement|large|small/)) {
        return "You can check our Size Guide on each product page. If you're unsure, tell me your height and weight!";
    }

    // 6. Order Tracking
    if (text.match(/track|tracking|status|where is my order/)) {
        return "You can track your order using the tracking link sent to your email/SMS.";
    }

    // 7. Payment Methods
    if (text.match(/payment|pay|visa|master|card|upi/)) {
        return "We accept payments via Visa, Mastercard, Bank Transfer, UPI, & Cash on Delivery**.";
    }

    // 8. Discounts / Offers
    if (text.match(/discount|offer|sale|promo|coupon/)) {
        return "Good news! 🎉 We often run seasonal offers. Check the homepage for current discounts!";
    }

    // 9. Custom Orders
    if (text.match(/custom|tailor|personalize|alter/)) {
        return "Yes! We accept custom tailoring and size adjustments. Tell us your exact measurement.";
    }

    // 10. Fabric Information
    if (text.match(/fabric|material|cotton|silk|linen|poly/)) {
        return "Our clothing is made using premium, skin-friendly fabrics. Ask me about any item and I’ll tell you the material.";
    }

    // 11. Washing Instructions
    if (text.match(/wash|clean|care/)) {
        return "Most items are machine-wash safe. Delicate items like silk require gentle handwashing.";
    }

    // 12. Out of Stock
    if (text.match(/out of stock|restock|available|stock/)) {
        return "If a product is out of stock, you can click Notify Me, and we’ll alert you when it’s available!";
    }

    // 13. Store Hours
    if (text.match(/open|close|store hours|timing/)) {
        return "Our online store is open 24/7! Support is available from 9 AM to 9 PM.";
    }

    // 14. Shipping Charges
    if (text.match(/shipping|delivery fee|charges/)) {
        return "We offer free shipping on orders above a certain amount. Otherwise, a small delivery fee applies.";
    }

    // 15. Changing Order
    if (text.match(/change order|edit order|modify order/)) {
        return "You can modify your order within 1 hour of placing it. After that, it may already be shipped.";
    }

    // 16. Cancel Order
    if (text.match(/cancel|cancellation/)) {
        return "You can cancel your order before it is shipped. Contact support with your Order ID.";
    }

    // 17. Wrong Item Received
    if (text.match(/wrong item|incorrect|different item/)) {
        return "We're sorry!😔 If you received the wrong item, we will replace it **for free** immediately.";
    }

    // 18. Damaged Product
    if (text.match(/damage|torn|broken/)) {
        return "If your item arrived damaged, please send a photo, and we will arrange a free replacement.";
    }

    // 19. Wholesale / Bulk Orders
    if (text.match(/wholesale|bulk|resell|seller/)) {
        return "Yes, we offer wholesale pricing for bulk orders. Contact support for details.";
    }

    // 20. Contact Support
    if (text.match(/contact|email|phone|support/)) {
        return "You can reach us at support@clothify.com or via WhatsApp at +94 XXX XXX XXX.";
    }

    // Fallback – Unknown input
    return "Sorry😔 I'm not sure I understood that.";
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    await showTyping(1000);

    const botReply = getBotResponse(message);
    appendMessage("bot", botReply);
}


sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});


window.onload = () => {
    appendMessage("bot", "Hello! I’m HelpMate How can I assist you today?");
};
