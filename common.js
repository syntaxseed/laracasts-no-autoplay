/**
 * Globally accessible functions and variables.
 */

const classChangeObserver = new MutationObserver(attributeObserverCallback);

/**
 * Register a listener for the 'next video' modal to be added to the page dom.
 */
function listenForEndOfVideo(){
    console.log("LaracastsNoAutoPlay: Adding listener.");

    waitForSwalOverlay('.swal-overlay').then((elm) => { // .swal-overlay--show-modal
        console.log('LaracastsNoAutoPlay: Overlay has been added to the page.');
        let swalOverlay = document.querySelector('.swal-overlay');
        classChangeObserver.observe(swalOverlay, {attributes: true});
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

/**
 * Callback for an observer waiting for the class on the swal modal to change and the modal to become shown.
 */
function attributeObserverCallback(mutationList, observer) {
    let swalOverlay = document.querySelector('.swal-overlay');
    mutationList.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            // A CSS class has changed. Check if it's the one we want.
            if(swalOverlay.classList.contains("swal-overlay--show-modal")){
                console.log('LaracastsNoAutoPlay: Modal is shown.');
                const swalCancelButton = document.querySelector('.swal-button--cancel');
                if(swalCancelButton != null){
                    console.log('LaracastsNoAutoPlay: Clicking cancel button.');
                    swalCancelButton.click();
                }
            }
        }
    });
}
