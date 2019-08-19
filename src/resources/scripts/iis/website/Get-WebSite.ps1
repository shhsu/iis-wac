param(
    [long]
    $id = -1,

    [string]
    $appPoolName,

    [int]
    $depth = 8
)

$sites = Get-IISSite

if ($id -ge 0) {
    $sites = $sites | Where-Object { $_.Id -eq $id }
}

if ($appPoolName) {
    $sites = $sites | Where-Object { (GetAppPoolName $_) -eq $appPoolName }
}

$sites | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth $depth }
