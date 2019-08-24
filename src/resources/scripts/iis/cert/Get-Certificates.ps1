
$OIDServerAuth = "1.3.6.1.5.5.7.3.1"
$OIDEnhancedKeyUsage = "2.5.29.37"
$OIDSubjectAlternativeName = "2.5.29.17"

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

        @{
            "Location" = $location;
            "FriendlyName" = $cert.FriendlyName;
            "Issuer" = $cert.Issuer;
            "NotAfter" = $cert.NotAfter;
            "NotBefore" = $cert.NotBefore;
            "SignatureAlgorithm" = $algorithm;
            "Subject" = $cert.Subject;
            "Thumbprint" = $cert.Thumbprint;
            "Version" = $cert.Version;
            "HasPrivateKey" = $cert.HasPrivateKey;
            "SubjectAlternativeNames" = $altNames;
            "intendedPurposes" = $ext.EnhancedKeyUsages | Select-Object -ExpandProperty Value;
        } | ConvertTo-Json -Compress -Depth 3
    }
}

$certPaths = @("LocalMachine\My", "LocalMachine\WebHosting");

foreach ($path in $certPaths) {
    foreach ($cert in Get-ChildItem "Cert:\$path") {
        Get-Cert $path $cert
    }
}
