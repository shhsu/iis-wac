import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AppContextService } from '@msft-sme/angular';
import { Logging } from '@msft-sme/core';
import { Observable } from 'rxjs';
import { deepCopyNaive, deepEqualNaive } from 'src/app/iis-mgmt/common/util/serialization';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { IISErrorDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/iis-error-dialog.component';
import { Strings } from 'src/generated/strings';

export type FormEditMode = 'new' | 'existing';

function isModifiedDefault(old: any, editing: any) {
    return !deepEqualNaive(old, editing);
}

@Component({
    selector: 'iis-form',
    templateUrl: 'iis-form.component.html',
})
export class IISFormComponent {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    public submitting = false;
    private _original: any;
    private _editing: any;
    private _isNew: boolean;

    @Output()
    submitted: EventEmitter<any>;

    @Input()
    submit: () => Observable<any>;

    @Input()
    close: () => {};

    @Input()
    checkModifications = isModifiedDefault;

    @Input()
    validate: (editing: any) => boolean;

    @ViewChild('iis-error-dialog')
    dialog: IISErrorDialogComponent;

    constructor(
        private appContext: AppContextService,
    ) { }

    @Input()
    set editNew(value: any) {
        if (this._original) {
            Logging.logVerbose(logSource, `Removing old item ${stringifySafe(this._original)}}`);
            this._original = null;
        }
        this._isNew = true;
        this._editing = value;
    }

    @Input()
    set editExisting(value: any) {
        if (this._original) {
            Logging.logVerbose(logSource, `Replacing old item ${stringifySafe(this._original)} with ${stringifySafe(value)}`);
        }
        this._isNew = false;
        this._original = value;
        this._editing = deepCopyNaive(value);
    }

    @Input()
    set editItem(param: {
        type: FormEditMode,
        value: any
    }) {
        switch (param.type) {
            case 'new':
                this.editNew = param.value;
                break;
            case 'existing':
                this.editExisting = param.value;
                break;
        }
    }

    get item() {
        return this._editing;
    }

    private isModified() {
        return this._isNew || this.checkModifications(this._original, this._editing);
    }

    // TODO: do this on navigation?
    onCancel() {
        if (this.isModified()) {
            this.appContext.frame.showDialogConfirmation({
                title: this.strings.MsftIISWAC.common.discardChangeTitle,
                message: this.strings.MsftIISWAC.common.discardChangeMessage,
                confirmButtonText: this.strings.MsftIISWAC.common.proceed,
                cancelButtonText: this.strings.MsftIISWAC.common.cancel,
            }).subscribe(
                response => {
                    if (response.confirmed) {
                        this.close();
                    }
                },
                e => {
                    Logging.logError(logSource, `Error during cancel dialog ${stringifySafe(e)}`);
                }
            );
        }
    }

    onSubmit() {
        if (!this.isModified()) {
            Logging.logVerbose(logSource, `No changes were made, submit action will close the view`);
            this.close();
        } else {
            if (this.validate(this._editing)) {
                this.submitting = true;
                this.submit().subscribe(
                    _ => { },
                    e => {
                        this.dialog.show({
                            headline: this.strings.MsftIISWAC.common.errorSubmitData,
                            error: e,
                            showDetails: false,
                        });
                        Logging.logError(logSource, `Error submitting user input ${stringifySafe(e)}`);
                        this.submitting = false;
                    },
                    () => {
                        this.close();
                    },
                );
            }
        }
    }
}

const logSource = (typeof IISFormComponent).toString();
