const socket=io('http://localhost:8000')
const form=document.getElementById("send-box");
const messageInp=document.getElementById('message');
const messagecontainer=document.querySelector(".container");
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position =='left'){
        audio.play(); 
    }
    
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();//forbids page to reload
    const message=messageInp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message)
    messageInp.value=''; 

})



const nam=prompt("Enter your name to join the chat");
socket.emit('new-user-joined', nam);

socket.on('user-joined',data=>{
    append(`${data} joined the chat`,'right');

})

socket.on('receive',data=>{
    append(`${data.nam} :${data.message}`,'left');

})


