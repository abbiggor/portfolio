const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const replayButton = document.querySelector(".replay-button")

const audioEat = new Audio('js/sounds/audio.mp3')
const audioGameOver = new Audio('js/sounds/gameover.wav')
// Definindo tamanho padrão dos itens em tela
const size = 30; 
// Definindo posição inicial da cobra
const initialPosition = [
    { x: 270, y: 240},
    { x: 300, y: 240},        
];

let snake = initialPosition;

const incrementScore = () => {
    score.innerText = parseInt(score.innerText) + 10
}
// Função para criar número aleatório, dentro dos parâmetros da grid, afim de aleatorizar as posições das comidas
const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}
// Posicionando as comidas de acordo com os parâmetros de aleatorização de números definidos acima
const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}
// Aleatorizando cores para serem usadas nas comidas
const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}
// Chamando a comida, de acordo com os parâmetros de posição aleatória
const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId
// Desenhando cobra em tela
const drawSnake = () => {
    ctx.fillStyle = "green"

    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}
// Desenhando comida em tela
const drawFood = () => {
    const { x, y, color} = food;

    ctx.fillStyle = color
    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillRect(x, y, size, size)

    ctx.shadowBlur = 0
}
// Definindo funcionalidade dos movimentos da cobra
const moveSnake = () => {
if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }
    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }
    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }
    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()
}
// Desenho da grid, ou fundo do cenário
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "green"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i,0)
        ctx.lineTo(i,600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}
// Função para checar se a cobra comeu a comida
const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        incrementScore()
        snake.push(head)
        audioEat.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

         
        food.x = x;
        food.y = y;
        food.color =  randomColor()
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit 
    
    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallCollision || selfCollision){
        gameOver()
}
}

let gameOverSoundPlayed = false;

const gameOver = () => {

    if (!gameOverSoundPlayed) {
    direction = undefined
    audioGameOver.play()
    gameOverSoundPlayed = true;
    }

    direction = undefined
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"

    
}

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)

    drawGrid()
    drawFood()
    moveSnake()
    drawSnake() 
    checkEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    },200)    
}

gameLoop()

// Definindo os comandos do teclado para movimentar a cobra
document.addEventListener("keydown", ({key}) => {
    
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }
    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }
    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }
    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})

replayButton.addEventListener("click", (() => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    snake = [{ x: 270, y: 240},
    { x: 300, y: 240},        
];
}))