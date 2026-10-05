document.addEventListener('DOMContentLoaded', () => {
    
    const messageForm = document.getElementById('message-form');
    const msgInput = document.getElementById('msg-input');
    const chatMessagesContainer = document.getElementById('chat-messages');

    // Function to format time AM/PM
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes} ${ampm}`;
    }

    // Function to append a sent message to the DOM
    function addMessage(text) {
        // Create main wrapper
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';

        // Create content wrapper
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Create paragraph for text
        const p = document.createElement('p');
        p.textContent = text;

        // Create span for time
        const timeSpan = document.createElement('span');
        timeSpan.className = 'msg-time';
        timeSpan.textContent = getCurrentTime();

        // Assemble
        contentDiv.appendChild(p);
        contentDiv.appendChild(timeSpan);
        messageDiv.appendChild(contentDiv);

        // Append to chat area
        chatMessagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const text = msgInput.value.trim();
        if (text !== '') {
            addMessage(text);
            msgInput.value = ''; // clear input
        }
    });

    // Ensure we start scrolled to the bottom
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
});
