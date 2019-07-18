import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { RepositoryService } from 'src/app/iis-mgmt/service/repository.service';
import { WACComponent } from 'src/app/iis-mgmt/shared-components/generic/wac-component';

export class SettingTabComponent<T> extends WACComponent {
    private _id: number;
    private _item: T;

    constructor(
        idComponent: any,
        route: ActivatedRoute,
        private srv: RepositoryService<T>,
    ) {
        super();
        let cursor = route;
        while (cursor.component !== idComponent) {
            cursor = cursor.parent;
            if (!cursor) {
                throw Error(`Unable to find idComponent ${idComponent}`);
            }
        }
        cursor.paramMap.subscribe(
          params => {
            const rawId = params.get('id');
            if (rawId) {
              this.id = parseInt(rawId, 10);
            }
          }
        );
    }

    set id(val: number) {
        this._id = val;
        this.content = this.srv.get(val).pipe(
            tap(v => this._item = v),
        );
    }

    get id() {
        return this._id;
    }

    get item(): T {
        return this._item;
    }
}
