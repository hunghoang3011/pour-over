/**
 * Recipe data model — all data preserved verbatim from recipe-cards.txt
 * 4 coffees × 6 brewing methods = 24 recipes
 */

export type RecipeStep = [string, number | null, string | null, 'open' | 'closed' | null];

export interface Dripper {
  id: string;
  name: string;
  ice: boolean;
  paper: string;
  prep: string;
}

export interface RecipeConfig {
  k7: number;
  m40: number;
  hotWater: number;
  ice: number;
  temp: number;
  time: string;
  flow: string | null;
  steps: RecipeStep[];
  notes: string[];
}

export interface Coffee {
  id: string;
  short: string;
  name: string;
  roaster: string;
  roast: string;
  origin?: string;
  variety?: string;
  process?: string;
  alt?: string;
  tasting: string;
  beanNote: string;
  goal: string;
  pick: string;
  why: string;
  adjust: string[];
  recipes: Record<string, RecipeConfig>;
}

export type DialInRow = [string, string];

export const DRIPPERS: Dripper[] = [
  { id: 'switch-hot',  name: 'Switch Nóng',   ice: false, paper: 'Lyocell V60', prep: 'Bloom van mở. Đóng van ngay trước main pour; rót tới tổng nước, để yên, mở đúng mốc rồi xả hết tự nhiên.' },
  { id: 'v60-hot',     name: 'V60 Nóng',      ice: false, paper: 'Lyocell V60', prep: 'Percolation xuyên suốt, không đóng/ngâm. Bloom rồi hai lần rót; theo trạng thái slurry nếu lệch lịch.' },
  { id: 'flat-hot',    name: 'Flat-bottom Nóng', ice: false, paper: 'Lyocell 155', prep: 'Percolation xuyên suốt, không đóng/ngâm. Bloom rồi hai lần rót; theo trạng thái slurry nếu lệch lịch.' },
  { id: 'switch-iced', name: 'Switch Đá',     ice: true,  paper: 'Lyocell V60', prep: 'Bloom van mở. Đóng van ngay trước main pour; rót tới tổng nước, để yên, mở đúng mốc rồi xả hết tự nhiên.' },
  { id: 'v60-iced',    name: 'V60 Đá',        ice: true,  paper: 'Lyocell V60', prep: 'Percolation xuyên suốt, không đóng/ngâm. Bloom rồi hai lần rót; theo trạng thái slurry nếu lệch lịch.' },
  { id: 'flat-iced',   name: 'Flat-bottom Đá', ice: true,  paper: 'Lyocell 155', prep: 'Percolation xuyên suốt, không đóng/ngâm. Bloom rồi hai lần rót; theo trạng thái slurry nếu lệch lịch.' },
];

