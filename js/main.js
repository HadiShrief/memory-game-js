// Get blockContainer
const blockContainer = document.querySelector('.memory-game-blocks')
//convert all children's blockContainer into array 
const blocks = Array.from(blockContainer.children)
// Result container
const result = document.getElementById('result')
// Get score Element
let scoreElement = document.querySelector('.score span')
// Define score
let score =0
// Get the timer
let timer = document.querySelector('.timer')
// Wrong tries
let tries = document.querySelector('.tries span')
// Define counter
let counter = 75


// Shuffle all the blocks every time starting a new game
const shuffle = (arr) => {
  let current = arr.length, temp, random
  while(current > 0){
    // Create random nbs < to the arr size and make swapping
    random = Math.floor(Math.random() * current)
    temp = arr[current]
    arr[current] = arr[random]
    arr[random] = temp
    current--
  }
}

// Create array of numbers = to the size of block's number
const orederRange = Array.from(Array(blocks.length).keys())
// Shuffle the array
shuffle(orederRange)

blocks.forEach((block,index) => {
  // Specify the order of each block according to the shuffled array 
  block.style.order = orederRange[index]
  // Give 2s free look 
  block.classList.add('is-flipped')
  setTimeout(() =>{
    block.classList.remove('is-flipped')
  },2000)
  
  block.addEventListener('click', () => {
    // Flipped block function
    flipBlock(block)

  })
})

const flipBlock = (selectedBlock) => {
  // Flip the clicked block 
  selectedBlock.classList.add('is-flipped')
  // An Array will contain only 2 blocks
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))

  if (allFlippedBlocks.length === 2) {

     // Stop Clicking Function
     stopClicking()

     // Check Matched Block Function
     checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])

  }

}

const checkMatchedBlocks = (firstBlock, secondBlock) => {
  // Check if 2 blocks are the same by data-index
  if (firstBlock.getAttribute('data-technology') === secondBlock.getAttribute('data-technology')){
    // Increament the score by 1
   score++
   // Display the score 
   scoreElement.innerHTML =score
   // Keep the matched blocks flipped
   firstBlock.classList.remove('is-flipped') 
   secondBlock.classList.remove('is-flipped') 

   firstBlock.classList.add('has-matched') 
   secondBlock.classList.add('has-matched') 
}
else {
  // Increament the wrong tries
  tries.innerHTML = parseInt(tries.innerHTML) + 1;
  // Delay 1s before removing unmatched blocks
  setTimeout(() => {
    firstBlock.classList.remove('is-flipped') 
    secondBlock.classList.remove('is-flipped') 
  },1000)
}
}
// Prevent click any block (3rd 4th ..)
const stopClicking = () => {

  blockContainer.classList.add('no-clicking')
  setTimeout(() => {
    
    blockContainer.classList.remove('no-clicking')

  },1000)

}
// Result status container
const boxInstantiation = () => {
  const span = document.createElement('span')
  span.setAttribute('id','lost')
  const lost = document.getElementById('lost')
  div.appendChild(span)
  result.appendChild(div)
}

// Create timer 
const interval = setInterval(() => {
  // Decreament the timer
  counter--
  // Display the timer
  timer.innerHTML = counter
  // Won and Lost checking
  testResult()
  
},1000)

// Container to display wetheir won or lost
const div = document.createElement('div')
div.classList.add('control-buttons')

const testResult = () => {
  // IF LOSE
  if(counter == 0 && score < (blocks.length)/2){ // 20 blocks so the highest score is 10  
      boxInstantiation()
      // Display you lost
      lost.innerHTML='You lost'
      // Stop the counter interval
      clearInterval(interval)
      // Start new game
      const tryAgain = document.createElement('div')
      tryAgain.classList.add('try-again')
      tryAgain.innerHTML= 'Try again'
      // Try again button
      div.appendChild(tryAgain)
      //Reload the page when tryagain is clicked(start new game)
      tryAgain.addEventListener('click', () => {
        location.reload()
      })
    }
  // IF WIN 
  if (score == (blocks.length)/2 && counter > 0) {
      boxInstantiation()
      lost.innerHTML='You won'
      // Stop the counter interval
      clearInterval(interval)
   }
}


