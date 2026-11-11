import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Campanha } from "../models/campanha.model";

type FirebaseCampanha = Omit<Campanha, "id"> & { id?: unknown };

@Injectable({ providedIn: "root" })
export class CampanhasService {
  private http = inject(HttpClient);
  private apiUrl =
    "https://clean-city-f7048-default-rtdb.firebaseio.com/campanhas";
  private sufix = ".json";

  getAll(): Observable<Campanha[]> {
    return this.http
      .get<Record<string, FirebaseCampanha> | null>(this.apiUrl + this.sufix)
      .pipe(
        map((response) => {
          if (!response) {
            return [];
          }
          return Object.entries(response).map(([id, campanha]) => {
            const { id: _ignoredId, ...campanhaData } = campanha;
            return { id, ...campanhaData } as Campanha;
          });
        }),
      );
  }

  getById(id: string): Observable<Campanha> {
    return this.http
      .get<FirebaseCampanha | null>(`${this.apiUrl}/${id}${this.sufix}`)
      .pipe(
        map((response) => {
          if (!response) {
            throw new Error("Campanha não encontrado!");
          }
          const { id: _ignoredId, ...campanhaData } = response;
          return { id, ...campanhaData };
        }),
      );
  }

  create(campanha: Omit<Campanha, "id">): Observable<Campanha> {
    return this.http
      .post<{ name: string }>(this.apiUrl + this.sufix, campanha)
      .pipe(
        map((response) => ({
          id: response.name,
          ...campanha,
        })),
      );
  }

  update(id: string, campanha: Omit<Campanha, "id">): Observable<Campanha> {
    return this.http
      .put<Omit<Campanha, "id">>(`${this.apiUrl}/${id}${this.sufix}`, campanha)
      .pipe(
        map((response) => ({
          id,
          ...campanha,
        })),
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }
}