export const COFFEES: Coffee[] = [
  {
    id: 'karina',
    short: 'Karina',
    name: 'Colombia Tolima Villa Karina – Geisha Washed',
    roaster: 'Sếp cung cấp',
    roast: 'Light',
    origin: 'Tolima, Colombia',
    variety: 'Geisha',
    process: 'Washed',
    alt: undefined,
    tasting: 'Orange Blossom • Peach • Orange • Sweet Honeydew',
    beanNote: 'Light washed; ưu tiên hoa cam, đào và ngọt kiểu dưa mật. Sweet Honeydew là dưa mật/dưa lê ngọt, không phải honey/mật ong.',
    goal: 'Mục tiêu: hoa cam, đào và ngọt kiểu dưa mật; kết cấu và dễ lặp lại.',
    pick: 'switch-hot',
    why: 'Switch Nóng là kiến trúc ổn định cho cả ba hạt. Với Karina ưu tiên ngọt/structure; V60 Nóng là bản thay thế để đọc hoa cam/đào trước.',
    adjust: [
      'Chua sắc + giữa ly rỗng + flow nhanh → mịn hơn <b>1 click thường / 2 RC</b> trước.',
      'Switch thơm nhưng rỗng, xả bình thường → giữ grind, mở van muộn hơn <b>15 s</b>. Không đồng thời tăng nhiệt và xay mịn.',
    ],
    recipes: {
      'switch-hot':  { k7: 23, m40: 46, hotWater: 240, ice: 0, temp: 94, time: '2:45–3:15', flow: '~4,5–4,9 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['0:45', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
          ['0:45–1:25', 240, 'Rót đến 240 g; thêm 195 g; ~4,9 g/s.', null],
          ['2:00', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
        ],
        notes: ['Ngâm yên 35 s sau khi rót xong. Pha van đóng 75 s (đã bao gồm thời gian rót). Xả sau mở: thử 45–75 s, không coi là deadline.'],
      },
      'v60-hot':  { k7: 22, m40: 44, hotWater: 240, ice: 0, temp: 94, time: '2:20–2:55', flow: '~4,8–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['0:45–1:05', 140, 'Thêm 95 g; ~4,8 g/s.', null],
          ['1:25–1:50', 240, 'Thêm 100 g; ~4 g/s.', null],
        ],
        notes: [],
      },
      'flat-hot':  { k7: 23, m40: 46, hotWater: 240, ice: 0, temp: 94, time: '2:30–3:10', flow: '~4,8–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['0:45–1:05', 140, 'Thêm 95 g; ~4,8 g/s.', null],
          ['1:25–1:50', 240, 'Thêm 100 g; ~4 g/s.', null],
        ],
        notes: ['Không ép giấy, không final swirl; kiểm tra seal trước grind.'],
      },
      'switch-iced':  { k7: 22, m40: 44, hotWater: 170, ice: 70, temp: 95, time: '2:45–3:15', flow: '~4,2 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['0:45', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
          ['0:45–1:15', 170, 'Rót đến 170 g; thêm 125 g; ~4,2 g/s.', null],
          ['2:10', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
        ],
        notes: ['Ngâm yên 55 s sau khi rót xong. Pha van đóng 85 s (đã bao gồm thời gian rót). Xả sau mở: thử 35–65 s, không coi là deadline. Sau lọc: đảo server cho đá đã cân tan; dùng bồn đá ngoài nếu cần. Không cộng đá phục vụ ngoài 70 g.'],
      },
      'v60-iced':  { k7: 21, m40: 42, hotWater: 170, ice: 70, temp: 95, time: '2:05–2:45', flow: '~4,3–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['0:45–1:00', 110, 'Thêm 65 g; ~4,3 g/s.', null],
          ['1:20–1:35', 170, 'Thêm 60 g; ~4 g/s.', null],
        ],
        notes: ['Sau lọc: đảo server cho đá đã cân tan; dùng bồn đá ngoài nếu cần. Không cộng đá phục vụ ngoài 70 g.'],
      },
      'flat-iced':  { k7: 22, m40: 44, hotWater: 170, ice: 70, temp: 95, time: '2:20–3:00', flow: '~4,3–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['0:45–1:00', 110, 'Thêm 65 g; ~4,3 g/s.', null],
          ['1:25–1:40', 170, 'Thêm 60 g; ~4 g/s.', null],
        ],
        notes: ['Không ép giấy, không final swirl; kiểm tra seal trước grind. Sau lọc: đảo server cho đá đã cân tan; dùng bồn đá ngoài nếu cần. Không cộng đá phục vụ ngoài 70 g.'],
      },
    },
  },
  {
    id: 'sidra',
    short: 'Sidra',
    name: 'Colombia Café Granja La Esperanza – Sidra Washed',
    roaster: 'Sếp cung cấp',
    roast: 'Extremely Light',
    origin: 'Colombia · Granja La Esperanza',
    variety: 'Sidra',
    process: 'Washed',
    alt: undefined,
    tasting: 'Citrus • Pomelo • Peach • Florals • Mint',
    beanNote: 'Extremely light; dùng nhiệt cao + nước chiết nhỉnh hơn để tìm nền ngọt dưới citrus/pomelo; mint không tự động là lỗi grassy.',
    goal: 'Mục tiêu: nền ngọt dưới citrus/pomelo; giữ nhiệt cao, ít khuấy.',
    pick: 'switch-hot',
    why: 'SWITCH NÓNG trước, SWITCH ĐÁ sau; dùng contact time hỗ trợ nền ngọt, không dùng khuấy mạnh để chữa chua.',
    adjust: [
      'Cốc đã đủ chiết, sạch nhưng hương bị tù → thử A/B 2,16 g / 600 ml Aquafina, chỉ đổi nước.',
      'Khô/chát + xả chậm → kiểm tra giấy/đáy/van; không rót mạnh hơn. Nếu thao tác giấy đã ổn, thử thô <b>1 click thường / 2 RC</b>.',
    ],
    recipes: {
      'switch-hot':  { k7: 21, m40: 42, hotWater: 250, ice: 0, temp: 97, time: '3:15–3:50', flow: '~4,6 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
          ['1:00–1:45', 250, 'Rót đến 250 g; thêm 205 g; ~4,6 g/s.', null],
          ['2:30', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
        ],
        notes: ['Ngâm yên 45 s sau khi rót xong. Pha van đóng 90 s (đã bao gồm thời gian rót). Xả sau mở: thử 45–80 s, không coi là deadline.'],
      },
      'v60-hot':  { k7: 20, m40: 40, hotWater: 250, ice: 0, temp: 97, time: '2:45–3:20', flow: '~4,8–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00–1:22', 150, 'Thêm 105 g; ~4,8 g/s.', null],
          ['1:40–2:05', 250, 'Thêm 100 g; ~4 g/s.', null],
        ],
        notes: [],
      },
      'flat-hot':  { k7: 21, m40: 42, hotWater: 250, ice: 0, temp: 97, time: '2:50–3:30', flow: '~4,8–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00–1:22', 150, 'Thêm 105 g; ~4,8 g/s.', null],
          ['1:40–2:05', 250, 'Thêm 100 g; ~4 g/s.', null],
        ],
        notes: ['Không ép giấy, không final swirl; kiểm tra seal trước grind.'],
      },
      'switch-iced':  { k7: 20, m40: 40, hotWater: 180, ice: 70, temp: 98, time: '3:10–3:45', flow: '~4,5 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
          ['1:00–1:30', 180, 'Rót đến 180 g; thêm 135 g; ~4,5 g/s.', null],
          ['2:30', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
        ],
        notes: ['Ngâm yên 60 s sau khi rót xong. Pha van đóng 90 s (đã bao gồm thời gian rót). Xả sau mở: thử 40–75 s, không coi là deadline. Sau lọc: đảo server cho đá đã cân tan; dùng bồn đá ngoài nếu cần. Không cộng đá phục vụ ngoài 70 g.'],
      },
      'v60-iced':  { k7: 19, m40: 38, hotWater: 180, ice: 70, temp: 98, time: '2:30–3:10', flow: '~3,5–3,2 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00–1:20', 115, 'Thêm 70 g; ~4,3 g/s.', null],
          ['1:35–1:55', 180, 'Thêm 65 g; ~3,2 g/s.', null],
        ],
        notes: ['Sau lọc: đảo server cho đá đã cân tan; dùng bồn đá ngoài nếu cần. Không cộng đá phục vụ ngoài 70 g.'],
      },
      'flat-iced':  { k7: 20, m40: 40, hotWater: 180, ice: 70, temp: 98, time: '2:40–3:20', flow: '~3,5–3,2 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00–1:20', 115, 'Thêm 70 g; ~4,3 g/s.', null],
          ['1:40–2:00', 180, 'Thêm 65 g; ~3,2 g/s.', null],
        ],
        notes: ['Không ép giấy, không final swirl; kiểm tra seal trước grind. Sau lọc: đảo server cho đá đã cân tan; dùng bồn đá ngoài nếu cần. Không cộng đá phục vụ ngoài 70 g.'],
      },
    },
  },
  {
    id: 'kenya',
    short: 'Kenya',
    name: 'Kenya Geisha — Kirinyaga County, Kenya',
    roaster: 'Sếp cung cấp',
    roast: 'Natural',
    origin: 'Kirinyaga County, Kenya',
    variety: 'Geisha',
    process: 'Natural',
    alt: undefined,
    tasting: 'Tropical Fruits • Passion Fruit • Pineapple • Sweet Orange • Grape • Jasmine Floral',
    beanNote: 'Natural nhưng extremely light; không hạ nhiệt chỉ vì natural. Giữ đủ nhiệt, ít khuấy để thử trái cây sạch và hoa nhài.',
    goal: 'Mục tiêu: trái cây sạch và hoa nhài; nền ngọt đầy.',
    pick: 'switch-hot',
    why: 'SWITCH NÓNG để xác nhận nền ngọt; SWITCH Đá là ứng viên đáng thử nhất cho cảm giác trái cây nhiệt đới + nền đầy.',
    adjust: [
      'Chua nhói nhưng body đã đầy → kiểm tra nước; không tăng khoáng để che một cốc còn under, không suy GH/KH từ số ppm.',
      'Iced: sạch nhưng thiếu chiết, mịn thêm gây nghẹt → tăng phần nước nóng / giảm đá tương ứng ở mẻ khác, giữ tổng input; dùng bồn đá ngoài để bù làm lạnh.',
    ],
    recipes: {
      'switch-hot':  { k7: 22, m40: 44, hotWater: 240, ice: 0, temp: 96, time: '3:00–3:35', flow: '~4,9 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
          ['1:00–1:40', 240, 'Rót đến 240 g; thêm 195 g; ~4,9 g/s.', null],
          ['2:15', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
        ],
        notes: ['Ngâm yên 35 s sau khi rót xong. Pha van đóng 75 s (đã bao gồm thời gian rót). Xả sau mở: thử 45–80 s, không coi là deadline.'],
      },
      'v60-hot':  { k7: 21, m40: 42, hotWater: 240, ice: 0, temp: 96, time: '2:40–3:15', flow: '~4,8–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00–1:20', 140, 'Thêm 95 g; ~4,8 g/s.', null],
          ['1:40–2:05', 240, 'Thêm 100 g; ~4 g/s.', null],
        ],
        notes: [],
      },
      'flat-hot':  { k7: 22, m40: 44, hotWater: 240, ice: 0, temp: 96, time: '2:45–3:25', flow: '~4,8–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00–1:20', 140, 'Thêm 95 g; ~4,8 g/s.', null],
          ['1:40–2:05', 240, 'Thêm 100 g; ~4 g/s.', null],
        ],
        notes: ['Không ép giấy, không final swirl; kiểm tra seal trước grind.'],
      },
      'switch-iced':  { k7: 21, m40: 42, hotWater: 170, ice: 70, temp: 97, time: '3:05–3:40', flow: '~4,2 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00', null, 'ĐÓNG VAN trước khi rót main pour.', 'closed'],
          ['1:00–1:30', 170, 'Rót đến 170 g; thêm 125 g; ~4,2 g/s.', null],
          ['2:25', null, 'MỞ VAN, xả hết tự nhiên.', 'open'],
        ],
        notes: ['Ngâm yên 55 s sau khi rót xong. Pha van đóng 85 s (đã bao gồm thời gian rót). Xả sau mở: thử 40–75 s, không coi là deadline. Sau lọc: đảo server cho đá đã cân tan; dùng bồn đá ngoài nếu cần. Không cộng đá phục vụ ngoài 70 g.'],
      },
      'v60-iced':  { k7: 20, m40: 40, hotWater: 170, ice: 70, temp: 97, time: '2:25–3:05', flow: '~4,3–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00–1:15', 110, 'Thêm 65 g; ~4,3 g/s.', null],
          ['1:35–1:50', 170, 'Thêm 60 g; ~4 g/s.', null],
        ],
        notes: ['Sau lọc: đảo server cho đá đã cân tan; dùng bồn đá ngoài nếu cần. Không cộng đá phục vụ ngoài 70 g.'],
      },
      'flat-iced':  { k7: 21, m40: 42, hotWater: 170, ice: 70, temp: 97, time: '2:35–3:15', flow: '~4,3–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom: vòng nhỏ làm ướt đều toàn bed.', null],
          ['1:00–1:15', 110, 'Thêm 65 g; ~4,3 g/s.', null],
          ['1:40–1:55', 170, 'Thêm 60 g; ~4 g/s.', null],
        ],
        notes: ['Không ép giấy, không final swirl; kiểm tra seal trước grind. Sau lọc: đảo server cho đá đã cân tan; dùng bồn đá ngoài nếu cần. Không cộng đá phục vụ ngoài 70 g.'],
      },
    },
  },
  {
    id: 'hachi',
    short: 'HACHI',
    name: 'HACHI LOT 41 – SŌNGLÁN (松岚)',
    roaster: 'Fill Up / Hachi Project',
    roast: 'Light',
    origin: 'The Nest (云顶筑巢), Lincang, Vân Nam, Trung Quốc',
    variety: 'Syrina (赛琳娜)',
    process: 'Biocirculation',
    alt: '1.450–1.600 m',
    tasting: 'Mận • Trà đen • Cam quýt • Chanh • Chanh xanh • Caramel',
    beanNote: 'Light roast làm cơ sở, không bê mức nhiệt của Sidra. Nhắm mận/citrus trên nền ngọt và trà đen sạch, không cố kéo chát. Biocirculation là nhãn process, chưa có processing sheet đủ chi tiết để kết luận độ hòa tan, mức fermentation hay có co-ferment/infused. Không suy Syrina là con lai Java × Geisha từ hình hạt hoặc mô tả vị. Tên máy rang M6 không xác định development, Agtron hoặc độ dễ chiết. Note caramel không tự chứng minh rang sâu; trà đen không có nghĩa phải khô miệng. Review 90°C/1:15 là tham khảo, chưa khớp mẻ rang này.',
    goal: 'Mục tiêu: nền ngọt, mận tròn, citrus dịu hơn; hậu trà sạch.',
    pick: 'switch-hot',
    why: 'SWITCH NÓNG trước để đọc nền ngọt/mận, V60 NÓNG để so citrus–trà. Bản đá ưu tiên SWITCH ĐÁ; flat là test độ tròn sau khi giấy/flow ổn định.',
    adjust: [],
    recipes: {
      'switch-hot':  { k7: 23, m40: 46, hotWater: 240, ice: 0, temp: 93, time: '2:35–3:05', flow: '~4,5–4,9 g/s',
        steps: [
          ['0:00–0:10', 45, 'VAN MỞ; bloom đến 45 g; thêm 45 g; ~4,5 g/s.', null],
          ['0:45', null, 'ĐÓNG VAN trước khi rót.', 'closed'],
          ['0:45–1:25', 240, 'Rót đến 240 g; thêm 195 g; ~4,9 g/s.', null],
          ['1:55', null, 'MỞ VAN; xả tự nhiên, không swirl.', 'open'],
        ],
        notes: ['Ngâm yên 30 s sau khi rót xong. Pha van đóng 70 s (đã bao gồm thời gian rót). Xả sau mở: thử 40–70 s, không coi là deadline.'],
      },
      'v60-hot':  { k7: 22, m40: 44, hotWater: 240, ice: 0, temp: 93, time: '2:20–2:55', flow: '~4,8–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom đến 45 g; thêm 45 g; ~4,5 g/s.', null],
          ['0:45–1:05', 140, 'Thêm 95 g; ~4,8 g/s.', null],
          ['1:25–1:50', 240, 'Thêm 100 g; ~4 g/s.', null],
        ],
        notes: ['Nếu dùng đế Switch, giữ VAN MỞ xuyên suốt.'],
      },
      'flat-hot':  { k7: 23, m40: 46, hotWater: 240, ice: 0, temp: 93, time: '2:30–3:10', flow: '~4,8–4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom đến 45 g; thêm 45 g; ~4,5 g/s.', null],
          ['0:45–1:05', 140, 'Thêm 95 g; ~4,8 g/s.', null],
          ['1:25–1:50', 240, 'Thêm 100 g; ~4 g/s.', null],
        ],
        notes: ['Preheat kính kỹ; không ép giấy, không final swirl. Theo mực slurry, không cố rót đúng giờ khi còn quá cao.'],
      },
      'switch-iced':  { k7: 22, m40: 44, hotWater: 160, ice: 65, temp: 94, time: '2:35–3:05', flow: '~4,6 g/s',
        steps: [
          ['0:00–0:10', 45, 'VAN MỞ; bloom đến 45 g; thêm 45 g; ~4,5 g/s.', null],
          ['0:45', null, 'ĐÓNG VAN trước khi rót.', 'closed'],
          ['0:45–1:10', 160, 'Rót đến 160 g; thêm 115 g; ~4,6 g/s.', null],
          ['2:00', null, 'MỞ VAN; xả tự nhiên xuống server đá.', 'open'],
        ],
        notes: ['Ngâm yên 50 s sau khi rót xong. Pha van đóng 75 s (đã bao gồm thời gian rót). Xả sau mở: thử 35–65 s, không coi là deadline. Sau lọc: Đảo đều; 65 g đá đã cân là toàn bộ dilution của recipe. Dùng bồn đá ngoài nếu cần, không cộng đá tùy ý vào cốc.'],
      },
      'v60-iced':  { k7: 21, m40: 42, hotWater: 160, ice: 65, temp: 94, time: '2:05–2:40', flow: '~4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom đến 45 g; thêm 45 g; ~4,5 g/s.', null],
          ['0:45–1:00', 105, 'Thêm 60 g; ~4 g/s.', null],
          ['1:20–1:35', 160, 'Thêm 55 g; ~3,7 g/s.', null],
        ],
        notes: ['Nếu dùng đế Switch, giữ VAN MỞ xuyên suốt. Sau lọc: Đảo đều; dùng bồn đá ngoài nếu cần, không thêm đá tùy ý.'],
      },
      'flat-iced':  { k7: 22, m40: 44, hotWater: 160, ice: 65, temp: 94, time: '2:20–2:55', flow: '~4 g/s',
        steps: [
          ['0:00–0:10', 45, 'Bloom đến 45 g; thêm 45 g; ~4,5 g/s.', null],
          ['0:45–1:00', 105, 'Thêm 60 g; ~4 g/s.', null],
          ['1:25–1:40', 160, 'Thêm 55 g; ~3,7 g/s.', null],
        ],
        notes: ['Không ép giấy, không final swirl; kiểm tra seal trước grind. Sau lọc: Đảo đều; dùng bồn đá ngoài nếu cần, không thêm đá tùy ý.'],
      },
    },
  },
];

