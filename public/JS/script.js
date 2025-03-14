const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector('.prompt-form');
const promptInput = promptForm.querySelector(".prompt-input");


const createMsgElement = (content, className) => {
    const div = document.createElement("div");
    div.classList.add("message", className);
    div.innerHTML = content;
    return div;
}

let userMessage = "";

const handleFormSubmit = (e) => {
    e.preventDefault();
    userMessage = promptInput.value.trim();

    if (!userMessage) return;

    const userMsgHTML = `<p class="message-text"></p>`;
    const userMsgDiv = createMsgElement(userMsgHTML, "user-message");

    userMsgDiv.querySelector(".message-text").textContent = userMessage;
    chatsContainer.appendChild(userMsgDiv); 

    promptInput.value = ""; 

    setTimeout(() =>{
        const botMsgHTML = `<img src="../images/user-robot32px.png" class="avatar"><p class="message-text"></p>`;
        const botMsgDiv = createMsgElement(botMsgHTML, "bot-message");
      
    
        botMsgDiv.querySelector(".message-text").textContent = "Calma vida ta de boa...";
        chatsContainer.appendChild(botMsgDiv); 
    })
}

promptForm.addEventListener("submit", handleFormSubmit); 