const socket = io();
let userName = '';
let userList = [];

const loginPage = document.getElementById('loginPage');
const chatPage = document.getElementById('chatPage');

const loginInput = document.getElementById('loginPageInput');
const textInput = document.getElementById('chatTextInput');

loginPage.style.display = 'flex';
chatPage.style.display = 'none';

function renderUserList() {
    let ul = document.querySelector('.userList');
    ul.innerHTML = '';

    userList.forEach(user => {
        ul.innerHTML += `<li>${user}</li>`;
    });
}

function addMessage(type, user, msg) {
    let ul = document.querySelector('.chatList');

    switch(type) {
        case 'status':
            ul.innerHTML += `<li class="m-status">${msg}</li>`;
        break;
        case 'msg':
            if (userName === user) {
                ul.innerHTML += `<li class="m-txt"><span class="me">${user}</span> ${msg}</li>`
            } else {
                ul.innerHTML += `<li class="m-txt"><span>${user}</span> ${msg}</li>`
            }
        break;
    }

    ul.scrollTop = ul.scrollHeight;
}

loginInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        const name = loginInput.value.trim();
        if (name != '') {
            userName = name;
            document.title = `Chat (${userName})`;
            
            socket.emit('join-request', userName);
        }
    }
});

textInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        const txt = textInput.value.trim();
        textInput.value = '';

        if (txt != '') {
            addMessage('msg', userName, txt);
            socket.emit('send-msg', txt);
        }
    }
})

socket.on('user-ok', (list) => {
    loginPage.style.display = 'none';
    chatPage.style.display = 'flex';
    textInput.focus();

    addMessage('status', null, 'Conectado!');

    userList = list;
    renderUserList();
});

socket.on('list-update', (data) => {
    if (data.joined) {
        addMessage('status', null, `${data.joined} entrou no chat.`);
    }
    if (data.left) {
        addMessage('status', null, `${data.left} saiu no chat.`);
    }
    userList = data.list;
    renderUserList();
});

socket.on('show-msg', (data) => {
    addMessage('msg', data.username, data.message);
});

// quando a conecção com o banco cai
socket.on('disconnect', () => {
    addMessage('status', null, 'Você foi desconectado!');
});

//bug 
// quando não consegue reconectar
socket.on('reconnect_error', () => {
    addMessage('status', null, 'Tentando reconectar...');
    userList = [];
    renderUserList();
});

// quando reconectar
socket.on('reconnect', () => {
    addMessage('status', null, 'Reconectado!');

    if (userName != '') {
        socket.emit('join-request', userName);
    }
});