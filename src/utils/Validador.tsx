import { translate } from "../locales";

export const campoStringVazio = (campo: string): boolean => {
    return campo === "" || campo === undefined || campo === null;
}

export const requisitoNaoContemDominimoEmail = (campo: string): boolean => {
    return !campo.includes('@gmail');
}

export const requisitoSenhaNaoContemTamanhoMinimo = (campo: string): boolean => {
    return campo.length < 6;
}

export const verificaEmailInvalido = (valor:string): string => {
    if(campoStringVazio(valor)){
        return translate("alertPadrao");
    } else {
        if(requisitoNaoContemDominimoEmail(valor)){
            return translate("email.error.alertaEmail");
        } else {
            return "";
        }
    }       
}

export const verificaSenhaInvalida = (valor:string): string => {
    if(campoStringVazio(valor)) {
        return translate("alertPadrao");
    } else {
        if(requisitoSenhaNaoContemTamanhoMinimo(valor)) {
            return translate("senha.error.alertMinimoCaracter");
        } else {
            return "";
        }
    }
}