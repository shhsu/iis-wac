// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import './polyfills.ts';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CoreEnvironment } from '@msft-sme/core';
import { AppModule } from './app/app.module';
import { IsProduction } from './environments/environment';
import { PowerShellScripts } from './generated/powershell-scripts';

if (IsProduction) {
    enableProdMode();
}

// initialize SME module environment with localization settings.
CoreEnvironment.initialize(
    {
        name: 'msft.iis.iis-management',
        powerShellModuleName: PowerShellScripts.module,
        isProduction: IsProduction,
        shellOrigin: '*'
    },
    {
        resourcesPath: 'assets/strings'
    })
    .then(() => platformBrowserDynamic().bootstrapModule(AppModule));
