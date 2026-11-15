# Câu lệnh (prompt) dựng website Motion Graphic cao cấp

## 1. Prompt dựng website (dán cho Claude / AI code)
```
Hãy tạo website 1 trang (HTML + CSS + JS thuần, không framework) quảng cáo dịch vụ
"Thiết kế website motion graphic cao cấp" cho studio [TÊN THƯƠNG HIỆU].

Phong cách: dark cinematic, sang trọng, tối giản. Nền #0b0b0d, chữ #f2efe9, nhấn vàng champagne #c9a96e.
Font: Be Vietnam Pro (nội dung) + Fraunces italic (từ nhấn).
Áp dụng tỷ lệ vàng φ = 1.61803: cỡ chữ 10/16/26/42/68/110px, khoảng cách 6/10/16/26/42/68/110px,
bố cục 61.8%/38.2%, khung 1.618:1, thời lượng animation 162/262/424/686/1110ms. Khai báo --phi: 1.61803.

Bố cục: Header cố định (mờ kính khi cuộn) → Hero chữ lớn hiện từng dòng + nền canvas xoắn ốc vàng
→ Marquee chữ chạy → Giới thiệu + Showreel → Dịch vụ (danh sách đánh số, gạch chân vàng khi hover)
→ Dự án (lưới 61.8/38.2, thumbnail chuyển động) → Số liệu đếm tăng → Quy trình 4 bước
→ FAQ → CTA lớn → Footer.

Chuyển động: hiện dần khi cuộn (IntersectionObserver), con trỏ tùy chỉnh trên desktop,
hiệu ứng nhiễu hạt film grain, tôn trọng prefers-reduced-motion.

SEO: title ≤ 60 ký tự chứa "thiết kế website motion graphic", meta description ≤ 160 ký tự,
1 thẻ H1, H2 cho từng phần, canonical, Open Graph, schema JSON-LD ProfessionalService + FAQPage,
robots.txt, sitemap.xml. Nội dung tiếng Việt, câu ngắn, giọng văn sang trọng.

Hiệu năng: tải < 2 giây, mượt trên điện thoại, không thanh cuộn ngang, padding 16px ở mobile.
```

## 2. Prompt AI art cho hình dự án / ảnh OG (Midjourney / Flux / Nano Banana)
```
Cinematic abstract motion graphic still, golden ratio spiral of glowing champagne-gold particles
on deep black background, subtle film grain, luxury tech studio aesthetic, volumetric light,
shallow depth of field, 16:10 aspect ratio, ultra detailed, minimal, elegant --ar 1.618:1
```
```
Luxury website mockup floating in dark space, glass reflections, gold accent typography,
smooth motion blur trails, premium agency showreel frame, 8k, editorial lighting --ar 1.618:1
```

## 3. Việc cần thay trước khi đăng
- Tên thương hiệu, domain `designaiart.vn`, email `hello@designaiart.vn`
- Tên dự án mẫu và số liệu (68 dự án, 98 điểm…) thay bằng số thật
- Tạo ảnh `og.jpg` 1200×742 từ prompt mục 2
