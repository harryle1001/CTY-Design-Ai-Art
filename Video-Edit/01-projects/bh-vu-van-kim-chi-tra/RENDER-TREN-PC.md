# Render trên PC Windows

1. Cài (1 lần): `winget install Git.Git OpenJS.NodeJS.LTS Python.Python.3.10 Gyan.FFmpeg`
2. Tải dự án:
   ```powershell
   git clone -b claude/cool-franklin-osh7pq https://github.com/harryle1001/CTY-Design-Ai-Art.git
   cd CTY-Design-Ai-Art\Video-Edit\01-projects\bh-vu-van-kim-chi-tra
   ```
3. Chạy: `powershell -ExecutionPolicy Bypass -File .\render-pc.ps1`

Script tự cài SadTalker, tạo video nhép miệng (có card NVIDIA: vài phút; chỉ CPU: 1–2 giờ), rồi render
`out\BH-VuVanKim-chi-tra.mp4` (1080×1920). Xem trước/chỉnh sửa: `npx remotion studio src/index.ts`.
