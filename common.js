/**
 * Globally accessible functions and variables.
 */

/**
 * Register a listener for the 'next video' popup and click cancel if it appears.
 */
function listenForEndOfVideo(){
    console.log("LaracastsNoAutoPlay: Adding listener.");

    waitForSwalOverlay('.swal-overlay--show-modal').then((elm) => {
        console.log('LaracastsNoAutoPlay: Overlay has appeared.');
        const swalCancelButton = document.querySelector('.swal-button--cancel');
        swalCancelButton.click();
    });
}

/**
 * Function which listens for an element via the given selector to appear.
 */
function waitForSwalOverlay(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
