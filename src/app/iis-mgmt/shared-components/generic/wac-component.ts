import { Logging } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { Strings } from 'src/generated/strings';

export abstract class WACComponent {
    public readonly strings: Strings = MsftSme.resourcesStrings<Strings>();
    private _loading = true;

    constructor(
        private canPartialRender: boolean = false,
    ) {
    }

    public get loading(): boolean {
        return this._loading;
    }

    protected set content(o: Observable<any>) {
        o.subscribe(
            _ => {
                this._loading = !this.canPartialRender;
            },
            error => {
                throw error;
                // Logging.logError(logSource, error);
            },
            () => {
                Logging.logVerbose(logSource, `Marking component as loaded`);
                this._loading = false;
            },
        );
    }
}

const logSource = (typeof WACComponent).toString();
