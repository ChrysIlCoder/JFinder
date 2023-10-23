export function checkImageURL(url) {
    if (!url) return false
    else {
        const pattern = new RegExp('ìhttps?:\\/\\/.+\\.(png|jpeg|jpg|bmp|gif|webp)$', 'i')
        return pattern.test(url)
    }
}