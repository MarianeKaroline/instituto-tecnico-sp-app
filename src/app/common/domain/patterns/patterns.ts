export abstract class PatternsDb {
    /** Pattern para validação de e-mail */
    public static email = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    /** Pattern para validação de nome completo (Nome + Sobrenome) */
    public static nomeCompleto = '([a-zA-ZéúíóáÉÚÍÓÁèùìòàÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂçÇ]+[ ]+)+(([a-zA-ZéúíóáÉÚÍÓÁèùìòàÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂçÇ]+))[ ]*';
    /** Pattern para validação de Telefone (fixo e celular) */
    public static telefone = {
        // fixo: /\(\d{2}\)[2-5]\d{3}-\d{4}/, // Com máscara
        fixo: /\(\d{2}\)[2-5]\d{3}-\d{4}|\d{10}/, // Com máscara ou 10 digitos (ddd + 8 digitos)
        // celular: /\(\d{2}\)9\d{4}-\d{4}/, // Com máscara
        celular: /\(\d{2}\)9\d{4}-\d{4}|\d{11}/, // Com máscara ou 11 digitos (ddd + 9 digitos)
        whatsapp: /^55\d{2}9\d{8}$/, // 11 digitos ddi(55) + ddd + 9 digitos
        // fixoCelular: /\(\d{2}\)\d{4,5}-\d{4}/, // Com máscara
        fixoCelular: /\(\d{2}\)\d{4,5}-\d{4}|\d{10,11}/, // Com máscara ou 10/11 digitos (ddd + 8/9 digitos)
    };
    public static login = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
}