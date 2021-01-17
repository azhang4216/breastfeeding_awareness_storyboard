// tutorial from https://www.youtube.com/watch?v=C9EWifQ5xqA
const slider = document.querySelector('.slider');
let scrollLeft;
let startPos;
let isDown = false;
console.log('got in script')

slider.addEventListener('mousedown', (e) =>{
  isDown = true;
  startPos = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  console.log('pressed');
});

slider.addEventListener('mousemove', (e) =>{
  e.preventDefault();
  if(isDown){
    const x = e.pageX - slider.offsetLeft;
    const distance = x- startPos;
    slider.scrollLeft = scrollLeft - distance;
  }
});

slider.addEventListener('mouseleave', () =>{
  isDown = false;
});

slider.addEventListener('mouseup', () =>{
  isDown = false;
});