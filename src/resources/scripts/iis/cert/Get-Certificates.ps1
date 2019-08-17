
$OIDServerAuth = "1.3.6.1.5.5.7.3.1"
$OIDEnhancedKeyUsage = "2.5.29.37"
$OIDSubjectAlternativeName = "2.5.29.17"

foreach ($cert in ((Get-ChildItem Cert:\LocalMachine\My) + (Get-ChildItem Cert:\LocalMachine\WebHosting))) {
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
            "Alias" = $cert.FriendlyName;
            "Issuer" = $cert.Issuer;
            "Expires" = $cert.NotAfter;
            "ValidFrom" = $cert.NotBefore;
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
