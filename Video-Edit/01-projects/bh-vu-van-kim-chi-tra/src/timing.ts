// ⏱ Mốc thời gian (giây) — ƯỚC LƯỢNG. Khi có video thật: đặt public/talk.mp4, HAS_VIDEO = true,
// rồi chỉnh các mốc theo lời thoại thật (hoặc nạp words.json có thời gian từng chữ).
export const HAS_VIDEO = false;
// Video nhép miệng (SadTalker) cho các đoạn người dẫn hiện to: [file, giây bắt đầu, giây kết thúc]
export const LIP: [string, number, number][] = [['lip/lip1.mp4', 0, 18.66], ['lip/lip2.mp4', 86.46, 97.8]];
export const FPS = 30;
export const fr = (s: number) => Math.round(s * FPS);
export type Kind = 'full' | 'graphic' | 'cta';
export const SCENES: {id: string; start: number; end: number; kind: Kind}[] = [
  {id: 's1', start: 0, end: 7.15, kind: 'full'},
  {id: 's2', start: 7.15, end: 18.66, kind: 'full'},
  {id: 's3', start: 18.66, end: 78.16, kind: 'graphic'},
  {id: 's4', start: 78.16, end: 86.46, kind: 'graphic'},
  {id: 's5', start: 86.46, end: 97.8, kind: 'cta'},
];
export const TOTAL = 97.8;
// Giọng đọc AI (ElevenLabs · Ben Singapore). Mốc trên đã căn theo khoảng lặng của file này.
export const VOICE_FILE = 'voice.mp3';
export const HOOK_END = 2.2; // thẻ tiêu đề mở đầu (cũng là ảnh bìa reel)
export const S2_ZOOM = 8.4; // giây: lúc chỉ tay vào chữ nhỏ → zoom
export const S3 = {intro: [18.66, 27.59], i1: [27.59, 40.45], i2: [40.45, 59.73], i3: [59.73, 78.16]} as const;
export const CTA_AT = 89.6; // giây: thẻ kêu gọi hiện ra
export const VOICE: {start: number; end: number; text: string}[] = [
  {start: 0, end: 6, text: 'Có hợp đồng bảo hiểm trên tay rồi... liệu cứ nằm viện hay gặp chuyện là 100% được chi trả không?'},
  {start: 6, end: 17, text: 'Câu trả lời là: KHÔNG PHẢI LÚC NÀO CŨNG ĐƯỢC CHI TRẢ. Rất nhiều tranh chấp xảy ra chỉ vì khách hàng nhầm lẫn 3 khái niệm này làm một: Quyền lợi, điều kiện chi trả và điều khoản loại trừ.'},
  {start: 17, end: 25, text: 'Để dễ hiểu nhất, bạn cứ tưởng tượng hợp đồng bảo hiểm giống như một tấm vé vào cửa vậy. Muốn nhận được tiền, bạn phải phân biệt rõ 3 thứ này:'},
  {start: 25, end: 36, text: 'Một. Quyền lợi được bảo hiểm: là những thứ bạn được hứa sẽ nhận. Ví dụ: được chi trả tiền nằm viện, hay nhận 500 triệu nếu chẳng may mắc bệnh hiểm nghèo. Đó chính là quyền lợi.'},
  {start: 36, end: 50, text: 'Hai. Điều kiện chi trả: là luật chơi để bạn lấy được số tiền đó. Không phải cứ hắt hơi sổ mũi hay vào viện khám xong đi về là được trả tiền. Ví dụ: phải nằm viện nội trú từ 24 giờ trở lên, hoặc bệnh phải có kết quả xét nghiệm chuẩn y khoa thì công ty mới chi trả.'},
  {start: 50, end: 67, text: 'Ba. Điều khoản loại trừ: là vùng cấm tuyệt đối. Dù bạn mua gói đắt tiền đến đâu, rơi vào vùng cấm này thì công ty sẽ từ chối thẳng thừng. Ví dụ: bệnh có sẵn từ trước nhưng giấu không khai, tự gây thương tích cho bản thân, hoặc tai nạn do uống rượu bia, sử dụng chất cấm.'},
  {start: 67, end: 75, text: 'Tóm lại: có quyền lợi thôi chưa đủ, bạn phải thỏa điều kiện chi trả và không rơi vào điều khoản loại trừ thì mới được chi trả.'},
  {start: 75, end: 86, text: 'Bạn đã từng soi kỹ 3 mục này trong hợp đồng của mình chưa? Nếu cần rà soát lại, cứ nhắn hoặc để lại số điện thoại để tôi hỗ trợ kiểm tra giúp nhé!'},
];
// Từ được tô màu trong phụ đề
export const KEYWORDS = ['100%', 'KHÔNG', 'PHẢI', 'quyền', 'lợi', 'điều', 'kiện', 'loại', 'trừ', '500', 'triệu', '24', 'giờ', 'nội', 'trú', 'cấm', 'miễn', 'phí', 'chi', 'trả'];
