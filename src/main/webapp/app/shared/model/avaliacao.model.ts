export interface IAvaliacao {
    id?: number;
    comentario?: string;
    nomeUsuario?: string;
    emailUssuario?: string;
    nota?: number;
    id_filme?: number;
}

export class Avaliacao implements IAvaliacao {
    constructor(
        public id?: number,
        public comentario?: string,
        public nomeUsuario?: string,
        public emailUssuario?: string,
        public nota?: number,
        public id_filme?: number
    ) {}
}
