param(
    [string]
    $Name
)

$queryArgs = @{ }
if ($Name) {
    $queryArgs.Name = $Name
}

$pools = Get-IISAppPool @queryArgs

$pools | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 3 }
