var socket = io()

var form = document.getElementById('form')

socket.on('usersOnline', (counter, userId) => {
    let pUserCounter = document.getElementById('usersOnline')
    pUserCounter.innerText = `Online: ${counter}`

    let userIdItem = document.createElement('p')
    userIdItem.innerText = `New Id: ${userId}`
    newUsersId.append(userIdItem)
})

/*Vai precisar de um array com os objetos das mensagens
assim abrindo um universo de possibilidades
E também salva o nick no localStorage*/ 

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let imgLink = document.getElementById('authorAvatar').value
    let author = document.getElementById('author').value
    let messageText = document.getElementById('chatInput').value

    if(imgLink == false){
        imgLink = 'data:image/png;base64,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'
    }

    if(localStorage.getItem('userName')){

        if(document.getElementById('author').value){
            localStorage.setItem('userName', author)
        }else{
            author = localStorage.getItem('userName')
        }

    }else{
        localStorage.setItem('userName', 'Anonymus')
    }

    if(author && messageText){

        let messageObjeto = {
            avatar: imgLink,
            nick: author,
            message: messageText,
        }
        socket.emit('messageEvent', messageObjeto)
        document.getElementById('chatInput').value=''                    
    }
})

socket.on('previousMessages', (msgArr) => {
    for(let messageObj of msgArr){
        renderMsgs(messageObj)
    }
})

socket.on("messageEvent", (msgs) => {
    renderMsgs(msgs)
})

let inputTyping = document.getElementById('chatInput')

setInterval(function listenTyping(){

    if(document.getElementById('chatInput').value){
        socket.emit('whoIsTyping', 1)    
    }else{
        socket.emit('whoIsTyping', 0)
        }
},1000)

socket.on('typing', (binary) => {
    typingOrNot(binary)
})

function typingOrNot(bin){
    let output = document.getElementById('typing')
    
    if(bin != 0){

        if(output.innerText == false){
        output.innerText = `Someone is typing`
        }
    
    }else{
         output.innerText = ``
    }
}

function renderMsgs(msg){   

    let messageItem = document.createElement('div')
    messageItem.id = 'messageItem'

    let imgDiv = document.createElement('div')
    imgDiv.id = 'imgDiv'
    let textDiv = document.createElement('div')
    textDiv.id = 'textDiv'

    let messageAvatar = document.createElement('img')
    let messageNick= document.createElement('strong')
    let messageTxt = document.createElement('p')

    messageAvatar.src = `${msg.avatar}`
    messageNick.innerText = `${msg.nick} - #${msg.userID.slice(0,4)}`
    messageTxt.innerText = `${msg.message}`

    imgDiv.append(messageAvatar)
    textDiv.append(messageNick, messageTxt)

    messageItem.append(imgDiv, textDiv)

    messages.append(messageItem)

    let chatHeight = document.getElementById('messages').scrollHeight
    document.getElementById('messages').scrollTo(0, chatHeight)
 }

function showTab(){
    document.getElementById('leftTab').style.display = "grid"
    document.getElementById('showButton').style.visibility = "hidden"
}
function hideTab(){
    document.getElementById('leftTab').style.display = "none"
    document.getElementById('showButton').style.visibility = "visible"
}