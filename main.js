const title = "Google";
const favicon = "https://www.google.com/favicon.ico";
const panicKey = "v";
const panicUrl = "https://www.google.com/";

function load() {
    document.title = title;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = favicon ;

    document.addEventListener('keydown', event => {
        if (event.key === panicKey) {
            window.open(panicUrl, '_blank');
        }
    });
}

document.addEventListener('DOMContentLoaded', load);
