export const useGenerarCodigosAleatorios = (data) => {
    const characters = "0123456789";
    const codeLength = 8;
    let randomCode ="";
    for(let i=0; i<codeLength; i++){
        randomCode+= characters.charAt(
            Math.floor(Math.random()*characters.length)
        )
    };
    const codigo = `${randomCode}`;
    return codigo;
}