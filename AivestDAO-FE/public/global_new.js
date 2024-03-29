function setSwiper() {
    if(typeof Swiper === 'undefined'){
        return;
    }
    var mySwiper = new Swiper('#page-container', {
        direction: 'vertical', // 垂直切换选项
        // loop: true, // 循环模式选项
        mousewheel: true,
        // 如果需要分页器
        // pagination: {
        //     el: '.swiper-pagination',
        // },

        // 如果需要前进后退按钮
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },

        // 如果需要滚动条
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
    })
}

function resize() {
    document.querySelector('#app').style.display="flex";
    var displayWidth = window.innerWidth;
    var displayHeight = window.innerHeight - 70;
    var originalHeight = 607;
    var originalWidth = 1080;
    var horizontalRatio = displayWidth / originalWidth;
    var verticalRatio = displayHeight / originalHeight;
    var containRatio = horizontalRatio < verticalRatio ? horizontalRatio : verticalRatio;
    document.querySelectorAll('.pf.w0.h0, #page-container').forEach((ele) => {
        ele.style.width = containRatio * originalWidth + 'px';
        ele.style.height = containRatio * originalHeight + 'px';
    })
    // document.querySelectorAll('.menu-wrapper').forEach((ele) => {
    //     ele.style.width = containRatio * originalWidth + 'px';
    // })
    document.querySelectorAll('.pc.w0.h0').forEach((ele) => {
        // ele.style.transform = `scale(${window.innerWidth/originalWidth.5})`
        ele.style.transform = `scale(${containRatio})`
    })
    setSwiper();
}
resize();
window.addEventListener('load', ()=>{
    setTimeout(resize);
})
window.addEventListener('resize', resize)

// function redirect(){
//     if(window.location.protocol==='https:'){
//         window.location.href = window.location.href.replace('https', 'http');
//     }
// }
// redirect();