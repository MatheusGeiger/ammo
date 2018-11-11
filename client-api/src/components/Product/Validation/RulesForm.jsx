function isValidId(id){
    return true;
}

function isValidTitle(title){
    if (title !== '' && title.length !== 0) {
        return true;
    } else {
        return false;
    }
}

function isValidPrice(price) {
    if (price === '' && price.length !== 0) {
        return false;
    } else {
        return true;
    }
}

function isValidPercentageDiscount(percentageDiscount) {
    if (percentageDiscount === '' 
    && percentageDiscount.length !== 0 
    && percentageDiscount >= 0 
    && percentageDiscount <= 100) {
        return false;
    } else {
        return true;
    }
}

function isValidCategory(category) {
    if (category === '' && category.length !== 0) {
        return false;
    } else {
        return true;
    }
}

function isValidPhotos(photos) {
    try {
        photos = JSON.parse(photos);
        if (photos.length !== 4) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}
    

const fieldValidateFunction = {
    '_id': isValidId,
    'title': isValidTitle,
    'price': isValidPrice,
    'percentageDiscount': isValidPercentageDiscount,
    'category': isValidCategory,
    'photos': isValidPhotos
};

function isValidField (field, value) {
    return fieldValidateFunction[field](value);
}

function isValidForm (fieldsValues) {
    var status = true;
    Object.keys(fieldsValues).map(field => {
        if (false === fieldValidateFunction[field](fieldsValues[field])) {
            status = false;
        }
    });
    return status;
}

export {isValidField, isValidForm};