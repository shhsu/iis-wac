<#
.SYNOPSIS
Get IIS Websites

.DESCRIPTION
Return all website in json serialized format

.ROLE
Readers
#>
param(
    [long]
    $id = -1,

    [string]
    $appPoolName,

    [int]
    $depth = 8
)

$sites = Get-IISSite

# function GetAppPoolName($site) {
#     if ($site.Applications) {
#         $rootApp = $site.Applications | Where-Object { $_.Path -eq "/" }
#         return $rootApp.ApplicationPoolName
#     }
#     return $null;
# }

# $appPoolsMap = @{}
# function GetAppPool($site) {
#     $appPoolName = GetAppPoolName $site
#     Write-Warning "got app pool name ${appPoolName}"
#     if ($appPoolName) {
#         return $appPoolsMap[$appPoolName]
#     }
#     return $null
# }

if ($id -ge 0) {
    $sites = $sites | Where-Object { $_.Id -eq $id }
}

if ($appPoolName) {
    $sites = $sites | Where-Object { (GetAppPoolName $_) -eq $appPoolName }
}

# foreach ($pool in (Get-IISAppPool)) {
#     $appPoolsMap[$pool.Name] = $pool
# }

# $results = @();

# foreach ($site in $sites) {
#     $results += @{
#         "site" = $site;
#         "applicationPool" = (GetAppPool $site)  ## TODO: dedupe
#     }
# }

$sites | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth $depth }
