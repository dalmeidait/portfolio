$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$portableTools = Join-Path $env:LOCALAPPDATA 'portfolio-tools'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) {
    $nodeExecutable = $nodeCommand.Source
} elseif (Test-Path -LiteralPath (Join-Path $portableTools 'node.exe')) {
    $nodeExecutable = Join-Path $portableTools 'node.exe'
    $env:PATH = "$portableTools;$env:PATH"
} else {
    throw 'Instale Node.js 22 e execute npm ci antes de iniciar.'
}
if (!(Test-Path -LiteralPath 'node_modules/vite/bin/vite.js')) {
    throw 'Dependências ausentes. Execute npm ci primeiro.'
}
if (!(Test-Path -LiteralPath 'dist/index.html')) {
    throw 'Build ausente. Execute npm run build primeiro.'
}
& $nodeExecutable 'node_modules/vite/bin/vite.js' preview --host 127.0.0.1
