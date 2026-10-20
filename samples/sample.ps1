# muestra de powershell para revisar el resaltado de dark dev
param([string]$Name = 'ink', [int]$Steps = 16)

function Get-Alpha {
    [CmdletBinding()]
    param([Parameter(Mandatory)][double]$Percent)
    if ($Percent -lt 0 -or $Percent -gt 100) { throw "fuera de rango" }
    return '{0:X2}' -f [math]::Round($Percent / 100 * 255)
}

$slots = @{ ink = 0xEEEEEE; on = 24 }
foreach ($key in $slots.Keys) {
    Write-Host "$key => $($slots[$key])" -ForegroundColor Green
}
Get-ChildItem -Path . -Recurse | Where-Object { $_.Length -gt 1KB } | Select-Object Name
$null -eq $env:HOME
