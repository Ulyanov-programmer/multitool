class IsMobile {
    static Android() {
        return navigator.userAgent.match(/Android/i);
    }
    static BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    }
    static iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
    static Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
    }
    static Windows() {
        return navigator.userAgent.match(/IEMobile/i);
    }
    static any() {
        return (
            this.Android() || this.BlackBerry() ||
            this.iOS() || this.Opera() || this.Windows()
        );
    }
}
// ? IsMobile before ECMAScript 2015
/* const isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return ( isMobile.Android() || isMobile.BlackBerry() ||
            isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
 }; */

if (IsMobile.any()) {
    body.classList.add('_touch');
} else {
    body.classList.add('_pc');
}