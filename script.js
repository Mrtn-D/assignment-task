const pageHeight = window.screen.height;
$(document).ready(function () {
    $(document).scroll((e) => {
        const currentScroll = window.scrollY;
        if (currentScroll >= pageHeight / 2) {
            $('#back-button').show();
        } else {
            $('#back-button').hide();
        }
    });
    $('#nav-button').click(() => {
        $('.nav-bar-mobile').toggle();
    });

    $('#load-more-button').click(async () => {
        const cat = await getCat()
        $('.owl-carousel')
            .trigger('add.owl.carousel', [`<div class="item"><img src=${cat.url}></div>`])
            .trigger('refresh.owl.carousel');
    });

    $('#back-button').click(() => {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 3,
                nav: false
            },
        }
    });
});


const getCat = () => {
    return fetch('https://api.thecatapi.com/v1/images/search?size=full').then(res => res.json()).then(res => {
        return res[0];
    });
}