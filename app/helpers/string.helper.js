


// datetime---------------------------------------------------------------------------------------------------



function random(type='hash',length=32) {
    let characters ='';
    characters   = type == 'hash' ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' : characters;
    characters   = type == 'string' ? 'abcdefghijklmnopqrstuvwxyz0123456789' : characters;
    characters   = type == 'alphabets' ? 'abcdefghijklmnopqrstuvwxyz' : characters;
    characters   = type == 'numbers' ? '1234567890' : characters;

    let result = '';
    const charactersLength = characters.length;
    for(let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



exports.random = random;