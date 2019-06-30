import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFilmeMusica } from 'app/shared/model/filmeMusica.model';

type EntityResponseType = HttpResponse<IFilmeMusica>;
type EntityArrayResponseType = HttpResponse<IFilmeMusica[]>;

@Injectable({ providedIn: 'root' })
export class FilmeMusicaService {
    public resourceUrl = SERVER_API_URL + 'api/filme-musicas';

    constructor(protected http: HttpClient) {}

    create(filmeMusica: IFilmeMusica): Observable<EntityResponseType> {
        return this.http.post<IFilmeMusica>(this.resourceUrl, filmeMusica, { observe: 'response' });
    }

    update(filmeMusica: IFilmeMusica): Observable<EntityResponseType> {
        return this.http.put<IFilmeMusica>(this.resourceUrl, filmeMusica, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFilmeMusica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFilmeMusica[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
