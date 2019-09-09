/*jshint esversion: 6 */
/*jshint sub:true*/
/*jshint expr: true */

let $ = window.$ || null;
function y(f) {
    return function () {
        return f.bind(null, y(f)).apply(this, arguments);
    };
}
!(function (b, c, d, f) {
    'use strict';
    function _el(e) { /* jshint validthis: true */ c.push.apply(this, e && e.nodeType ? [e] : '' + e === e ? b.querySelectorAll(e) : f); }
    function camel(s) { return s.replace(/-+(.)?/g, char => char ? char.toUpperCase() : ''); }
    $ = function (e) { return (typeof e==='function') ? /c/.test(b.readyState) ? e() : $(b).on('DOMContentLoaded', e) : new _el(e); };
    $[d] = _el[d] = $.fn = _el.fn = {
        length: 0,
        on: function (e, b) { return this.each((function (c) { c.addEventListener(e, b); })); },
        off: function (e, b) { return this.each((function (c) { c.removeEventListener(e, b); })); },
        each: function (e, b) { c.forEach.call(this, e, b); return this; },
        one: function(e, b) {
            this.each( (function(c) {
                c.addEventListener(e, y((function(callee, el) { el.target.removeEventListener(el.type, callee, false); return b.apply(c, arguments); })));
            }));
        },
        // DOM traversal
        first: function() { return $(this[0]); },
        last: function() { return $(this[this.length - 1]); },
        eq: function(i) { return $(this[i]); },
        children: function(e) { var a = this[0].map( x => x.queryAll(e)); return [].concat(...a);},
        find: function(e) { return this.each( c => { c.querySelector(e); }); },
        // DOM modification
        append: function(e) { return this.each( c => { c.append(e.cloneNode(true)), e.remove(); }); },
        prepend: function(e) { return this.each( c => { c.prepend(e.cloneNode(true)), e.remove(); }); },
        clone: function(e) { return e === []._ ? this[0].cloneNode(true) : this[0].cloneNode(false); },
        // manipulation - get/set text, html or input values
        text: function (e) { return e === []._ ? this[0].textContent : this.each( b => { b.textContent = e; }); },
        html: function (e) { return e === []._ ? this[0].innerHTML : this.each( b => { b.innerHTML = e; }); },
        empty: function () { return this.each( b => { b.innerHTML = ''; }); },
        remove: function() { return this.each( b => { b.parentNode.removeChild(b); }); },
        val: function (e) { return e === []._ ? this[0].value : this.each( b => { b.value = e; }); },
        // manipulate attributes
        attr: function (e, b) { return b === []._ ? this[0].getAttribute(e) : this.each( c => { c.setAttribute(e, b); }); },
        removeAttr: function (e) { return this.each( b => { b.removeAttribute(e); }); },
        hasAttr: function (e) { return this[0].hasAttribute(e); },
        // class
        hasClass: function(e) { return this[0].classList.contains(e); },
        data: function(k, v) {
            if (typeof k === 'string' && v === []._) { var el = this.nodeType ? this : this[0]; return el && 'dataset' in el ? el['dataset'][camel(k)] : undefined; } return this.each( el => { el['dataset'][camel(k)] = v; }); },
        // visibility
        hide: function() { return this.each( e => { e.style.display = 'none'; }); },
        show: function() { return this.each( e => { e.style.display = 'block'; }); },
        toggle: function() { return this.each( e => { e.style.display = e.style.display === 'block' ? 'none' : 'block'; }); },
        position: function() { return { top: this[0].offsetTop, left: this[0].offsetLeft }; },
        offset: function() { 
            var r = this[0].getBoundingClientRect(), db = document.body;
            return { top: r.top + db.scrollTop, left: r.left + db.scrollLeft }; },
        pos: function() { return { 'x': window.scrollX, 'y': window.scrollY }; },
        sort: c.sort,
        splice: c.splice
    };
    const props = ['addClass', 'removeClass', 'toggleClass'], maps = ['add', 'remove', 'toggle'];
    props.forEach((function(p, i) { $.fn[p] = function(e) { return this.each( b => { b.classList[maps[i]](e); }); }; }));
    ['width','height'].forEach((function( n, i ) {
        $.fn[n] = function(c) {
            return (typeof c === 'number') ? this[0].style[n] = c+'px' : (typeof c === typeof true) ? this[0]['offset'+cap(n)] : parseInt(getComputedStyle(this[0], null)[n]);
        };
    }));
    const evt = ['blur','focus','focusin','focusout','resize','scroll','click','dblclick','mousedown','mouseup','mousemove','mouseover','mouseout','mouseenter','mouseleave','change','select','submit','keydown','keypress','keyup','contextmenu'];
    evt.forEach((function( n, i ) { $.fn[n] = function(cb) { return this.on(n, cb); }; }));
})(document, [], 'prototype');

/** .fadeOut()
 * @param {integer} d   optional - duration of transition, default is 400
 * @param {method} fn   optional - callback function
 */
$.fn.fadeOut = function(d=400, fn=null) {
    var tick = 0, frm = 16.5, dur;
    if (typeof d !== 'function') { dur = frm / parseInt(d, 10); } else { dur = (frm/400); fn = d; }
    return this.each( e => {
        e.style.opacity = 1;
        function run() {
            e.style.opacity -= dur;
            if (e.style.opacity < 0) { tick = 1, e.style.opacity = 0, e.style.display = 'none', (typeof fn ==='function') ? fn.apply() : fn; }
            if (!tick) requestAnimationFrame(run);
        }
        run();
    });
};

/** .fadeIn()
 * @param {integer} d   optional - duration of transition, default is 400
 * @param {method} fn   optional - callback function
 */
$.fn.fadeIn = function(d=400, fn=null) {
    var tick = 0, frm = 16.5, dur;
    if (typeof d !== 'function') { dur = frm / parseInt(d, 10); } else { dur = (frm/400); fn = d; }
    return this.each( e => {
        e.style.opacity = 0;
        e.style.display = '';
        function run() {
            e.style.opacity =+ parseFloat(e.style.opacity) + dur;
            if (e.style.opacity > 1) { tick = 1; e.style.opacity = 1; (typeof fn ==='function') ? fn.apply() : fn; }
            if (!tick) requestAnimationFrame(run);
        }
        run();
    });
};

$.fn.parents = function(e) {
    return this.each( c => {
        for ( ; c && c !== document; c = c.parentNode ) {
            if ( c.matches( e ) ) return c;
        }
        return null;
    });
};
// find: function(e) { return this.each( c => { c.querySelector(e); }); },