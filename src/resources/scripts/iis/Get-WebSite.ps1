<#
.SYNOPSIS
Get IIS Websites

.DESCRIPTION
Return all website in json serialized format

.ROLE
Readers
#>


Get-IISSite | ForEach-Object { $_ | ConvertTo-Json }
