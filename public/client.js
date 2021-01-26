const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector(".message_area")
do{
    name=prompt('Please enter your name')
}while(!name)
textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter')
    {
        sendMessage(e.target.value)
        textarea.value="";
    }
});
function sendMessage(message)
{
    let msg={
        user:name,
        message:message.trim()
    }
    appendMessage(msg,'outgoing_message');
    scrollToBottom();
    //send to server
    socket.emit('message',msg);
}
function appendMessage(msg,type){
    var mainDiv=document.createElement('div')
    var className=type
    mainDiv.classList.add('message',className)
    let markup=`
         <h3><i>${msg.user}</i></h3>
          <p>${msg.message}</p>
        `
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);
}
//Receive messages
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming_message')
    scrollToBottom();
})
function scrollToBottom()
{
    messageArea.scrollTop=messageArea.scrollHeight;
}
