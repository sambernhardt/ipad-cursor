const getRelativePosition = (pageCoords, element) => {
    return {
        x: pageCoords.x - element.offsetLeft,
        y: pageCoords.y - element.offsetTop
    }
}

module.exports = {
    getRelativePosition
}