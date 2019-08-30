import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Logging } from '@msft-sme/core';
import { Observable, of } from 'rxjs';
import { DeactivateGuardedComponent } from 'src/app/iis-mgmt/common/can-deactivate';
import { deepCopyNaive, findDelta } from 'src/app/iis-mgmt/common/util/serialization';
import { stringifySafe } from 'src/app/iis-mgmt/common/util/string-utils';
import { RouteDeactivationService } from 'src/app/iis-mgmt/service/ui/route-deactivation.service';
import { IISErrorDialogComponent } from 'src/app/iis-mgmt/shared-components/dialog/error/iis-error-dialog.component';
import { Strings } from 'src/generated/strings';

export type FormEditMode = 'new' | 'existing';
export const FormEditMode = {
    New: 'new' as FormEditMode,
    Existing: 'existing' as FormEditMode,
};

function validateStub(_: any) {
    return true;
}

function submitStub() {
    return of(true);
}

@Component({
    selector: 'iis-form',
    templateUrl: 'iis-form.component.html',
})
export class IISFormComponent implements DeactivateGuardedComponent, OnInit, OnDestroy {
    public readonly strings = MsftSme.resourcesStrings<Strings>();

    public submitting = false;
    private _original: any;
    private _editing: any;
    private _isNew: boolean;

    @Output()
    submitted: EventEmitter<any>;

    @Output()
    exited = new EventEmitter<boolean>();

    @Input()
    submitText = this.strings.MsftIISWAC.common.submit;

    @Input()
    submit: () => Observable<any> = submitStub;

    @Input()
    validate: (editing: any) => boolean = validateStub;

    @Input()
    registerDeactivation = true;

    @ViewChild('iis-error-dialog')
    dialog: IISErrorDialogComponent;
    delta: any;

    private exitConfirmed = false;

    constructor(
        private formSrv: RouteDeactivationService,
    ) { }

    @Input()
    set editNew(value: any) {
        if (this._original) {
            Logging.logVerbose(logSource, `Removing old item ${stringifySafe(this._original)}}`);
            this._original = null;
        }
        this._isNew = true;
        this._editing = value;
        this.exitConfirmed = false;
    }

    @Input()
    set editExisting(value: any) {
        if (this._original) {
            Logging.logVerbose(logSource, `Replacing old item ${stringifySafe(this._original)} with ${stringifySafe(value)}`);
        }
        this._isNew = false;
        this._original = value;
        this._editing = deepCopyNaive(value);
        this.exitConfirmed = false;
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

    private isModified(): boolean {
        return this.delta = findDelta(this._original, this._editing);
    }

    onCancel() {
        return this.confirmExit().subscribe(
            confirmed => {
                if (confirmed) {
                    this.exited.next(false);
                }
            }
        );
    }

    canDeactivate(
        _: ActivatedRouteSnapshot,  // currentRoute
        __: RouterStateSnapshot, // currentState
        ___?: RouterStateSnapshot,  // nextState
    ): Observable<boolean> {
        return this.confirmExit();
    }

    // private onVerifyExitConfirmation = (res: RpcDialogChoiceResponse) => {
    //     const confirmed = res.confirmed;
    //     this.exitConfirmed = confirmed;
    //     return confirmed;
    // }

    private confirmExitDialog(msg: string): Observable<boolean> {
        // TODO - FIX: the following is a hack that use a browser dialog instead of sme dialog
        const confirmed = confirm(msg);
        this.exitConfirmed = confirmed;
        return of(confirmed);

        // can't get this to work, using this dialog always result in some exception and 2 prompts when navigate on the outer pivot
        // return this.appContext.frame.showDialogConfirmation({
        //     title: this.strings.MsftIISWAC.common.discardChangeTitle,
        //     message: this.strings.MsftIISWAC.common.discardChangeMessage,
        //     confirmButtonText: this.strings.MsftIISWAC.common.proceed,
        //     cancelButtonText: this.strings.MsftIISWAC.common.cancel,
        // }).pipe(
        //     map(this.onVerifyExitConfirmation),
        //     catchError((e, caught) => {
        //         Logging.logError(logSource, `Error during cancel dialog ${stringifySafe(e)}`);
        //         return caught;
        //     }),
        // );
    }

    private confirmExit(): Observable<boolean> {
        if (this.exitConfirmed) {
            return of(true);
        }
        if (this._isNew) {
            return this.confirmExitDialog(this.strings.MsftIISWAC.common.cancelCreationMessage);
        } else if (!this.isModified()) {
            return of(true);
        } else {
            return this.confirmExitDialog(this.strings.MsftIISWAC.common.discardChangeMessage);
        }
    }

    onSubmit() {
        if (!this.isModified()) {
            this.exitConfirmed = true;
            Logging.logVerbose(logSource, `No changes were made, submit action will simply exit`);
            this.exited.next(true);
        } else {
            if (this.validate(this._editing)) {
                this.submitting = true;
                this.exitConfirmed = true;
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
                        this.exited.next(true);
                    },
                );
            }
        }
    }

    ngOnDestroy(): void {
        if (this.registerDeactivation) {
            this.formSrv.Release();
        }
    }

    ngOnInit(): void {
        if (this.registerDeactivation) {
            this.formSrv.Register(this);
        }
    }
}

const logSource = (typeof IISFormComponent).toString();
