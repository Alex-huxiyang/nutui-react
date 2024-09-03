export function jestFakeTimersAreEnabled() {
    if (typeof jest !== 'undefined' && jest !== null) {
        return (
        // legacy timers
        setTimeout._isMockFunction === true ||
            // modern timers
            // eslint-disable-next-line prefer-object-has-own -- not supported by our support matrix
            Object.prototype.hasOwnProperty.call(setTimeout, 'clock'));
    }
    // istanbul ignore next
    return false;
}
export function getNodeText(node) {
    if (node.matches('input[type=submit], input[type=button], input[type=reset]')) {
        return node.value;
    }
    return Array.from(node.childNodes)
        .filter(child => child.nodeType === 3 && Boolean(child.textContent))
        .map(c => c.textContent)
        .join('');
}
