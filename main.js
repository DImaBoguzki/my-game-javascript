function canvasLanch(){
    var client = document.getElementById('client');
    var canvas = document.getElementById("my-canvas");
    var ctx = canvas.getContext("2d");
    var flag = false;
    var size = 5; // size of pencil
    var color='black';

    document.addEventListener("click",(e)=>{
        var classType = e.target.getAttribute("class");
        if(classType=='color'){
            color = e.target.id;
        }
        else if(classType=='size'){
            size = parseInt(e.target.style.width);
        }
    })
    canvas.addEventListener('mousedown', (e)=>{flag=true;});
    canvas.addEventListener('mouseup', ()=>{flag=false;});
    canvas.addEventListener('mousemove',(e)=>{
        var rect = e.target.getBoundingClientRect();
        var x = (e.clientX - rect.left);
        var y = (e.clientY  - rect.top);
        client.innerText= ('Cordinate '+x + "," + y + " color: " + color + " size: " + size);
        if(flag === true) {
            ctx.fillStyle=color;
            ctx.fillRect(x,y,size,size);
        }
    });
}
function onSpinner(){
    let div = document.getElementById('spinner');
    div.style.display === 'none' ? div.style.display = 'block' : div.style.display = 'none';
}
/* set name in dialog */
function onDialogButon(){
    var inp = $('#nameInput');
    if(inp.val()===''){
        alert('The input is empty!');
    }
    else{
        sessionStorage.setItem('name',inp.val());
        $('#dialog').css('display','none');
        $('#header-name').text('Enjoy ' + sessionStorage.getItem('name'));
    }
}
function setScore(game,score){
    if(game=='snake'){
        var snakeScore = JSON.parse(localStorage.getItem('snake'));
        if(snakeScore!=null){
            snakeScore.push({name:sessionStorage.getItem('name'),score});
            localStorage.setItem("snake",JSON.stringify(snakeScore));
        }
        else{
            let table=[];
            table.push({name:sessionStorage.getItem('name'),score});
            localStorage.setItem("snake",JSON.stringify(table));
        }
    }
    else if(game=='tetris'){
        var tetrisScore = JSON.parse(localStorage.getItem('tetris'));
        if(tetrisScore!=null){
            tetrisScore.push({name:sessionStorage.getItem('name'),score});
            localStorage.setItem("tetris",JSON.stringify(tetrisScore));
        }
        else{
            let table=[];
            table.push({name:sessionStorage.getItem('name'),score});
            localStorage.setItem("tetris",JSON.stringify(table));
        }
    }
    else if(game=='jump-ball'){
        var jumpBallScore = JSON.parse(localStorage.getItem('jump-ball'));
        if(jumpBallScore!=null){
            jumpBallScore.push({name:sessionStorage.getItem('name'),score});
            localStorage.setItem("jump-ball",JSON.stringify(jumpBallScore));
        }
        else{
            let table=[];
            table.push({name:sessionStorage.getItem('name'),score});
            localStorage.setItem("jump-ball",JSON.stringify(table));
        }
    }
}