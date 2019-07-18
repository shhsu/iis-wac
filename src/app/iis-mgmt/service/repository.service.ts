import { Observable } from 'rxjs';

export interface RepositoryService<T> {
    getAll(): Observable<T>;
    get(id: number): Observable<T>;
}
