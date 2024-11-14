// Sample contact list data
const contacts = [
    { name: 'Ann', avatar: 'ann.jpg', id: 1 },
    { name: 'Jane Smith', avatar: 'jane.jpg', id: 2 },
    { name: 'John Doe', avatar: 'jondoe.jpg', id: 3 }
];

// Store messages for each contact
const messages = {
    1: [
        { sender: 'left', text: 'Hey! How are you?' },
        { sender: 'right', text: 'I\'m good, how about you?' }
    ],
    2: [
        { sender: 'left', text: 'Hey Jane!' },
        { sender: 'right', text: 'Hi there!' }
    ],
    3: [
        { sender: 'left', text: 'Hello John!' },
        { sender: 'right', text: 'Hey, how\'s it going?' }
    ]
};

let activeContactId = 3; // Default contact is John Doe

// Function to filter contacts
function filterContacts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm)
    );
    renderContacts(filteredContacts);
}

// Function to render contacts in the sidebar
function renderContacts(filteredContacts) {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = ''; // Clear existing contacts
    filteredContacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.classList.add('contact');
        contactElement.onclick = () => switchContact(contact.id);

        const avatar = document.createElement('img');
        avatar.src = contact.avatar;
        avatar.alt = `${contact.name}'s avatar`;
        avatar.classList.add('contact-avatar');

        const name = document.createElement('span');
        name.classList.add('contact-name');
        name.textContent = contact.name;

        contactElement.appendChild(avatar);
        contactElement.appendChild(name);
        contactList.appendChild(contactElement);
    });
}

// Function to switch to a new contact's chat
function switchContact(contactId) {
    activeContactId = contactId;
    renderMessages();
    updateChatHeader(contactId);
}

// Function to render messages for the active contact
function renderMessages() {
    const chatContent = document.querySelector('.chat-content');
    chatContent.innerHTML = ''; // Clear current messages
    messages[activeContactId].forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.sender);
        messageElement.innerHTML = `<span class="message-text">${message.text}</span>`;
        chatContent.appendChild(messageElement);
    });
}

// Function to update the chat header with the active contact's info
function updateChatHeader(contactId) {
    const contact = contacts.find(c => c.id === contactId);
    const chatHeader = document.querySelector('.chat-header');
    chatHeader.innerHTML = `
        <img src="${contact.avatar}" alt="contact-avatar" class="contact-avatar">
        <span class="contact-name">${contact.name}</span>
    `;
}

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value.trim();
    if (messageText) {
        messages[activeContactId].push({ sender: 'right', text: messageText });
        messageInput.value = ''; // Clear the input field
        renderMessages(); // Re-render the messages
    }
}

// Initialize the app by rendering contacts and messages
document.addEventListener('DOMContentLoaded', () => {
    renderContacts(contacts);  // Render the full contact list initially
    renderMessages();  // Render the initial messages for the active contact
    updateChatHeader(activeContactId);  // Set the initial chat header
});

function sendMessage() {
    let messageInput = document.getElementById('message');
    let messageText = messageInput.value.trim();
    
    if (messageText !== "") {
        let messageContainer = document.querySelector('.chat-content');
        let newMessage = document.createElement('div');
        newMessage.classList.add('message', 'right');
        newMessage.innerHTML = `<span class="message-text">${messageText}</span>`;
        messageContainer.appendChild(newMessage);
        
        // Optionally, scroll the chat to the bottom
        messageContainer.scrollTop = messageContainer.scrollHeight;
        
        // Clear the message input field
        messageInput.value = "";
    }
}

function filterContacts() {
    let query = document.getElementById('search').value.toLowerCase();
    let contacts = document.querySelectorAll('.contact');
    
    contacts.forEach(contact => {
        let contactName = contact.querySelector('.contact-name').textContent.toLowerCase();
        if (contactName.includes(query)) {
            contact.style.display = '';
        } else {
            contact.style.display = 'none';
        }
    });
}
