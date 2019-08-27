param(
    [string]
    $Name,

    [int]
    $Depth = 3
)

$queryArgs = @{ }
if ($Name) {
    $Name = [System.Web.HttpUtility]::UrlDecode($Name);
    $queryArgs.Name = $Name
}

$sites = Get-IISSite @queryArgs
$sites | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth $Depth }
