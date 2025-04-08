import { ItspUtils } from "../../../core/utils/itsp-utils";

export abstract class MasksDb {

    // -----------------------------------------------------------------------------------------------------
    // @ Datetime
    // -----------------------------------------------------------------------------------------------------

    /** Máscara para formatação de Data Hora*/
    public static dataHora = 'dd/MM/yyyy hh:mm:ss a';

    /** Máscara para formatação de Data*/
    public static data = 'dd/MM/yyyy';

    public static latitudeMask = '00.000000';

    public static longitudeMask = '00.000000';

    // -----------------------------------------------------------------------------------------------------
    // @ Phone
    // -----------------------------------------------------------------------------------------------------

    /** Máscara para formatação de CPF */
    public static cpf = '000.000.000-00';
    /** Máscara para formatação de CNPJ */
    public static cnpj = '00.000.000/0000-00';
    /** Máscara para formatação de Telefone (fixo e celular) */
    public static telefone = {
        fixo: {
            /** Telefone fixo formato com DDI => `55 (41) 3232-3232` */
            ddi: '00 (00) 0000-0000',
            /** Telefone fixo formato com DDD => `(41) 3232-3232` */
            ddd: '(00) 0000-0000'
        },
        celular: {
            /** Telefone celular formato com DDI => `55 (41) 99898-9898` */
            ddi: '00 (00) 00000-0000',
            /** Telefone celular formato com DDD => `(41) 99898-9898` */
            ddd: '(00) 00000-0000'
        },
        /** Telefone não-geográfico no padrão => `0800 808 8080` */
        padrao_0800_1: '0000 000 0000',
        /** Telefone não-geográfico no padrão => `0800 8080 8080` */
        padrao_0800_2: '0000 0000 0000'
    };
    /** Máscara para formatação de CEP*/
    public static cep = '00000-000';

    /** Máscara para formatar telefone como fixo ou celular, de acordo com o argumento `value` */
    public static telefoneFixoCelular(value: string): string | null {

        const str = ItspUtils.getNumbers(value);

        if (!str)
            return null;

        // Check for special patterns
        if ( this._is0800Pattern(str) )
        {
            if (str.length == 11)
                return MasksDb.telefone.padrao_0800_1;

            if (str.length == 12)
                return MasksDb.telefone.padrao_0800_2;

            return null;
        }

        // Fixo (DDD)       : 41 3232-3232      => 4132323232       => Length: 10
        // Celular (DDD)    : 41 9 9898-9898    => 41998989898      => Length: 11
        // Fixo (DDI)       : 55 41 3232-3232   => 554132323232     => Length: 12
        // Celular (DDD)    : 55 41 9 9898-9898 => 5541998989898    => Length: 13

        if (str?.length == 11) // Celular DDD
            return MasksDb.telefone.celular.ddd;

        if (str?.length == 12) // Fixo DDI
            return MasksDb.telefone.fixo.ddi;

        if (str?.length == 13) // Celular DDI
            return MasksDb.telefone.celular.ddi;

        if (str?.length == 10) // Fixo DDD
            return MasksDb.telefone.fixo.ddd;

        return null; // Ramal telefônico
    }

    /** Máscara para formatar CNPJ ou CPF, de acordo com o argumento `value` */
    public static cnpjCpf(value: string): string {

        const str = ItspUtils.getNumbers(value);
        return str?.length > 11 ? MasksDb.cnpj : MasksDb.cpf;
    }

    /** Máscara para formatar latitude, de acordo com o argumento `value` */
    public static latitude(value: number): string {

        return value < 0 ? '-' + MasksDb.latitudeMask : MasksDb.latitudeMask;
    }

    /** Máscara para formatar longitude, de acordo com o argumento `value` */
    public static longitude(value: number): string {

        return value < 0 ? '-' + MasksDb.longitudeMask : MasksDb.longitudeMask;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /** Checks if the phone number have a `0800` pattern (`0800`, `0300`, `0500`, ...) */
    private static _is0800Pattern(value: string): boolean {

        // const patterns = ['0800', '0300', '0500', '0900'];
        const pattern = /0\d00(\d{7,8})/g;

        return pattern.test(value);
    }
}