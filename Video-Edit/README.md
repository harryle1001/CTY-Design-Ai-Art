# 🎬 Góc làm việc Edit Video

Biến video nói trước camera (quay điện thoại, nhiều lần vấp) thành reel dọc 1080×1920 hoàn chỉnh cho TikTok / Reels / Shorts.
Công cụ: skill **ghost-editor** (`.claude/skills/ghost-editor`, nguồn: github.com/kurbaitaev/ghost-editor, MIT).

## Cách dùng (61.8% — việc chính)
1. Bỏ video gốc vào `00-inbox/` (vd `00-inbox/noben-tom-the.mov`), hoặc gửi link tải trực tiếp.
2. Nói với Claude, ví dụ:
   - `Edit 00-inbox/noben-tom-the.mov thành reel kiểu Clean OS`
   - `Làm reel Caption News từ video này, phụ đề tiếng Việt`
   - `Edit giống reel mẫu trong 02-reference/mau.mp4`
3. Claude chọn đoạn nói tốt nhất, cắt khoảng lặng, thêm phụ đề theo từng chữ (không che mặt), hiệu ứng, âm thanh, B-roll.
4. Duyệt 3 bước: **trang duyệt cắt** → **bản preview 720p** → **bản xuất cuối**. Không có gì được xuất khi bạn chưa đồng ý.

## Thư mục
| Thư mục | Dùng cho |
|---|---|
| `00-inbox/` | Video thô chờ edit |
| `01-projects/<tên-reel>/` | Mỗi reel một dự án (`reel.json`, `build/`, `assets/`) |
| `02-reference/` | Reel mẫu muốn bắt chước phong cách |
| `03-delivered/` | Bản xuất cuối đã duyệt |
| `brand/` | Logo, màu, font thương hiệu (Noben, Rubik World…) |

## Phong cách có sẵn (38.2% — tham khảo)
Clean OS · Seoul list · RESULT · Face RESULT · Kinetic doc · Whiteboard · Step Deck · Product page · Tactile paper ·
Caption News · News Package · Telestrator · Halftone Dossier · Swiss Grid · Data Story · Hologram HUD · Explainer.
Preset nhanh: `clean`, `editorial`, `meme`, `cinematic`, `launch`, `kinetic`, `pop`.

**Gợi ý theo dự án:** Noben thủy sản → *Product page / Data Story / Caption News* · Rubik World (học sinh) → *Whiteboard / Step Deck* · Fiverr/portfolio → *Clean OS / Swiss Grid*.

**Quy tắc φ:** thời lượng reel 45–75 s; nhịp chuyển cảnh, cỡ chữ phụ đề, bố cục 61.8/38.2 theo `CLAUDE.md`.

> ⚠️ Video gốc nặng: đừng commit vào git (đã chặn trong `.gitignore`). File thô và bản xuất lưu Google Drive, chỉ commit `reel.json` + generator.
