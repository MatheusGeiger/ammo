
const messagesField = {
    'title': 'Tile is required and valid',
    'price': 'Price is required and valid',
    'percentageDiscount': 'Percetage Discount is required and valid',
    'category': 'Category is required and valid',
    'photos': 'Photos is required and valid'
};

const messagesForm = {
    'products': 'Dados do produto inválido'
};

export const getMessageErrorFromField = (field) => {
    return messagesField[field];
};

export const getMessageErrorFromForm = (form) => {
    return messagesForm[form];
};
