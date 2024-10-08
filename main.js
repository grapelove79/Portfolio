'use strict'

let isScoreDrawStarted = false

function startSkills(){
  isScoreDrawStarted = true	
  makeChart(95, chart1, '#f5b914');
  makeChart(70, chart2, '#0A174E');
  makeChart(95, chart3, '#66d2ce');
  makeChart(80, chart4, '#dd8acb');
  makeChart(30, chart5, '#9fdd8a');
  makeChart(30, chart6, '#dd8e8a');
}

window.addEventListener('load', () => {
  startSkills();
});

// header의 배경색을 흰색으로 변경
const header = document.querySelector('#header');
const headerHeight = header.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
  if(scrollTop > headerHeight) {
    header.classList.add('header--white');
  } else {
    header.classList.remove('header--white');
  }
});

// 메뉴 클릭시 스무스하게
document.querySelectorAll(".navbar__contents ul li a").forEach( li => {
  li.addEventListener("click", e => {
      e.preventDefault();
      const target = e.target; 
      const link = target.attributes.href.nodeValue;
      scrollIntoView(link);
      // const link = target.hash;
    //   document.querySelector(li.getAttribute("href")).scrollIntoView({
    //     behavior: "smooth"
    // });
      navbar.classList.remove('open');
  });
});


// 모바일을 위한 Navbar 토글 버튼
const navbar = document.querySelector('.header__container');
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
const navbarCloseBtn = document.querySelector('.navbar__close-btn');
const logo = document.querySelector('.logo');
const firstNav = document.querySelector('.navbar__menu li [href="#home"]');

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

// home에서 Contact Me 버튼 클릭시 조작
const homeContactBtn = document.querySelector('.home__contact');  
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});


// home을 윈도우 스크롤 다운시 천천히 사라지게 조작
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
  home.style.opacity = 1 - scrollTop / homeHeight; 
});

// 스크롤 다운할 때 "위로가기 화살표" 버튼 보이기
const arrowUP = document.querySelector('.arrow__up')
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight / 2) {
    arrowUP.classList.add('visible');
  } else {
    arrowUP.classList.remove('visible');
  }
});

//  "위로가기 화살표" 버튼 클릭 조작
arrowUP.addEventListener('click', () => {
  scrollIntoView('#home');
});

// 프로젝트
const workBtnContainer = document.querySelector('.work__categoris');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.work__projects li');

workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

  // 이전 항목에서 선택 항목을 제거 그리고 네비 선택
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

// 스킬
const chart1 = document.querySelector('.doughnut1');
const chart2 = document.querySelector('.doughnut2');
const chart3 = document.querySelector('.doughnut3');
const chart4 = document.querySelector('.doughnut4');
const chart5 = document.querySelector('.doughnut5');
const chart6 = document.querySelector('.doughnut6');
const chartFn={};

const makeChart = (percent, classname, color) => {
  let i = 1;
  let classN = classname.classList[1];
  clearInterval(chartFn[classN]);
  chartFn[classN] = setInterval(function() {
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

makeChart(95, chart1, '#f5b914');
makeChart(70, chart2, '#0A174E');
makeChart(95, chart3, '#66d2ce');
makeChart(80, chart4, '#dd8acb');
makeChart(30, chart5, '#9fdd8a');
makeChart(30, chart6, '#dd8e8a');

// 보여지는 섹션에 해당하는 메뉴 아이템을 활성화
const links = document.querySelectorAll('.navbar__menu li');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;

  // 메뉴 활성화
  sections.forEach((element, index) => {
      if(scrollTop >= element.offsetTop - 2 || Math.round(scrollTop + window.innerHeight) >= document.body.clientHeight){
        links.forEach(li => {
          li.classList.remove("active");
        });
        document.querySelector(".navbar__menu li:nth-child("+(index+1)+")").classList.add("active");
      }
  });

  //Skill
  if(scrollTop + 72 > sections[2].offsetTop && scrollTop + 72 < sections[3].offsetTop){
    // startSkills();
    if (!isScoreDrawStarted){
      startSkills();
        }
  }else{
    isScoreDrawStarted = false;
  }		

  // navbar.classList.remove('open');


  //스크롤 탑 수치 표기
  // document.querySelector(".paraScroll span").innerText = parseInt(scrollTop);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}