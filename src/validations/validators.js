
const isEmpty=function (name){
    if(name.trim().length!=0)return true; 
    return false;
}

const validLogoLink=function(name){
    if(name.match(/(http[s]:\/\/)([a-z\-0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-\/._~:?#\[\]@!$&'()+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i))
    return true
    return false
}


module.exports={isEmpty,validLogoLink}

