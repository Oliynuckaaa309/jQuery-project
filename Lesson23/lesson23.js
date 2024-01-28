$(document).ready(function() {
  let intervalId;
   let minute = 1;
   let second = 0;
  let draggedElements = [];
  const order= [$('.block1'), $('.block2'), $('.block3'), $('.block4'),
$('.block5'), $('.block6'), $('.block7'), $('.block8'), $('.block9'),
$('.block10'), $('.block11'), $('.block12'),$('.block13'),$('.block14'),
$('.block15'), $('.block16')];


$('.check').click(function() {
let allBlocksPlacedCorrectly = true;
for (let a = 0; a < $('.block').length; a++) {
  let positionElem = $('.block')[a];
  let found = false;

  for (let j = 0; j < order.length; j++) {
    let positionElem_1 = order[j];

    if (positionElem=== positionElem_1[0]) {
      found = true;
      break;
    }
  }

  if (!found) {
    allBlocksPlacedCorrectly = false;
    break;
  }
}

$('.modal').show();
if (allBlocksPlacedCorrectly) {
  $('.modal_info').text(`Woohoo, well done, you did it!`);
} else {
  $('.modal_info').text(`It's a pity, but you lost.`);
}
});

$('.game_2').on('sortreceive', function(event, elem) {
draggedElements.push(elem.item);


});

  $('.button_new').click(function() {
    shuffleElements(document.querySelector('.game_1'));
    $('.button_start').prop('disabled', false);
    $('.button_start').removeClass('disabled');
    $('.time').html("<span>01:</span><span>00</span>");
    $('.button_check').prop('disabled', true);
    $('.button_check').addClass('disabled');
    
    let game_2 = $('.game_2');
    game_2.empty();
      for (let i = 0; i < draggedElements.length; i++) {
      $('.game_1').append(draggedElements[i]);
    }
     draggedElements = [];
});


  function updateTimer() {
     let displayMinute = minute < 10 ? '0' + minute : minute;
let displaySecond = second < 10 ? '0' + second : second;

$('.time').html('<span>' + displayMinute + '</span> <span>:</span> <span class="second">' + displaySecond + '</span>');

if (minute === 0 && second === 0) {
clearInterval(intervalId);
$('.button_start').prop('disabled', false);
$('.button_start').removeClass('disabled');
$('.modal').show();
$('.modal_info').text(`It's a pity, but you lost`);
$('.container_wrap').addClass('active');
$('.button_check').prop('disabled', true);
$('.button_check').addClass('disabled');
} else if (second === 0) {
minute--;
second = 59;
} else {
second--;
}

      
  }

  function sortUi() {
      $('.game_1, .game_2').sortable({
          connectWith: '.game_1, .game_2',
      });

      $('.image-container').sortable({
          connectWith: '.game_1, .game_2',
          sortupdate: function() {
             
              intervalId = setInterval(updateTimer, 1000);
          }
      });

      $('.block').sortable({
          connectWith: '.game_1, .game_2',
          sortupdate: function() {
             
              intervalId = setInterval(updateTimer, 1000);
          }
      });
  }

  sortUi();
  shuffleElements (document.querySelector('.game_1'));

  $('.button_start').click(function() {
  minute = 1;
   second = 0;
updateTimer();
intervalId = setInterval(updateTimer, 1000);
      $('.button_start').prop('disabled', true);
      $('.button_start').addClass('disabled');
      $('.button_check').prop('disabled', false);
      $('.button_check').removeClass('disabled');
  });

$('.button_check').click(function(){
  $('.container_wrap').addClass('active')
  $('.modal').show();
 
})
$('.close').click(function(){
  $('.container_wrap').removeClass('active')
  $('.modal').hide();
 
})
function shuffleElements(container) {
    let elements = container.children;
    let currentIndex = elements.length;
  
  
    while (currentIndex !== 0) {
     
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
     
      let temp = elements[currentIndex];
      elements[currentIndex] = elements[randomIndex];
      elements[randomIndex] = temp;
    }
  
    
    for (let i = 0; i < elements.length; i++) {
      container.appendChild(elements[i]);
    }
  };

});