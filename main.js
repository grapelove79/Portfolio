// var docStyle = document.documentElement.style;

// setting CSS variables inside this JS where they 
// can be declaratively used inside the CSS file.

// document.addEventListener('mousemove', function(e) {
//   docStyle.setProperty('--mouse-x', e.clientX);
//   docStyle.setProperty('--mouse-y', e.clientY);
// });
'use strict'

// header의 배경색을 흰색으로 변경
const header = document.querySelector('#header');
const headerHeight = header.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  console.log('a', window.scrollY);
  console.log('headerHeight:', headerHeight);
  if(window.scrollY > headerHeight) {
    header.classList.add('header--white');
  } else {
    header.classList.remove('header--white');
  }
});

// Handle scrolling when tapping on the navbar menu
const link = document.querySelectorAll('.links');
const sections = document.querySelectorAll('section');
const navbar = document.querySelector('.header__container');


window.addEventListener("scroll", () => {
  let current = "";
  let len = sections.length;

  sections.forEach((section) => {
    const sectionTop = window.pageYOffset + section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - sectionHeight / 4) {
      current = section.getAttribute("id");
    }
  });
  
  while(--len && window.scrollY + 72 < sections[len].offsetTop) {}
  link.forEach((ltx) => {ltx.classList.remove('active')});
  link[len].classList.add('active');
  
  navbar.classList.remove('open');
});


// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
const navbarCloseBtn = document.querySelector('.navbar__close-btn');
const logo = document.querySelector('.logo');
const firstNav = document.querySelector('.links [href="#main"]');

navbarToggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('open');
});
navbarCloseBtn.addEventListener('click', () => {
  navbar.classList.remove('open');
});
logo.addEventListener('click', () => {
  if(navbar.classList.contains('open')) {
    navbar.classList.remove('open');
  }
});
firstNav.addEventListener('click', () => {
  if(navbar.classList.contains('open')) {
    navbar.classList.remove('open');
  }
})



// Handle click on Contact Me button on home
const homeContactBtn = document.querySelector('.home__contact');  
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
  // const scrollTo = document.querySelector('#contact');
  // scrollTo.scrollIntoView({ behavior: 'smooth' });
});


// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight; 
});

// Show "arrow up" button when scrolloing down
const arrowUP = document.querySelector('.arrow__up')
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight / 2) {
    arrowUP.classList.add('visible');
  } else {
    arrowUP.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button 
arrowUP.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categoris');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.work__projects li');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

  // Remove seletions from the previous item and select the nav
const active = document.querySelector('.category__btn.selected');
active.classList.remove('selected');
const target = e.target.nodeName === 'BUTTON' ? e.target :  e.target.parentNode;
target.classList.add('selected');


  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((projcet) => {
      //console.log(projcet.dataset.type);
      if(filter === "*" || filter === projcet.dataset.type) {
        projcet.classList.remove('invisible');
      } else {
        projcet.classList.add('invisible');
      }
    })
    projectContainer.classList.remove('anim-out');
  }, 300);
});




function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

const chart1 = document.querySelector('.doughnut1');
const chart2 = document.querySelector('.doughnut2');
const chart3 = document.querySelector('.doughnut3');
const chart4 = document.querySelector('.doughnut4');

const makeChart = (percent, classname, color) => {
  let i = 1;
  let chartFn = setInterval(function() {
    if (i < percent) {
      colorFn(i, classname, color);
      i++;
    } else {
      clearInterval(chartFn);
    }
  }, 10);
}

const colorFn = (i, classname, color) => {
  classname.style.background = "conic-gradient(" + color + " 0% " + i + "%, #dedede " + i + "% 100%)";
}

const replay = () => {
  makeChart(80, chart1, '#f5b914');
  makeChart(40, chart2, '#0A174E');
  makeChart(60, chart3, '#66d2ce');
  makeChart(60, chart4, '#dd8acb');
}

makeChart(80, chart1, '#f5b914');
makeChart(40, chart2, '#0A174E');
makeChart(60, chart3, '#66d2ce');
makeChart(60, chart4, '#dd8acb');