import { ItspEnvironment } from "./itsp-environment";

export const environment = {
    production  : true,
    environment : ItspEnvironment.Production,

    api: {
        baseUrl     : 'http://localhost:5037',
        curso       : '/curso',
        home        : '/home',
    }
}