import { Injectable } from '@angular/core';
import { AppContextService } from '@microsoft/windows-admin-center-sdk/angular';
import { Logging, PowerShellCommand, PowerShellResult, PowerShellSession } from '@microsoft/windows-admin-center-sdk/core';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { instrument } from 'src/app/iis-mgmt/common/util/logging';

const psKey = 'msft.iis.iis-management';

@Injectable()
export class PowershellService {
  // private sessionId = Math.random().toString(36).substring(2, 15) // TODO: modify this with WAC session ID
  private session: PowerShellSession;

  constructor(
    private sme: AppContextService,
  ) {}

  public createSession() {
      this.session = this.sme.powerShell.createSession(
          this.sme.activeConnection.nodeName,
          psKey,
      );
  }

  public get<T>(cmd: string, reviver?: (this: any, key: string, value: any) => any): Observable<T> {
    const scriptName = cmd.split('\n')[0];
    return this.invoke(scriptName, cmd).pipe(
        mergeMap(results => {
            return results.map(result => {
                const rtnObject: any = JSON.parse(result, reviver);
                if (rtnObject && rtnObject.errorsReported) {
                    Logging.logError(logSource,
`Error parsing results from powershell script ${name}:
Script output: ${results.join('\n')}
Parsing error: ${rtnObject.errorsReported}`);
                }
                return rtnObject;
            });
        }),
    );
  }

  public invoke(scriptName: string, cmd: string): Observable<any[]> {
    return this.session.powerShell.run(cmd).pipe(
        instrument(logSource, `${scriptName}`),
        map((response: PowerShellResult) => {
            if (!response) {
                throw new Error(`Powershell command ${scriptName} returns no response`);
            }

            if (response.warning) {
                Logging.logWarning(logSource, `Powershell command ${scriptName} returns the following warnings`);
                for (const line of response.warning) {
                    Logging.logWarning(logSource, line);
                }
            }

            if (response.errors) {
                Logging.logError(logSource, `Powershell command ${scriptName} returns the following errors`);
                for (const line of response.errors) {
                    Logging.logError(logSource, line);
                }
            }

            if (!response.results) {
                Logging.logWarning(logSource, `Powershell command ${scriptName} returns null response`);
            }

            if (response.results.length <= 0) {
                Logging.logWarning(logSource, `Powershell command ${scriptName} returns empty response`);
            }
            return response.results;
        }),
        catchError((e, _) => {
          let rethrow = e;
          // WAC wrap the powershell error (or exception) message around this AjaxError object. We would unwrap it for easier readability
          if (e.name === 'AjaxError' && e.status === 400) {
            if (e.response.error && !e.response.exception) {
              rethrow = e.response.error;
            }
            if (!e.response.error && e.response.exception) {
              rethrow = e.response.exception;
            }
          }
          throw rethrow;
        }),
    );
  }
}

const logSource = (typeof PowershellService).toString();
