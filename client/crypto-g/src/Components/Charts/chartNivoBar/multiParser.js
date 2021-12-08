export function multiParser (arr) {
    return arr.map(({id, data}) => {
            const weekData = data.reduce((accum, currentDay) => {
                accum[currentDay.x] = currentDay.y
                return accum;
            }, {});

            return {
                currency: id,
                ...weekData,
            }
    })
}