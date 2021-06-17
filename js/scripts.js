/*!
* Start Bootstrap - Clean Blog v6.0.0 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})
gsap.registerPlugin(CustomEase, CustomWiggle);

var wiggles = 10; //tweak this to whatever number you want. 

//create the custom eases..
CustomWiggle.create("Wiggle.easeOut", {wiggles:wiggles, type:"easeOut"});
CustomWiggle.create("Wiggle.easeInOut", {wiggles:wiggles, type:"easeInOut"});
CustomWiggle.create("Wiggle.anticipate", {wiggles:wiggles, type:"anticipate"});
CustomWiggle.create("Wiggle.uniform", {wiggles:wiggles, type:"uniform"});
CustomWiggle.create("Wiggle.random", {wiggles:wiggles, type:"random"});


//now set up a master timeline that repeats 50 times...
var tl = gsap.timeline({repeat:50, repeatDelay:1, delay:1});
tl.add(wiggle("easeOut", 2))
  .add(wiggle("easeInOut", 2), "+=0.5")
  .add(wiggle("anticipate", 3), "+=0.5")
  .add(wiggle("uniform", 2), "+=0.5")
  .add(wiggle("random", 6), "+=0.5");


//for convenience, let the user click any of the boxes to trigger animation (which should pause the main timeline)
setupClick("easeOut", 2);
setupClick("easeInOut", 2);
setupClick("anticipate", 3);
setupClick("uniform", 2);
setupClick("random", 6);

//just a helper function for wiggling the box and ball for a particular ID, like "easeOut"
function wiggle(id, duration) {
  var tl = gsap.timeline();
  tl.to("#" + id, {duration:duration, rotation:30, ease:"Wiggle." + id})
    .to("#" + id + "Ball", {duration:duration, x:100, ease:"Wiggle." + id}, 0);
  return tl;
}

//a helper function for setting up the click behavior for each box according to ID 
function setupClick(id, duration) {
  var animation = wiggle(id, duration).pause();
    document.querySelector("#" + id).addEventListener("click", function() {
      tl.pause(0);
      animation.play(0);
    });
}

//NOTE: if you want to start in the opposite direction, just set invert:true in the CustomWiggle.create() vars. 

//graph them
CustomEase.getSVGData("Wiggle.easeOut", {width:248, height:73, x:1, y:2, path:"#easeOutSVG"});
CustomEase.getSVGData("Wiggle.easeInOut", {width:248, height:73, x:1, y:2, path:"#easeInOutSVG"});
CustomEase.getSVGData("Wiggle.anticipate", {width:248, height:73, x:1, y:2, path:"#anticipateSVG"});
CustomEase.getSVGData("Wiggle.uniform", {width:248, height:73, x:1, y:2, path:"#uniformSVG"});
CustomEase.getSVGData("Wiggle.random", {width:248, height:73, x:1, y:2, path:"#randomSVG"});
