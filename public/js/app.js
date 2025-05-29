let contaibtn12 = document.querySelector(".btcarpar")
let btncaros = document.querySelectorAll(".btncaros")
contaibtn12.style= "display: none;"
btncaros.forEach(e => {
    e.addEventListener('click', ()=>{
        contaibtn12.style= "dispaly:block;"
    })
})

let mm= document.querySelector(".mm")
mm.addEventListener('click', ()=>{
    contaibtn12.style= "display: none;"
})


let zze = document.querySelector(".zze")
let modal = document.querySelector(".modal")
modal.style="display: none;"

let loginp = document.querySelector(".login")
    loginp.addEventListener('click', ()=>{
        modal.style="display: block;display: flex;"
    })

    zze.addEventListener('click', ()=>{
    modal.style="display: none; "
})

let drop = document.querySelector(".cc")
let drop1 = document.querySelector(".drop")
drop.addEventListener('mouseover', ()=>{
  drop1.style="display: block;"
  
})
drop1.addEventListener('mouseover', ()=>{
  drop1.style="display: block;"
  
})
drop1.addEventListener('mouseout', ()=>{
  drop1.style="display: none;"
  
})





let links = document.querySelectorAll(".lin")
let zz = document.querySelector(".zz")
let plats = document.querySelectorAll(".menuplat")

links.forEach(e => {
    e.addEventListener('click', ()=>{
        zz.textContent=e.textContent 
        let elemn= e.getAttribute("cBtn")
        plats.forEach(e => {
          e.style="display: none;"
          if (e.getAttribute("cBtn")==elemn) {
            e.style="display: flex;"
          }
        })
        
        links.forEach(e => {e.style="border-bottom-color:rgb(182, 179, 179);"})
        if (zz.textContent==e.textContent) {
        e.style="border-bottom-color: #c40000;"
    }
    })
    
})



let zef=document.querySelector(".zef")
let linkss=document.querySelector(".links")
let mennu=document.querySelector(".mennu")
mennu.addEventListener('click', ()=>{
    linkss.style="display: flex; "
})
zef.addEventListener('click', ()=>{
    linkss.style="display: none; "
})





let carouselContainers = document.querySelectorAll('.carousel-container');

carouselContainers.forEach(container => {
  let camera = container.querySelector('.carousel');
  let slides = Array.from(camera.children);
  let dots = container.querySelectorAll('.ptn');

  let firstClone = slides[0].cloneNode(true);
  let lastClone = slides[slides.length - 1].cloneNode(true);
  camera.appendChild(firstClone);
  camera.insertBefore(lastClone, slides[0]);

  let updatedSlides = Array.from(camera.children);
  let index = 1;
  container.dataset.index = index;


  let width = updatedSlides[0].clientWidth;
  camera.style.transform = `translateX(-${width * index}px)`;


  container.querySelector('.next')?.addEventListener('click', () => moveSlide(container, 1));
  container.querySelector('.prev')?.addEventListener('click', () => moveSlide(container, -1));

  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(container, i + 1);
    });
  });

 
  if (container.getAttribute('auto') === 'activ') {
    setInterval(() => moveSlide(container, 1), 4000);
  }
});

function moveSlide(container, step) {
  let camera = container.querySelector('.carousel');
  let slides = Array.from(camera.children);
  let index = parseInt(container.dataset.index) + step;
  let width = slides[0].clientWidth;

  camera.style.transition = 'transform 0.5s ease-in-out';
  camera.style.transform = `translateX(-${width * index}px)`;
  container.dataset.index = index;
// **************************************************
  function resetCameraPosition(newIndex) {
  camera.style.transition = 'none';
  index = newIndex;
  camera.style.transform = `translateX(-${width * index}px)`;
  container.dataset.index = index;
}

// khasni nrja3 lhadi 

camera.addEventListener('transitionend', () => {
  if (index === slides.length - 1) {
    resetCameraPosition(1);
  } else if (index === 0) {
    resetCameraPosition(slides.length - 1);
  }
  updateDots(container);
});

}

function goToSlide(container, index) {
  let camera = container.querySelector('.carousel');
  let slides = Array.from(camera.children);
  let width = slides[0].clientWidth;

  camera.style.transition = 'transform 0.5s ease-in-out';
  camera.style.transform = `translateX(-${width * index}px)`;
  container.dataset.index = index;

  camera.addEventListener('transitionend', () => {
    updateDots(container);
  });
}

function updateDots(container) {
  let dots = container.querySelectorAll('.ptn');
  let index = parseInt(container.dataset.index);
  let pageIndex = index - 1;

  if (pageIndex < 0) pageIndex = dots.length - 1;
  if (pageIndex >= dots.length) pageIndex = 0;

  dots.forEach((dot, i) => {
    dot.style.backgroundColor = i === pageIndex ? 'rgb(206, 18, 18)' : 'rgba(206, 18, 18, 0.6)';
  });
}
