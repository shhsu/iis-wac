param(
    [string]
    $Name,

    [int]
    $Depth = 3
)

$queryArgs = @{ }
if ($Name) {
    $queryArgs.Name = $Name
}

$sites = Get-IISSite @queryArgs
$sites | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth $Depth }
