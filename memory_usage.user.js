// ==UserScript==
// @name        memory_usage
// @namespace    http://tampermonkey.net/
// @version      2024-02-22
// @description  Display web page memory usage
// @author       vijayaraagavan
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const css = `
    .jojo-container {
        border-radius: 50%;
        background-color: red;
        position: absolute;
        right: 5px;
        top: 57px;
        width: 49px;
        height: 44px;
        padding: 4px;
        text-align: center;
        z-index: 999;
        opacity: 0.7;
    }
    .jojo-text {
        color: white;
        font-weight: bold;
        font-size: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    `
    const div = document.createElement('div')
    div.classList.add('jojo-container')
    const txt = document.createElement('p');
    const parser = new DOMParser();
    const parsedContent = parser.parseFromString('0 MB', 'text/html');
    txt.innerHTML = parsedContent.body.innerHTML;
    txt.classList.add('jojo-text')
    txt.id = 'jojo-memory-id'

    div.appendChild(txt)
    let style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(css))
    document.head.appendChild(style)
    document.body.appendChild(div)

    const getMemory = () => {
      const heap = window.performance.memory.usedJSHeapSize
      const consumed = heap / (1024 * 1024);
      return consumed.toFixed(1);
    }
    const setMemory = () => {
      const el = document.getElementById('jojo-memory-id');
      const parser = new DOMParser();
      const parsedContent = parser.parseFromString(getMemory() + ' MB', 'text/html');
      el.innerHTML = parsedContent.body.innerHTML;
    }
    setInterval(setMemory, 5000)
})();
