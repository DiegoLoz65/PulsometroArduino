const socket = io();

socket.on('arduino:data', function(data)
{
    console.log(data);
    let lmp = document.getElementById('lmp');
    temp.innerHTML = `${data} lmp`;
});
