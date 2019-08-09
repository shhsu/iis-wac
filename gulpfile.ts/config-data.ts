
import { Config } from './common/config';

function gulpConfig(): Config {
    return {
        resjson: {
            resourceName: 'MsftIISWAC',
            localeOffset: 0,
            localePath: 'loc'
        },
        powershell: {
            name: 'msft.iis-wac',
            guid: '23b1e598-f2f3-4e70-a4de-700bdcf2ab0d',
            list: [
                'src',
                'node_modules/@msft-sme'
            ],
            enablePester: false,
            skipCim: true
        },
        test: {
            skip: true
        }
    };
}

exports.gulpConfig = gulpConfig;
