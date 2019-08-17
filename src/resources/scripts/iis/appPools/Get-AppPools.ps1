Get-IISAppPool | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 3 }
