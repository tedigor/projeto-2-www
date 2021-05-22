const formatDate = function (date) {
    let formatedDate = date.split('-');

    return `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`;
}

module.exports = {formatDate};