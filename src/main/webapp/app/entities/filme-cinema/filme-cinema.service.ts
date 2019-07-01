import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFilmeCinema } from 'app/shared/model/filmeCinema.model';

type EntityResponseType = HttpResponse<IFilmeCinema>;
type EntityArrayResponseType = HttpResponse<IFilmeCinema[]>;

@Injectable({ providedIn: 'root' })
export class FilmeCinemaService {
    public resourceUrl = SERVER_API_URL + 'api/filme-cinemas';

    constructor(protected http: HttpClient) {}

    create(filmeCinema: IFilmeCinema): Observable<EntityResponseType> {
        return this.http.post<IFilmeCinema>(this.resourceUrl, filmeCinema, { observe: 'response' });
    }

    update(filmeCinema: IFilmeCinema): Observable<EntityResponseType> {
        return this.http.put<IFilmeCinema>(this.resourceUrl, filmeCinema, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFilmeCinema>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFilmeCinema[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
