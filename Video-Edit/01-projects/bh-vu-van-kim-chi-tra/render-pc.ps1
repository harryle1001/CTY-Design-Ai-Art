# Render reel "Bảo hiểm Vũ Văn Kim" trên PC Windows
# Chạy trong PowerShell tại thư mục dự án:  powershell -ExecutionPolicy Bypass -File .\render-pc.ps1
# Cần sẵn: Git, Node.js 18+, Python 3.10 (py -3.10), ffmpeg (winget install Gyan.FFmpeg)
$ErrorActionPreference = 'Stop'
$P = $PSScriptRoot
$ST = "$env:USERPROFILE\tools\SadTalker"

function Need($cmd, $hint) { if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { throw "Thiếu $cmd -> $hint" } }
Need git 'winget install Git.Git'
Need node 'winget install OpenJS.NodeJS.LTS'
Need py 'winget install Python.Python.3.10'
Need ffmpeg 'winget install Gyan.FFmpeg'

$gpu = [bool](Get-Command nvidia-smi -ErrorAction SilentlyContinue)
Write-Host "GPU NVIDIA: $gpu" -ForegroundColor Cyan

# 1) Cài SadTalker (1 lần)
if (-not (Test-Path "$ST\inference.py")) {
  New-Item -ItemType Directory -Force "$env:USERPROFILE\tools" | Out-Null
  git clone --depth 1 https://github.com/OpenTalker/SadTalker.git $ST
}
Set-Location $ST
if (-not (Test-Path ".venv")) { py -3.10 -m venv .venv }
$py = "$ST\.venv\Scripts\python.exe"
if (-not (Test-Path "$ST\.ok")) {
  & $py -m pip install -q --upgrade pip "setuptools<70"
  if ($gpu) { & $py -m pip install -q torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 --index-url https://download.pytorch.org/whl/cu121 }
  else      { & $py -m pip install -q torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 }
  & $py -m pip install -q numpy==1.23.5 face_alignment==1.3.5 imageio==2.19.3 imageio-ffmpeg librosa==0.9.2 numba resampy pydub scipy kornia==0.6.8 tqdm yacs==0.1.8 pyyaml joblib==1.1.0 scikit-image==0.19.3 basicsr==1.4.2 facexlib==0.3.0 gfpgan av safetensors
  New-Item -ItemType Directory -Force checkpoints, gfpgan\weights | Out-Null
  $B = 'https://github.com/OpenTalker/SadTalker/releases/download/v0.0.2-rc'
  foreach ($f in 'mapping_00109-model.pth.tar', 'mapping_00229-model.pth.tar', 'SadTalker_V0.0.2_256.safetensors') { Invoke-WebRequest "$B/$f" -OutFile "checkpoints\$f" }
  $G = 'https://github.com/xinntao/facexlib/releases/download'
  Invoke-WebRequest "$G/v0.1.0/alignment_WFLW_4HG.pth" -OutFile gfpgan\weights\alignment_WFLW_4HG.pth
  Invoke-WebRequest "$G/v0.1.0/detection_Resnet50_Final.pth" -OutFile gfpgan\weights\detection_Resnet50_Final.pth
  Invoke-WebRequest "$G/v0.2.2/parsing_parsenet.pth" -OutFile gfpgan\weights\parsing_parsenet.pth
  Invoke-WebRequest 'https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.4.pth' -OutFile gfpgan\weights\GFPGANv1.4.pth
  New-Item "$ST\.ok" | Out-Null
}

# 2) Tạo video nhép miệng cho cảnh 1-2 (a1) và cảnh 5 (a2)
New-Item -ItemType Directory -Force "$P\public\lip" | Out-Null
foreach ($n in 1, 2) {
  $dst = "$P\public\lip\lip$n.mp4"
  if (Test-Path $dst) { Write-Host "Đã có lip$n.mp4, bỏ qua"; continue }
  $out = "$P\out\lip-run$n"
  $a = @('inference.py', '--driven_audio', "$P\lip-input\a$n.wav", '--source_image', "$P\lip-input\face.png",
            '--result_dir', $out, '--still', '--preprocess', 'full', '--enhancer', 'gfpgan')
  if (-not $gpu) { $a += '--cpu' }
  & $py @a
  $mp4 = Get-ChildItem $out -Filter *.mp4 | Sort-Object LastWriteTime | Select-Object -Last 1
  Copy-Item $mp4.FullName $dst
  Write-Host "Xong lip$n.mp4" -ForegroundColor Green
}

# 3) Render reel 1080x1920
Set-Location $P
npm install
npx remotion render src/index.ts Reel "out/BH-VuVanKim-chi-tra.mp4" --codec h264 --crf 16
Write-Host "HOÀN TẤT: $P\out\BH-VuVanKim-chi-tra.mp4" -ForegroundColor Green
