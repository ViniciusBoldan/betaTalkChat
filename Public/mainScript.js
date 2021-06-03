var socket = io()

var form = document.getElementById('form')

socket.on('usersOnline', (counter, userId) => {
    let pUserCounter = document.getElementById('usersOnline')
    pUserCounter.innerText = `Online: ${counter}`

    let userIdItem = document.createElement('p')
    userIdItem.innerText = `New Id: ${userId}`
    newUsersId.append(userIdItem)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let author = document.getElementById('author').value
    let messageText = document.getElementById('chatInput').value

    if(author && messageText){

        let messageObjeto = {
            nick: author,
            message: messageText,
        }
        socket.emit('messageEvent', messageObjeto)
        document.getElementById('chatInput').value=''                    
    }
})

socket.on("messageEvent", (msg) => {
    let messageItem = document.createElement('div')

    let messageAvatar = document.createElement('img')
    let messageNick= document.createElement('strong')
    let messageTxt = document.createElement('p')

    messageNick.innerText = `${msg.nick} - GamerTag: ${msg.userID.slice(0,4)}`
    messageTxt.innerText = `${msg.message}`

    messageItem.append(messageNick, messageTxt)

    messages.append(messageItem)

    let chatHeight = document.getElementById('messages').scrollHeight
    document.getElementById('messages').scrollTo(0, chatHeight)
})

function showTab(){
    document.getElementById('leftTab').style.display = "grid"
    document.getElementById('showButton').style.visibility = "hidden"
}