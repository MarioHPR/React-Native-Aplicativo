import { translate } from "../locales";
import moment from 'moment';

export const campoStringVazio = (campo: string): boolean => {
    return campo === "" || campo === undefined || campo === null;
}

export const requisitoNaoContemDominimoEmail = (campo: string): boolean => {
    return !campo.includes('@gmail.com');
}

export const requisitoSenhaNaoContemTamanhoMinimo = (campo: string): boolean => {
    return campo.length < 6;
}

export const localeDateToISO = (localeDate: string) => {
    return localeDate.split('/').reverse().join('-');
  };

export const dataValida = (campo: string): string => { 
    if(campoStringVazio(campo)){
        return translate("alertPadrao");
    }
    const date = moment(localeDateToISO(campo)); 
    return date.isValid() ? "" : translate("error.data");
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

export const verificaCampoVazio = (valor: string): string => {
    return campoStringVazio(valor) ? translate("alertPadrao") : "";
}