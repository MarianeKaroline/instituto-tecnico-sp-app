import { ItspEnvironment } from "./itsp-environment";

export const environment = {
    production  : false,
    environment : ItspEnvironment.Local,

    api: {
        baseUrl     : 'http://localhost:5037',
        curso       : '/curso',
        home        : '/home',
    }
}