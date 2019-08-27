param(
    [string]
    $Name
)

$queryArgs = @{ }
if ($Name) {
    $Name = [System.Web.HttpUtility]::UrlDecode($Name);
    $queryArgs.Name = $Name
}

$pools = Get-IISAppPool @queryArgs

$pools | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 3 }
