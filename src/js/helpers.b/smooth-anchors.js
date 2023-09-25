function getTopOffset(percents = 100) {
    return window.innerHeight / 100 * percents;
}

function isMenuLinkClicked(link) {
    return link.classList.contains('menu__nav-link') || link.classList.contains('header__nav-link');
}

function scrollTosectionToScroll(percents = 9) {
    const linkElems = document.querySelectorAll('[href^="#"]')
    if (!linkElems) return;
    for (let i = 0; i < linkElems.length; i++) {
        const link = linkElems[i];
        link.addEventListener('click', (e) => {
            e.preventDefault()
            let href = link.getAttribute('href')
            if (!href || href == "#") return;
            let sectionToScroll = document.querySelector(href)
            if (!sectionToScroll) return;
            if (sectionToScroll.classList.contains('poppa')) return;
            if (sectionToScroll.classList.contains('b_modal')) return;

            if (isMenuLinkClicked(link)) {
                window.closeBurger();
            }
            window.scroll({
                top: sectionToScroll.getBoundingClientRect().top + pageYOffset - getTopOffset(percents),
                left: 0,
                behavior: 'smooth'
            })
        })
    }
}
scrollTosectionToScroll(10);