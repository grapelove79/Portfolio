'use strict'

var isScoreDrawStarted = false

function startSkills(){
	makeChart(80, chart1, '#f5b914');
  makeChart(40, chart2, '#0A174E');
  makeChart(60, chart3, '#66d2ce');
  makeChart(60, chart4, '#dd8acb');
}

window.addEventListener('load', () => {
  startSkills();
});


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
  let scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
  // let len = sections.length;
  

  sections.forEach((section) => {
    const sectionTop = scrollTop - section.offsetTop;
    const sectionHeight = section.clientHeight;
    console('1:', offset1)
    const offset1 = scrollTop - sections[1].offsetTop;
		const offset2=  scrollTop - sections[2].offsetTop;
    
    if(scrollTop > offset1 && scrollTop < offset2) {
      if(!isScoreDrawStarted) {
        startSkills();	
      }else {
        isScoreDrawStarted = false;
      }
    }

  //   function scrollMenu(){
  //     document.querySelectorAll(".paraNav ul li a").forEach(elem => {
  //         elem.addEventListener("click", (e) => {
  //             e.preventDefault();
  //             document.querySelector(elem.getAttribute("href")).scrollIntoView({
  //                 behavior: "smooth"
  //             })
  //         })
  //     });
  // }

    
    if (scrollTop >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }


  //   document.querySelectorAll(".content__item").forEach(item => {
  //     let offset1 = (scrollTop - item.offsetTop) * 0.1;
  //     let offset2 = (scrollTop - item.offsetTop) * 0.05;

  //     item.querySelector(".content__item__img").style.transform = "translateX("+ offset1 +"px)";
  //     item.querySelector(".content__item__desc").style.transform = "translateX("+ -offset2 +"px)";
  //     item.querySelector(".content__item__num").style.transform = "translateY("+ offset1 +"px)";
  // });
    });
  
  //메뉴
  document.querySelectorAll(".sections").forEach((item, index) => {
      if( scrollTop >= item.offsetTop - 2){
          link.forEach(li => {
              li.classList.remove("active");
          })
          document.querySelector(".link:nth-child("+(index+1)+")").classList.add("active");
      }
  })

  // while(--len && window.scrollY + 72 < sections[len].offsetTop) {}
  // link.forEach((ltx) => {ltx.classList.remove('active')});
  // link[len].classList.add('active');

  navbar.classList.remove('open');

  //스크롤 탑 수치 표기
  // document.querySelector(".paraScroll span").innerText = parseInt(scrollTop);

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


// skills
const chart1 = document.querySelector('.doughnut1');
const chart2 = document.querySelector('.doughnut2');
const chart3 = document.querySelector('.doughnut3');
const chart4 = document.querySelector('.doughnut4');
const chartFn={};

const makeChart = (percent, classname, color) => {
  let i = 1;
  let classN = classname.classList[1];
  clearInterval(chartFn[classN]);
  chartFn[classN] = setInterval(function() {
    console.log('i:', i);
    if (i < percent) {
      colorFn(i, classname, color);
      i++;
    } else {
      clearInterval(chartFn[classN]);
    }
  }, 10);
}


const colorFn = (i, classname, color) => {
  classname.style.background = "conic-gradient(" + color + " 0% " + i + "%, #dedede " + i + "% 100%)";
}

// const replay = () => {
//   makeChart(80, chart1, '#f5b914');
//   makeChart(40, chart2, '#0A174E');
//   makeChart(60, chart3, '#66d2ce');
//   makeChart(60, chart4, '#dd8acb');
// }


makeChart(80, chart1, '#f5b914');
makeChart(40, chart2, '#0A174E');
makeChart(60, chart3, '#66d2ce');
makeChart(60, chart4, '#dd8acb');



function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
