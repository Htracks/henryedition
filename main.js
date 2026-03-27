const title = localStorage.getItem("title") || "WDB Games";
const favicon = localStorage.getItem("faviconUrl") || "favicon.ico";
const keybind = localStorage.getItem("keybind") || "v";
const keybindUrl = localStorage.getItem("keybindUrl") || "about:blank";

function load() {
    document.title = title;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }

    link.href = favicon;

    document.addEventListener('keydown', event => {
        if (document.activeElement.tagName === "INPUT") {
            return;
        }

        if (event.key === keybind) {
            window.open(keybindUrl, '_blank');
        }
    });
}

document.addEventListener('DOMContentLoaded', load);
