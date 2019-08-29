param(
    [string]
    $location,

    $hash
)
$OIDServerAuth = "1.3.6.1.5.5.7.3.1"
$OIDEnhancedKeyUsage = "2.5.29.37"
$OIDSubjectAlternativeName = "2.5.29.17"

function HashEquals($arr1, $arr2) {
    ## shouldn't need to, but check anyway
    if ($arr1.Length -ne $arr2.Length) {
        return $false
    }
    for ($i = 0; $i -lt $arr1.Length; $i++) {
        if ($arr1[$i] -ne $arr2[$i]) {
            return $false
        } 
    }
    return $true
}

function Get-Cert($location, $cert) {
    $ext = $cert.Extensions | Where-Object { $_.Oid.Value -eq $OIDEnhancedKeyUsage }
    if ($ext -and $ext.EnhancedKeyUsages -and ($ext.EnhancedKeyUsages[$OIDServerAuth])) {
        $altNameExt = $cert.Extensions | Where-Object { $_.Oid.Value -eq $OIDSubjectAlternativeName }
        if ($altNameExt) {
            $altNames = $altNameExt.Format($true).Split("`r`n", [System.StringSplitOptions]::RemoveEmptyEntries)
        }

        if ($cert.SignatureAlgorithm) {
            $algorithm = $cert.SignatureAlgorithm.Value;
        }

        $certHash = $cert.GetCertHash()

        if (!$hash -or (HashEquals $certHash $hash)) {
            @{
                "Location"                = $location;
                "FriendlyName"            = $cert.FriendlyName;
                "Issuer"                  = $cert.Issuer;
                "NotAfter"                = $cert.NotAfter;
                "NotBefore"               = $cert.NotBefore;
                "SignatureAlgorithm"      = $algorithm;
                "Subject"                 = $cert.Subject;
                "Thumbprint"              = $cert.Thumbprint;
                "Hash"                    = $certHash;
                "Version"                 = $cert.Version;
                "HasPrivateKey"           = $cert.HasPrivateKey;
                "SubjectAlternativeNames" = $altNames;
                "intendedPurposes"        = $ext.EnhancedKeyUsages | Select-Object -ExpandProperty Value;
            } | ConvertTo-Json -Compress -Depth 3
        }
    }
}

if ($location) {
    $certPaths = @($location)
}
else {
    $certPaths = @("My", "WebHosting")
}

foreach ($path in $certPaths) {
    foreach ($cert in Get-ChildItem "Cert:\LocalMachine\$path") {
        Get-Cert $path $cert
    }
}
