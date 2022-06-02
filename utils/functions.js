const { SORT_BY_OPTION, DIRECTION } = require("./constants");

exports.removeDuplicates = (arr, primaryKey) => {
    return [...new Map(arr.map(item => [item[primaryKey], item])).values()];
}

exports.getDirection = (text) => {
    let direction = DIRECTION.indexOf(text);

    // if direction is 'desc' we pass false flag to the sortBy function
    return direction === 1 ? false : true;
}

exports.getSortByKey = (text) => {
    let sortKey = SORT_BY_OPTION.indexOf(text);

    return sortKey === -1 ? 0 : sortKey;
}

exports.sortBy = (arr, sortKey, directionFlag) => {
    const sortByKey = SORT_BY_OPTION[sortKey];

    // sort results by order 
    // true = ascending, false = descending
    return directionFlag ? arr.sort((a, b) => (a[sortByKey] < b[sortByKey]) ? -1 : 1) : arr.sort((a, b) => (a[sortByKey] > b[sortByKey]) ? -1 : 1);
}

// handle error conditions if query parameters are invalid
exports.validateQuery = (fields) => {
    return (req, res, next) => {
        for (const _ of fields) {
            if (!req.query['tags']) {
                return res
                    .status(400)
                    .send({ "error": `Tags parameter is required` })
            }

            if (req.query['sortBy'] && !SORT_BY_OPTION.includes(req.query['sortBy'])) {
                return res
                    .status(400)
                    .send({ "error": `sortBy parameter is invalid` })
            }

            if (req.query['direction'] && !DIRECTION.includes(req.query['direction'])) {
                return res
                    .status(400)
                    .send({ "error": `direction parameter is invalid` })
            }
        }
        next();
    }
}