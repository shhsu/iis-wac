
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Certificate } from 'src/app/iis-mgmt/models/certificate';
import { Binding } from 'src/app/iis-mgmt/models/website';
import { PowerShellScripts } from 'src/generated/powershell-scripts';
import { PowershellService } from './powershell.service';
import { RepositoryService } from './repository.service';

@Injectable()
export class CertificateService extends RepositoryService<Certificate> {
    constructor(
        ps: PowershellService,
    ) {
        super(
            ps,
            [],
            PowerShellScripts.Iis_cert.Get_Certificates.script,
            Certificate.transform,
        );
    }

    getFromBinding(binding: Binding): Observable<Certificate> {
        return super.get({
            location: binding.certificateStoreName,
            hash: binding.certificateHash,
        });
    }
}