export const DIALIN: DialInRow[] = [
  ['Chua sắc + giữa ly rỗng + flow nhanh', 'Mịn hơn <b>1 click thường / 2 RC</b> trước.'],
  ['Switch thơm nhưng rỗng, xả bình thường', 'Giữ grind, mở van muộn hơn <b>15 s</b>. Không đồng thời tăng nhiệt và xay mịn.'],
  ['Khô/chát + xả chậm', 'Kiểm tra giấy/đáy/van; không rót mạnh hơn. Nếu giấy đã ổn, thử thô <b>1 click thường / 2 RC</b>.'],
  ['Đắng/chát nhưng flow bình thường', 'Thử hạ <b>1°C</b> ở cốc sau.'],
  ['Sạch, không chua nhưng loãng', 'Kiểm tra cân đá/tổng nước trước; concentration khác extraction. Đừng chỉ kéo thêm thời gian.'],
  ['Bloom còn phồng/khí mạnh gần cuối', 'Tăng bloom <b>15 s</b> và dời toàn bộ mốc còn lại <b>15 s</b> để giữ nguyên pha rót/ngâm sau.'],
  ['Chua nhói nhưng body đã đầy', 'Kiểm tra nước; không tăng khoáng để che một cốc còn under, không suy GH/KH từ số ppm.'],
  ['Iced: sạch nhưng thiếu chiết, mịn thêm gây nghẹt', 'Tăng phần nước nóng / giảm đá tương ứng ở mẻ khác, giữ tổng input; dùng bồn đá ngoài để bù làm lạnh.'],
];

export const DOSE = 15;
export const MINERAL = '4 g/L Aquafina (~70–80 ppm)';

export const FLAVOR_MAP: Record<string, string> = {
  'orange blossom': 'floral',
  'jasmine': 'floral',
  'rose': 'floral',
  'bergamot': 'floral',
  'citrus': 'citrus',
  'pomelo': 'citrus',
  'orange': 'citrus',
  'lemon': 'citrus',
  'peach': 'fruit',
  'pineapple': 'fruit',
  'grape': 'fruit',
  'passion': 'fruit',
  'melon': 'fruit',
  'honeydew': 'fruit',
  'honey': 'sweet',
  'sweet': 'sweet',
  'caramel': 'sweet',
  'mint': 'mint',
  'herbal': 'mint',
  'tea': 'mint',
  'plum': 'fruit',
  'black tea': 'fruit',
};

export const FLAVOR_COLORS: Record<string, string> = {
  floral: 'bg-purple-200 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
  citrus: 'bg-orange-200 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
  fruit: 'bg-emerald-200 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700',
  sweet: 'bg-amber-200 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700',
  mint: 'bg-cyan-200 text-cyan-800 border-cyan-300 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700',
};