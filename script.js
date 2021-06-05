let figure = "крестик";
let player_1_win = false;
let player_2_win = false;
let win_strike = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let button_restart;
let context;
let canvas;

// Корректируем размеры холста
correction();

// Функция отрисовки
function draw(number){
    canvas = document.getElementById(number);
    context = canvas.getContext("2d");
    if (figure == "крестик" &&
        player_1_win == false &&
        player_2_win == false &&
        // Если эта клеточка уже занята, то мы не сможем ее использовать
        win_strike[win_strike.indexOf(number)] != undefined &&
        win_strike[win_strike.indexOf(number)] != undefined){
        // Рисует крестик
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(10, 10)
        context.lineTo(canvas.width-10, canvas.height-10);
        context.lineWidth = 10;
        context.stroke();
        context.moveTo(canvas.width-10, 10);
        context.lineTo(10, canvas.height-10);
        context.lineWidth = 10;
        context.stroke();
        figure = "нолик";
        // Английская X
        win_strike[win_strike.indexOf(number)] = 'X';
        check("X", 1);
        if (player_1_win){
            document.getElementById('win').textContent = "Player №1 wins";
            button_restart = document.getElementById('restart');
            button_restart.textContent = "Restart";
        }
        standoff();
    }else if (figure == "нолик" &&
              player_1_win == false &&
              player_2_win == false &&
              // Если эта клеточка уже занята, то мы не сможем ее использовать
              win_strike[win_strike.indexOf(number)] != undefined &&
              win_strike[win_strike.indexOf(number)] != undefined){
        // Рисует нолик
        context.beginPath();
        context.lineWidth = 10;
        context.strokeStyle = 'blue';
        context.arc(canvas.width / 2, canvas.height / 2, 90, 0, 2 * Math.PI);
        context.stroke();
        figure = "крестик";
        // Английская O
        win_strike[win_strike.indexOf(number)] = 'O';
        check("O", 2);
        if (player_2_win){
            document.getElementById('win').textContent = "Player №2 wins";
            button_restart = document.getElementById('restart');
            button_restart.textContent = "Restart";
        }
        standoff();
    }
}

// Функция, отвечающая за победу того или иного игрока
function check(symbol, player_number){
    player_1_win = false;
    player_2_win = false;

    for (let i = 0; i<7; i += 3){
        if (win_strike[i] == symbol && win_strike[i + 1] == symbol && win_strike[i + 2] == symbol){
            if (player_number == 1){
                player_1_win = true;
            }else{
                player_2_win = true;
            }
        }
    }

    for (let i = 0; i<3; i++){
        if (win_strike[i] == symbol && win_strike[i + 3] == symbol && win_strike[i + 6] == symbol){
            if (player_number == 1){
                player_1_win = true;
            }else{
                player_2_win = true;
            }
        }
    }

    for (let i = 0; i<3; i += 3){
        if (win_strike[i] == symbol && win_strike[i + 4] == symbol && win_strike[i + 8] == symbol){
            if (player_number == 1){
                player_1_win = true;
            }else{
                player_2_win = true;
            }
        }
    }

    for (let i = 0; i<3; i += 3){
        if (win_strike[i + 2] == symbol && win_strike[i + 4] == symbol && win_strike[i + 6] == symbol){
            if (player_number == 1){
                player_1_win = true;
            }else{
                player_2_win = true;
            }
        }
    }
}

function restart(){
    for (let i = 1; i<10; i++){
        canvas = document.getElementById(i);
        context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    document.getElementById('restart').textContent = '';
    document.getElementById('win').textContent = '';
    player_1_win = false;
    player_2_win = false;
    figure = 'крестик';
    win_strike = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

// Функция отвечающая за корректирование размеров холста
function correction(){
    for (let i = 1; i<10; i++){
        canvas = document.getElementById(i);
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
}

function standoff(){
    for (let i = 1; i<10; i++){
        if (win_strike.indexOf(i) != -1){
            return;
        }
    }
    document.getElementById('win').textContent = "Draw";
    document.getElementById('restart').textContent = "Restart";
}