// if (window.innerWidth < 550) {
//   $('.word').text('Madhushan Karunachandra');
// } else {

//   var words = ['Madhushan Karunachandra'],
//     part,
//     i = 0,
//     offset = 0,
//     len = words.length,
//     forwards = true,
//     skip_count = 0,
//     skip_delay = 15,
//     speed = 70;
// var wordflick = function () {
//   setInterval(function () {
//     if (forwards) {
//       if (offset >= words[i].length) {
//         ++skip_count;
//         if (skip_count == skip_delay) {
//           forwards = false;
//           skip_count = 0;
//         }
//       }
//     }
//     else {
//       if (offset == 0) {
//         forwards = true;
//         i++;
//         offset = 0;
//         if (i >= len) {
//           i = 0;
//         }
//       }
//     }
//     part = words[i].substr(0, offset);
//     if (skip_count == 0) {
//       if (forwards) {
//         offset++;
//       }
//       else {
//         offset--;
//       }
//     }
//     $('.word').text(part);
//   },speed);
// };

// $(document).ready(function () {
//   wordflick();
// });
// }

const backgroundImg = document.querySelector(".backgrounds");
let brightnessVal = 0.9;

document.addEventListener("click", (e) => {
  if(e.target.classList.contains("view-project-btn")) {
    togglePortfolioPopup();
    $('#side-social-bar, #rocket-nav, #fotter-div').hide();
    document.querySelector(".project-popup").scrollTo(0,0);
    portfolioItemDetails(e.target.parentElement.parentElement);
  }
});

document.querySelector(".pp-close").addEventListener("click", () => {
  togglePortfolioPopup();
  $('#side-social-bar, #rocket-nav, #fotter-div').show();
});

// hide when click outside of the pop-up
document.addEventListener("click", (e) => {
  
  if(e.target.classList.contains("pp-inner")) {
    togglePortfolioPopup();
    $('#side-social-bar').show();
    $('#srocket-nav').show();
    $("#fotter-div").show();
  }
})

// launch icon
$(document).ready(function() {

  $('#hero-social-bar').show();

	// track scroll bar in main
	$(window).on('scroll load', function(e){

    // set project list div size first load
    var varHei = document.getElementById('keeper-div').clientHeight;
    document.getElementById("project-list-div").setAttribute("style",`height:${varHei}px`);
    document.getElementById("project-main-grid").setAttribute("style",`height:${varHei - 75}px`);

    var windowHeight = window.innerHeight / 3;
    var scrollHeight = $(window).scrollTop();
    var windowWidth = window.innerWidth;

    if(windowWidth < 1000) {
      if (scrollHeight < windowHeight) {
        changeBrightness(scrollHeight, windowHeight, 0.2, 0.5);
      }
    } else {
      if (scrollHeight < windowHeight) {
        changeBrightness(scrollHeight, windowHeight, 0.2, 1);
      }
    }
    
		// hide or show rocket launch
		if(scrollHeight > 0) {
      
      $('#hero-social-bar').hide();
      if (!($('.project-popup').hasClass('open'))) {
        $('.top-hide').show();
        $('.rocket-nav').show();
      }
		} else {
      $('.top-hide').hide();
      $('#hero-social-bar').show();
			$('.rocket-nav').hide();
		}
	});

  $( window ).resize(function() {
    var varHei = document.getElementById('keeper-div').clientHeight;
    document.getElementById("project-list-div").setAttribute("style",`height:${varHei}px`);
    document.getElementById("project-main-grid").setAttribute("style",`height:${varHei - 75}px`);
    
  });

});

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function gotoHome() {
    window.location.href = "/#about"
}

function togglePortfolioPopup() {
  document.querySelector(".project-popup").classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");
  document.querySelector("nav").classList.toggle("fade-out");
  document.querySelector("main").classList.toggle("fade-out");
  document.querySelector(".hero").classList.toggle("fade-out");
  document.querySelector("#side-social-bar").classList.toggle("fade-out");
}

function portfolioItemDetails(projectItem) {
  const imgList = projectItem.querySelectorAll(".project-item-thumbanail input");
  let imgContainer = document.querySelector(".pp-thimbnail .carousel-inner");
  let indicatorContainer = document.querySelector(".pp-thimbnail .carousel-indicators");
  imgContainer.innerHTML = "";
  indicatorContainer.innerHTML = "";
  
  let count = 0;
  imgList.forEach(element => {
    let div = document.createElement('div');
    let indiBtn = document.createElement('button');
    div.classList.add('carousel-item');
    div.setAttribute("data-bs-interval", 3000)
    indiBtn.type = "button";
    indiBtn.setAttribute("data-bs-target", "#project-t-bar");
    indiBtn.setAttribute("data-bs-slide-to", count);
    indiBtn.setAttribute("aria-label", "Slide " + (count + 1));
    if (count === 0) {
      div.classList.add('active');
      indiBtn.setAttribute("aria-current", true);
      indiBtn.classList.add('active');
    }
    count++;
    const image = document.createElement("img");
    image.src = element.value;
    div.appendChild(image);
    imgContainer.appendChild(div);
    indicatorContainer.appendChild(indiBtn);
  });
  
  document.querySelector(".pp-header h3").innerHTML = projectItem.querySelector(".project-item-title").innerHTML;
  document.querySelector(".pp-body").innerHTML = projectItem.querySelector(".project-item-details").innerHTML;
}

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}

function changeBrightness(currentValue, maxValue, minRange, maxRange) {
    backgroundImg.style.filter = `brightness(${scale(currentValue, 0, maxValue, maxRange, minRange)})`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}