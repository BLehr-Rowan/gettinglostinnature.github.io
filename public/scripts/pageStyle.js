
const pageName = window.location.pathname.split('/').pop().replace('.html', '');

if (pageName) {
    document.body.classList.add(`${pageName}-page`);
} else {
    document.body.classList.add('index-page'); 
}
