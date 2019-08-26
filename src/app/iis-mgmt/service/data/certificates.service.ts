
import { Injectable } from '@angular/core';
import { Certificate } from 'src/app/iis-mgmt/models/certificate';
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
}
