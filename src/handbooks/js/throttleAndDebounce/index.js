/**
 * @author BKY
 * @param { Function } fn
 * @param { Number } wait
 * @param { Boolean } immediate
 *
 * @function debounce 防抖，前一次操作之后，wait毫秒内无操作，将fn加入执行队列。 常用场景：输入检测，重复点击事件
 * @function throttle 节流，wait毫秒之后将fn加入执行队列，第一次操作wait毫秒之后的操作无效。 常用场景：scroll, move 等事件
 */

export function debounce(fn, wait, immediate) {
    let timer = null;

    return function (...args) {

        if (immediate && !timer) {
            fn.apply(this, args);
        }
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    };
}

export function throttle(fn, wait, immediate) {
    let timer = null;
    let callNow = true;

    return function (...args) {

        if (callNow && immediate) {
            fn.apply(this, args);
            callNow = false;
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, wait);
        }
    };
}
