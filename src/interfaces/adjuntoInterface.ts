import { IEvento } from "./eventoInterface"
import { IGrupoAdjunto } from "./grupoAdjuntoInterface"
import { ITipoAdjunto } from "./tipoAdjuntoInterface"

export interface IAdjunto {
    id?: number
    id_tipoadjunto?: number
    id_grupoadjunto?: number
    id_evento?: number
    titulo?: string
    titulo_url?: string
    descripcion?: string
    filename?: string
    originalname?: string
    filepath?: string
    mimetype?: string
    size?: number
    es_descargable?: boolean
    es_visible?: boolean
    user_crea?: string
    user_actualiza?: string
    user_elimina?: string
    estado?: boolean
    tipoAdjunto?: ITipoAdjunto
    grupoAdjunto?: IGrupoAdjunto
    evento?: IEvento
}