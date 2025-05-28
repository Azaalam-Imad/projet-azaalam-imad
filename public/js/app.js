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




let links = document.querySelectorAll(".lin")
let zz = document.querySelector(".zz")

links.forEach(e => {
    e.addEventListener('click', ()=>{
        zz.textContent=e.textContent
        links.forEach(e => {e.style="border-bottom-color:rgb(182, 179, 179);"})
        if (zz.textContent==e.textContent) {
        e.style="border-bottom-color: #c40000;"
    }
    })
    
})







let carouselContainers = document.querySelectorAll('.carousel-container');
let nextBtns = document.querySelectorAll('.next');
let prevBtns = document.querySelectorAll('.prev');

let indicesMap = new Map();


carouselContainers.forEach(carousel => {
    let mode = carousel.getAttribute('mode');
    let camera = carousel.querySelector('.carousel');
    let slides = Array.from(camera.querySelectorAll('.slide'));
    let target = carousel.id;

    if (mode === "infinite" && slides.length > 0) {
        let firstClone = slides[0].cloneNode(true);
        let lastClone = slides[slides.length - 1].cloneNode(true);
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');

        camera.appendChild(firstClone);
        camera.insertBefore(lastClone, slides[0]);

        
        slides = camera.querySelectorAll('.slide');
        indicesMap.set(target, 1);
        camera.style.transform = `translateX(-${slides[0].clientWidth}px)`;
    } else {
        indicesMap.set(target, 0);
        camera.style.transform = `translateX(0px)`;
    }
});

const slider = (index, myBtn) => {
    let target = myBtn.getAttribute('carouselBtn');

    carouselContainers.forEach(carousel => {
        if (carousel.id === target) {
            let camera = carousel.querySelector('.carousel');
            let slides = camera.querySelectorAll('.slide');
            let ptns = document.querySelectorAll(`.ptn[carouselBtn='${target}']`);
            let mode = carousel.getAttribute('mode');

            let realSlidesCount = mode === "infinite" ? slides.length - 2 : slides.length;
            let realStart = mode === "infinite" ? 1 : 0;
            let realEnd = mode === "infinite" ? slides.length - 2 : slides.length - 1;

            if (index > realEnd) {
                if (mode === "infinite") {
                    
                } else {
                    index = realEnd;
                }
            } else if (index < realStart) {
                if (mode === "infinite") {
                   
                } else {
                    index = realStart;
                }
            }

            camera.style.transition = 'transform 0.5s ease-in-out';
            camera.style.transform = `translateX(-${slides[0].clientWidth * index}px)`;
            indicesMap.set(target, index);

            if (mode === "infinite") {
                camera.addEventListener('transitionend', () => {
                    if (index === slides.length - 1) {
                        camera.style.transition = 'none';
                        camera.style.transform = `translateX(-${slides[0].clientWidth}px)`;
                        indicesMap.set(target, 1);
                    } else if (index === 0) {
                        camera.style.transition = 'none';
                        camera.style.transform = `translateX(-${slides[0].clientWidth * (slides.length - 2)}px)`;
                        indicesMap.set(target, slides.length - 2);
                    }
                }, { once: true });
            }

            
            ptns.forEach(ptn => ptn.style.backgroundColor = "rgba(206, 18, 18, 0.6)");
            let pageIndex = mode === "infinite" ? index - 1 : index;
            if (ptns[pageIndex]) {
                ptns[pageIndex].style.backgroundColor = "rgb(206, 18, 18)";
            }
        }
    });
};

nextBtns.forEach(nextBtn => {
    nextBtn.addEventListener('click', () => {
        let target = nextBtn.getAttribute('carouselBtn');
        let currentIndex = indicesMap.get(target) || 0;
        slider(currentIndex + 1, nextBtn);
    });
});

prevBtns.forEach(prevBtn => {
    prevBtn.addEventListener('click', () => {
        let target = prevBtn.getAttribute('carouselBtn');
        let currentIndex = indicesMap.get(target) || 0;
        slider(currentIndex - 1, prevBtn);
    });
});

document.querySelectorAll('.ptn').forEach((ptn, i) => {
    ptn.addEventListener('click', () => {
        let target = ptn.getAttribute('carouselBtn');
        let relatedBtn = document.querySelector(`.next[carouselBtn='${target}']`);
        let container = document.getElementById(target);
        let mode = container.getAttribute('mode');
        let realIndex = mode === "infinite" ? i + 1 : i;
        slider(realIndex, relatedBtn);
    });
});


carouselContainers.forEach(carousel => {
    let atr = carousel.getAttribute('auto');
    let target = carousel.id;

    if (atr === "activ") {
        setInterval(() => {
            let nextBtn = document.querySelector(`.next[carouselBtn='${target}']`);
            let currentIndex = indicesMap.get(target) || 0;
            slider(currentIndex + 1, nextBtn);
        }, 3000);
    }
});








