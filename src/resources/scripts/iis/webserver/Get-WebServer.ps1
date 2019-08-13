

$version = [System.Diagnostics.FileVersionInfo]::GetVersionInfo("$env:windir\System32\inetsrv\w3dt.dll");
if ($version) {
    $versionString = $version.ProductVersion;
    $sniSupport = (New-Object System.Version $versionString).Major -ge 8
} else {
    $versionString = "unknown"
    $sniSupport = $false
}

@{
    Name = (Get-ItemProperty HKLM:\SOFTWARE\Microsoft\InetStp).ProductString;
    Status = (Get-Service w3svc).Status;
    Version = $versionString
    SupportsSNI = $sniSupport
} | ConvertTo-Json -Depth 3
