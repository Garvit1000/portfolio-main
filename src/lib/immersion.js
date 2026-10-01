// While a full-screen scene owns the view, the site chrome (nav, peel corner)
// steps back. Several scenes can claim it; the class stays while any does.
const claims = new Set();

export function setImmersed(key, on) {
    if (on) claims.add(key); else claims.delete(key);
    document.documentElement.classList.toggle('immersed', claims.size > 0);
}
