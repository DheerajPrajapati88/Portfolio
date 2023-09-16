// const scroll = new LocomotiveScroll({
//     el: document.querySelector('.main'),
//     smooth: true
// });

gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh()

// define default scale value

function firstPageAnim() {
    var tl=gsap.timeline();
    tl.from(".nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })

    tl.to(".boundingelm",{
        y:0,
        duration:2,
        stagger:.2,
        ease:Expo.easeInOut,
        delay:-1
    })
    tl.from(".herofooter",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
    })
    tl.from(".herofooter .iconset .circle",{
        y:10,
        duration:0.7,
        yoyo:true,
        repeat:-1,
    })


    tl.from(".about .aboutimg",{
        rotate:"180deg",
        x:-300,
        scale:0,
        opacity:0,
        duration:1,
        scrollTrigger:{
            scroller:".main",
            trigger:".about",
            // markers:true,
            end:"top 40%",
            scrub:2,
        }
        
    })
    
    tl.from(".about .textabout",{
        x:100,
        opacity:0,
        duration:1,
        scrollTrigger:{
            scroller:".main",
            trigger:".textabout",
            // markers:true,
            end:"top 40%",
            scrub:2,
        }   
    })
    
    tl.from(".subscribe",{
        x:50,
        opacity:0,
        duration:1,
        scrollTrigger:{
            scroller:".main",
            trigger:".subscribe",
            // markers:true,
            end:"top 40%",
            scrub:2,
        }   
    })

    tl.from(".footer",{
        scale:0,
        opacity:0,
        duration:1,
        scrollTrigger:{
            scroller:".main",
            trigger:".footer",
            // markers:true,
            end:"top 100%",
            scrub:2,
        }   
    })



}


function circleSkew(){

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){

    xscale= gsap.utils.clamp(.8,1.2,xdiff = dets.clientX - xprev);
    yscale= gsap.utils.clamp(.8,1.2,ydiff= dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale,yscale);

    timeout=setTimeout(function(){
        document.querySelector(".minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`

    },100);

    })
}
function circleMouseFollower(xscale,yscale){

    window.addEventListener("mouseover",function(dets){
        console.log(dets.clientX,dets.clientY);
        document.querySelector(".minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`
    })
}
circleSkew();
circleMouseFollower();
firstPageAnim();


document.querySelectorAll(".elm").forEach(function(elm){

    var rotate=0;
    var diffrot=0;
    elm.addEventListener("mouseleave",function(dets){
        var diff=dets.clientY - elm.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX
        gsap.to(elm.querySelector("img"),{
                    opacity:0,
                    ease:Power3,
                    duration:.5,
         
        
                });
        
            });
elm.addEventListener("mousemove",function(dets){
var diff=dets.clientY - elm.getBoundingClientRect().top;
diffrot = dets.clientX - rotate;
rotate = dets.clientX
gsap.to(elm.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot),
 

        });

    });
});