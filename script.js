let computer = false;
let win_strike = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player_sym = 'X';
let comp_sym = 'O';
let canvas;
let gap;
let context;
let ceil;

// Корректируем длину и высоту холста
correction(); 

// Определяем кто будет ходить первым
if (Math.round(Math.random()) == 1){
    computer = true;
    comp_sym = 'X';
    player_sym = 'O';
    computerTurn();
}

function computerTurn(){
    if (win_strike.indexOf(5) != -1){
        ceil = 5;
    }else{
        while (win_strike.indexOf(ceil) == -1){
            ceil = Math.random().toFixed(1) * 10;
        }
    }
    canvas = document.getElementById(ceil);
    context = canvas.getContext("2d")
    context.beginPath();
    context.lineWidth = 5;
    if (comp_sym == 'X'){
        context.strokeStyle = '#ec4646';
        if (canvas.height == canvas.width){
            context.moveTo(10, 10)
            context.lineTo(canvas.width-10, canvas.height-10);
            context.moveTo(canvas.width-10, 10);
            context.lineTo(10, canvas.height-10);
        }
        else if (canvas.width > canvas.height){
            gap = (canvas.width - canvas.height) / 2 ;
            context.moveTo(gap+10, 10)
            context.lineTo(canvas.width-gap-10, canvas.height-10);
            context.moveTo(canvas.width-gap-10, 10);
            context.lineTo(gap+10, canvas.height-10);
        }
        else{
            gap = (canvas.height - canvas.width) / 2 ;
            context.moveTo(10, gap+10)
            context.lineTo(canvas.width-10, canvas.height-gap-10);
            context.moveTo(10, canvas.height-gap-10);
            context.lineTo(canvas.width-10, gap+10);
        }
    }else{
        context.strokeStyle = '#51c2d5';
        if (canvas.height >= canvas.width){
            context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
        }else{
            context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 10, 0, 2 * Math.PI);
        }
    }
    win_strike[win_strike.indexOf(ceil)] = comp_sym;
    context.stroke();
    computer = false;
}

function playerTurn(number){
    if (computer == false &&
        // Если эта клеточка занята, то в нее нельзя ходить
        win_strike.indexOf(number) != -1){
        canvas = document.getElementById(number);
        context = canvas.getContext("2d");
        context.beginPath();
        context.lineWidth = 5;
        if (player_sym == 'X'){
            context.strokeStyle = '#ec4646';
            if (canvas.height == canvas.width){
                context.moveTo(10, 10)
                context.lineTo(canvas.width-10, canvas.height-10);
                context.moveTo(canvas.width-10, 10);
                context.lineTo(10, canvas.height-10);
            }
            else if (canvas.width > canvas.height){
                gap = (canvas.width - canvas.height) / 2 ;
                context.moveTo(gap+10, 10)
                context.lineTo(canvas.width-gap-10, canvas.height-10);
                context.moveTo(canvas.width-gap-10, 10);
                context.lineTo(gap+10, canvas.height-10);
            }
            else{
                gap = (canvas.height - canvas.width) / 2 ;
                context.moveTo(10, gap+10)
                context.lineTo(canvas.width-10, canvas.height-gap-10);
                context.moveTo(10, canvas.height-gap-10);
                context.lineTo(canvas.width-10, gap+10);
            }
        }else{
            context.strokeStyle = '#51c2d5';
            if (canvas.height >= canvas.width){
                context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
            }else{
                context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 10, 0, 2 * Math.PI);
            }
        }
        win_strike[win_strike.indexOf(number)] = [player_sym];
        context.stroke();
        computerTurn();
    }
}

// Функция отвечающая за корректирование размеров холста
function correction(){
    for (let i = 1; i<10; i++){
        canvas = document.getElementById(i);
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
}