const { getDB, initDB } = require('./init');

initDB();
const db = getDB();

const cocktails = [
  {
    name: '马天尼', name_en: 'Martini', category: '经典', base_spirit: '金酒',
    flavor: '干冽', difficulty: '入门', glass: '马天尼杯', method: '搅拌',
    garnish: '橄榄或柠檬皮', story: '007 的标志性饮品，「摇晃，不要搅拌」其实是个争议——传统派坚持搅拌。',
    ingredients: [
      { name: '伦敦干金酒', amount: '60', unit: 'ml' },
      { name: '干味美思', amount: '10', unit: 'ml' },
    ],
    steps: ['将金酒和味美思倒入装满冰的调酒杯中', '轻轻搅拌约30秒', '滤入冰镇的马天尼杯', '用橄榄或柠檬皮装饰'],
    tags: ['经典', '烈性', '派对']
  },
  {
    name: '曼哈顿', name_en: 'Manhattan', category: '经典', base_spirit: '威士忌',
    flavor: '浓郁', difficulty: '入门', glass: '鸡尾酒杯', method: '搅拌',
    garnish: '樱桃', story: '据说诞生于纽约曼哈顿俱乐部，是美国鸡尾酒文化的奠基之作。',
    ingredients: [
      { name: '黑麦威士忌', amount: '60', unit: 'ml' },
      { name: '甜味美思', amount: '30', unit: 'ml' },
      { name: '安格斯特拉苦精', amount: '2', unit: 'dash' },
    ],
    steps: ['将所有材料倒入装满冰的调酒杯', '搅拌约30秒至充分冷却', '滤入鸡尾酒杯', '用樱桃装饰'],
    tags: ['经典', '烈性', '约会']
  },
  {
    name: '古典鸡尾酒', name_en: 'Old Fashioned', category: '经典', base_spirit: '威士忌',
    flavor: '浓郁', difficulty: '入门', glass: '洛克杯', method: '调和',
    garnish: '橙皮', story: '鸡尾酒的鼻祖级存在，名字来自「老式做法」——最原始的调酒方式。',
    ingredients: [
      { name: '波本威士忌', amount: '60', unit: 'ml' },
      { name: '方糖', amount: '1', unit: '块' },
      { name: '安格斯特拉苦精', amount: '2', unit: 'dash' },
      { name: '水', amount: '少许', unit: '' },
    ],
    steps: ['将方糖放入杯中', '滴入苦精和少许水', '捣碎方糖至溶解', '加入一大块冰', '倒入威士忌', '轻轻搅拌', '用橙皮拧出油脂后装饰'],
    tags: ['经典', '烈性', '独酌']
  },
  {
    name: '内格罗尼', name_en: 'Negroni', category: '经典', base_spirit: '金酒',
    flavor: '苦甜', difficulty: '入门', glass: '洛克杯', method: '调和',
    garnish: '橙片', story: '1919年诞生于意大利佛罗伦萨，伯爵 Count Camillo Negroni 要求调酒师把苏打水换成金酒。',
    ingredients: [
      { name: '金酒', amount: '30', unit: 'ml' },
      { name: '金巴利', amount: '30', unit: 'ml' },
      { name: '甜味美思', amount: '30', unit: 'ml' },
    ],
    steps: ['将所有材料倒入装满冰的洛克杯', '轻轻搅拌', '用橙片装饰'],
    tags: ['经典', '苦味', '餐前']
  },
  {
    name: '威士忌酸', name_en: 'Whiskey Sour', category: '经典', base_spirit: '威士忌',
    flavor: '酸甜', difficulty: '入门', glass: '威士忌杯', method: '摇和',
    garnish: '樱桃和橙片', story: '酸酒家族的代表，加入蛋清后口感如丝般顺滑。',
    ingredients: [
      { name: '波本威士忌', amount: '45', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '30', unit: 'ml' },
      { name: '糖浆', amount: '15', unit: 'ml' },
      { name: '蛋清（可选）', amount: '1', unit: '个' },
    ],
    steps: ['将所有材料不加冰摇匀（干摇）', '加入冰块再次摇匀', '滤入加冰的杯中', '用樱桃和橙片装饰'],
    tags: ['经典', '酸甜', '派对']
  },
  {
    name: '莫吉托', name_en: 'Mojito', category: '经典', base_spirit: '朗姆酒',
    flavor: '清爽', difficulty: '入门', glass: '高球杯', method: '调和',
    garnish: '薄荷和青柠', story: '海明威的最爱，古巴哈瓦那的 La Bodeguita 酒吧墙上写着「我的莫吉托在这里」。',
    ingredients: [
      { name: '白朗姆酒', amount: '45', unit: 'ml' },
      { name: '鲜青柠汁', amount: '30', unit: 'ml' },
      { name: '糖浆', amount: '20', unit: 'ml' },
      { name: '苏打水', amount: '适量', unit: '' },
      { name: '薄荷叶', amount: '8', unit: '片' },
    ],
    steps: ['将薄荷叶和糖浆放入杯中轻轻捣压', '加入青柠汁和朗姆酒', '加入碎冰', '倒入苏打水至满', '轻轻搅拌', '用薄荷和青柠装饰'],
    tags: ['经典', '清爽', '夏日']
  },
  {
    name: '玛格丽特', name_en: 'Margarita', category: '经典', base_spirit: '龙舌兰',
    flavor: '酸甜', difficulty: '入门', glass: '玛格丽特杯', method: '摇和',
    garnish: '盐边和青柠', story: '关于它的起源众说纷纭，但盐边杯口是灵魂——咸、酸、甜的完美平衡。',
    ingredients: [
      { name: '龙舌兰', amount: '45', unit: 'ml' },
      { name: '君度橙酒', amount: '30', unit: 'ml' },
      { name: '鲜青柠汁', amount: '30', unit: 'ml' },
    ],
    steps: ['杯口用青柠擦拭，沾盐边', '将所有材料加冰摇匀', '滤入准备好的杯中', '用青柠装饰'],
    tags: ['经典', '酸甜', '派对']
  },
  {
    name: '干马天尼', name_en: 'Dry Martini', category: '经典', base_spirit: '金酒',
    flavor: '干冽', difficulty: '进阶', glass: '马天尼杯', method: '搅拌',
    garnish: '柠檬皮', story: '海明威在《永别了，武器》中写道：「我喝了干马天尼，只有一滴苦精。」',
    ingredients: [
      { name: '伦敦干金酒', amount: '75', unit: 'ml' },
      { name: '干味美思', amount: '7.5', unit: 'ml' },
    ],
    steps: ['将金酒和味美思倒入冰镇调酒杯', '搅拌至充分冷却', '滤入马天尼杯', '拧柠檬皮装饰'],
    tags: ['经典', '干型', '独酌']
  },
  {
    name: '大都会', name_en: 'Cosmopolitan', category: '现代', base_spirit: '伏特加',
    flavor: '酸甜', difficulty: '入门', glass: '马天尼杯', method: '摇和',
    garnish: '橙皮', story: '因《欲望都市》而风靡全球，Carrie Bradshaw 的标志性饮品。',
    ingredients: [
      { name: '伏特加', amount: '40', unit: 'ml' },
      { name: '君度橙酒', amount: '15', unit: 'ml' },
      { name: '蔓越莓汁', amount: '30', unit: 'ml' },
      { name: '鲜青柠汁', amount: '15', unit: 'ml' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入冰镇马天尼杯', '用橙皮装饰'],
    tags: ['现代', '酸甜', '派对']
  },
  {
    name: '长岛冰茶', name_en: 'Long Island Iced Tea', category: '现代', base_spirit: '综合烈酒',
    flavor: '强劲', difficulty: '入门', glass: '高球杯', method: '调和',
    garnish: '柠檬片', story: '看起来像冰茶，喝起来像冰茶，但它是五种烈酒的致命混合。',
    ingredients: [
      { name: '伏特加', amount: '15', unit: 'ml' },
      { name: '金酒', amount: '15', unit: 'ml' },
      { name: '白朗姆酒', amount: '15', unit: 'ml' },
      { name: '龙舌兰', amount: '15', unit: 'ml' },
      { name: '君度橙酒', amount: '15', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '25', unit: 'ml' },
      { name: '糖浆', amount: '15', unit: 'ml' },
      { name: '可乐', amount: '适量', unit: '' },
    ],
    steps: ['将除可乐外所有材料加冰摇匀', '滤入加冰的高球杯', '倒入少许可乐上色', '用柠檬片装饰'],
    tags: ['现代', '烈性', '派对']
  },
  {
    name: '血腥玛丽', name_en: 'Bloody Mary', category: '经典', base_spirit: '伏特加',
    flavor: '咸鲜', difficulty: '进阶', glass: '高球杯', method: '调和',
    garnish: '芹菜和柠檬', story: '以英格兰女王玛丽一世命名，公认的「宿醉解药」和早午餐必备。',
    ingredients: [
      { name: '伏特加', amount: '45', unit: 'ml' },
      { name: '番茄汁', amount: '90', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '15', unit: 'ml' },
      { name: '伍斯特酱', amount: '2', unit: 'dash' },
      { name: '塔巴斯科辣酱', amount: '少许', unit: '' },
      { name: '盐和胡椒', amount: '少许', unit: '' },
    ],
    steps: ['将所有材料倒入调酒杯', '轻轻搅拌（不要摇，会起泡）', '滤入加冰的高球杯', '用芹菜和柠檬装饰'],
    tags: ['经典', '咸鲜', '早午餐']
  },
  {
    name: '新加坡司令', name_en: 'Singapore Sling', category: '经典', base_spirit: '金酒',
    flavor: '酸甜', difficulty: '进阶', glass: '高球杯', method: '摇和',
    garnish: '樱桃和菠萝', story: '诞生于新加坡莱佛士酒店，是热带鸡尾酒的代名词。',
    ingredients: [
      { name: '金酒', amount: '30', unit: 'ml' },
      { name: '樱桃利口酒', amount: '15', unit: 'ml' },
      { name: '君度橙酒', amount: '7.5', unit: 'ml' },
      { name: '廊酒', amount: '7.5', unit: 'ml' },
      { name: '鲜菠萝汁', amount: '120', unit: 'ml' },
      { name: '鲜青柠汁', amount: '15', unit: 'ml' },
      { name: '石榴糖浆', amount: '10', unit: 'ml' },
      { name: '安格斯特拉苦精', amount: '1', unit: 'dash' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入加冰的高球杯', '用樱桃和菠萝片装饰'],
    tags: ['经典', '热带', '派对']
  },
  {
    name: '黛绮莉', name_en: 'Daiquiri', category: '经典', base_spirit: '朗姆酒',
    flavor: '酸甜', difficulty: '入门', glass: '鸡尾酒杯', method: '摇和',
    garnish: '青柠', story: '海明威最爱的另一款酒，最纯粹的朗姆鸡尾酒。',
    ingredients: [
      { name: '白朗姆酒', amount: '60', unit: 'ml' },
      { name: '鲜青柠汁', amount: '30', unit: 'ml' },
      { name: '糖浆', amount: '15', unit: 'ml' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入鸡尾酒杯', '用青柠装饰'],
    tags: ['经典', '酸甜', '夏日']
  },
  {
    name: '威士忌嗨棒', name_en: 'Whisky Highball', category: '现代', base_spirit: '威士忌',
    flavor: '清爽', difficulty: '入门', glass: '高球杯', method: '调和',
    garnish: '柠檬皮', story: '日本居酒屋的灵魂饮品，简单到极致反而最难做好。',
    ingredients: [
      { name: '威士忌', amount: '45', unit: 'ml' },
      { name: '苏打水', amount: '适量', unit: '' },
    ],
    steps: ['在高球杯中加满冰块', '倒入威士忌', '缓缓加入冰镇苏打水', '轻轻搅拌一次', '用柠檬皮装饰'],
    tags: ['清爽', '简单', '独酌']
  },
  {
    name: '白色俄罗斯', name_en: 'White Russian', category: '现代', base_spirit: '伏特加',
    flavor: '甜润', difficulty: '入门', glass: '洛克杯', method: '调和',
    garnish: '无', story: '因电影《谋杀绿脚趾》而重新走红，The Dude 的最爱。',
    ingredients: [
      { name: '伏特加', amount: '45', unit: 'ml' },
      { name: '咖啡利口酒', amount: '30', unit: 'ml' },
      { name: '鲜奶油', amount: '30', unit: 'ml' },
    ],
    steps: ['在洛克杯中加冰', '倒入伏特加和咖啡利口酒', '缓缓倒入鲜奶油使其浮在表面', '饮用前搅拌'],
    tags: ['甜润', '餐后', '独酌']
  },
  {
    name: '尼格罗尼气泡', name_en: 'Aperol Spritz', category: '现代', base_spirit: '开胃酒',
    flavor: '苦甜', difficulty: '入门', glass: '葡萄酒杯', method: '调和',
    garnish: '橙片', story: '意大利人的夏日社交饮品，街头巷尾人手一杯。',
    ingredients: [
      { name: '阿佩罗', amount: '60', unit: 'ml' },
      { name: '普罗赛克起泡酒', amount: '90', unit: 'ml' },
      { name: '苏打水', amount: '少许', unit: '' },
    ],
    steps: ['在葡萄酒杯中加冰', '倒入阿佩罗', '加入普罗赛克', '滴少许苏打水', '用橙片装饰'],
    tags: ['清爽', '餐前', '夏日']
  },
  {
    name: '边车', name_en: 'Sidecar', category: '经典', base_spirit: '白兰地',
    flavor: '酸甜', difficulty: '进阶', glass: '鸡尾酒杯', method: '摇和',
    garnish: '糖边和橙皮', story: '一战时期的经典，据说以一位军官的边三轮摩托命名。',
    ingredients: [
      { name: '白兰地', amount: '50', unit: 'ml' },
      { name: '君度橙酒', amount: '20', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '20', unit: 'ml' },
    ],
    steps: ['杯口做糖边', '将所有材料加冰摇匀', '滤入准备好的鸡尾酒杯', '用橙皮装饰'],
    tags: ['经典', '酸甜', '约会']
  },
  {
    name: '帕洛玛', name_en: 'Paloma', category: '现代', base_spirit: '龙舌兰',
    flavor: '清爽', difficulty: '入门', glass: '高球杯', method: '调和',
    garnish: '青柠和盐', story: '墨西哥最受欢迎的鸡尾酒，比玛格丽特更日常。',
    ingredients: [
      { name: '龙舌兰', amount: '45', unit: 'ml' },
      { name: '鲜青柠汁', amount: '15', unit: 'ml' },
      { name: '西柚汽水', amount: '适量', unit: '' },
      { name: '盐', amount: '少许', unit: '' },
    ],
    steps: ['杯口沾盐', '加冰，倒入龙舌兰和青柠汁', '倒入西柚汽水至满', '轻轻搅拌', '用青柠装饰'],
    tags: ['清爽', '夏日', '简单']
  },
  {
    name: '莫斯科骡子', name_en: 'Moscow Mule', category: '现代', base_spirit: '伏特加',
    flavor: '清爽', difficulty: '入门', glass: '铜杯', method: '调和',
    garnish: '青柠和薄荷', story: '铜杯是标志，其实是伏特加商和姜汁啤酒商的一次成功联姻。',
    ingredients: [
      { name: '伏特加', amount: '45', unit: 'ml' },
      { name: '鲜青柠汁', amount: '15', unit: 'ml' },
      { name: '姜汁啤酒', amount: '适量', unit: '' },
    ],
    steps: ['在铜杯中加冰', '倒入伏特加和青柠汁', '倒入姜汁啤酒至满', '轻轻搅拌', '用青柠和薄荷装饰'],
    tags: ['清爽', '简单', '夏日']
  },
  {
    name: '僵尸', name_en: 'Zombie', category: '经典', base_spirit: '朗姆酒',
    flavor: '热带', difficulty: '专业', glass: '飓风杯', method: '摇和',
    garnish: '薄荷和水果', story: 'Don the Beachcomber 的传奇配方，被保密了数十年。酒精含量极高，限喝两杯。',
    ingredients: [
      { name: '白朗姆酒', amount: '30', unit: 'ml' },
      { name: '金色朗姆酒', amount: '30', unit: 'ml' },
      { name: '黑朗姆酒', amount: '30', unit: 'ml' },
      { name: '151度朗姆酒', amount: '15', unit: 'ml' },
      { name: '鲜青柠汁', amount: '15', unit: 'ml' },
      { name: '鲜菠萝汁', amount: '30', unit: 'ml' },
      { name: '百香果糖浆', amount: '15', unit: 'ml' },
      { name: '石榴糖浆', amount: '10', unit: 'ml' },
      { name: '安格斯特拉苦精', amount: '1', unit: 'dash' },
    ],
    steps: ['将除151度朗姆酒外的所有材料加冰摇匀', '滤入加碎冰的飓风杯', '在表面浮上151度朗姆酒', '用薄荷和水果装饰'],
    tags: ['热带', '烈性', '派对']
  },
  {
    name: '古典金汤力', name_en: 'Gin & Tonic', category: '经典', base_spirit: '金酒',
    flavor: '清爽', difficulty: '入门', glass: '高球杯', method: '调和',
    garnish: '青柠', story: '英国殖民时期为对抗疟疾而发明，如今是全球最受欢迎的简单鸡尾酒之一。',
    ingredients: [
      { name: '金酒', amount: '45', unit: 'ml' },
      { name: '汤力水', amount: '适量', unit: '' },
      { name: '青柠角', amount: '2', unit: '角' },
    ],
    steps: ['在高球杯中加满冰块', '倒入金酒', '缓缓加入冰镇汤力水', '挤入青柠汁并投入杯中', '轻轻搅拌'],
    tags: ['清爽', '简单', '夏日']
  },
  {
    name: '薄荷朱利普', name_en: 'Mint Julep', category: '经典', base_spirit: '威士忌',
    flavor: '清爽', difficulty: '入门', glass: '朱利普杯', method: '调和',
    garnish: '薄荷', story: '美国肯塔基赛马会的官方饮品，每年要消耗近12万杯。',
    ingredients: [
      { name: '波本威士忌', amount: '60', unit: 'ml' },
      { name: '糖浆', amount: '10', unit: 'ml' },
      { name: '薄荷叶', amount: '8', unit: '片' },
    ],
    steps: ['将薄荷叶和糖浆放入杯中轻轻捣压', '加入碎冰', '倒入波本威士忌', '轻轻搅拌', '再加碎冰至满', '用薄荷枝装饰'],
    tags: ['经典', '清爽', '独酌']
  },
  {
    name: '黑俄罗斯', name_en: 'Black Russian', category: '现代', base_spirit: '伏特加',
    flavor: '浓郁', difficulty: '入门', glass: '洛克杯', method: '调和',
    garnish: '无', story: '白色俄罗斯的前身，更纯粹、更直接。',
    ingredients: [
      { name: '伏特加', amount: '50', unit: 'ml' },
      { name: '咖啡利口酒', amount: '25', unit: 'ml' },
    ],
    steps: ['在洛克杯中加冰', '倒入伏特加和咖啡利口酒', '轻轻搅拌'],
    tags: ['简单', '餐后', '独酌']
  },
  {
    name: '自由古巴', name_en: 'Cuba Libre', category: '经典', base_spirit: '朗姆酒',
    flavor: '清爽', difficulty: '入门', glass: '高球杯', method: '调和',
    garnish: '青柠', story: '美西战争后诞生，名字意为「自由的古巴」，朗姆可乐的正式版本。',
    ingredients: [
      { name: '白朗姆酒', amount: '45', unit: 'ml' },
      { name: '鲜青柠汁', amount: '10', unit: 'ml' },
      { name: '可乐', amount: '适量', unit: '' },
    ],
    steps: ['在高球杯中加冰', '挤入青柠汁，投入青柠', '倒入朗姆酒', '倒入可乐至满', '轻轻搅拌'],
    tags: ['简单', '清爽', '派对']
  },
  {
    name: '教父', name_en: 'Godfather', category: '现代', base_spirit: '威士忌',
    flavor: '甜润', difficulty: '入门', glass: '洛克杯', method: '调和',
    garnish: '无', story: '据说因马龙·白兰度而得名，简单的威士忌与杏仁利口酒的完美搭配。',
    ingredients: [
      { name: '苏格兰威士忌', amount: '45', unit: 'ml' },
      { name: '阿玛雷托杏仁利口酒', amount: '15', unit: 'ml' },
    ],
    steps: ['在洛克杯中加冰', '倒入威士忌和杏仁利口酒', '轻轻搅拌'],
    tags: ['简单', '餐后', '独酌']
  },
  {
    name: '汤姆柯林斯', name_en: 'Tom Collins', category: '经典', base_spirit: '金酒',
    flavor: '酸甜', difficulty: '入门', glass: '柯林斯杯', method: '调和',
    garnish: '樱桃和橙片', story: '19世纪的一场恶作剧让这款酒名声大噪——人们到处找一个叫 Tom Collins 的人。',
    ingredients: [
      { name: '伦敦干金酒', amount: '45', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '30', unit: 'ml' },
      { name: '糖浆', amount: '15', unit: 'ml' },
      { name: '苏打水', amount: '适量', unit: '' },
    ],
    steps: ['将金酒、柠檬汁和糖浆加冰摇匀', '滤入加冰的柯林斯杯', '倒入苏打水至满', '轻轻搅拌', '用樱桃和橙片装饰'],
    tags: ['经典', '酸甜', '夏日']
  },
  {
    name: '亚历山大', name_en: 'Brandy Alexander', category: '经典', base_spirit: '白兰地',
    flavor: '甜润', difficulty: '入门', glass: '鸡尾酒杯', method: '摇和',
    garnish: '肉豆蔻', story: '披头士的 John Lennon 最爱的甜品鸡尾酒。',
    ingredients: [
      { name: '白兰地', amount: '30', unit: 'ml' },
      { name: '可可利口酒', amount: '30', unit: 'ml' },
      { name: '鲜奶油', amount: '30', unit: 'ml' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入鸡尾酒杯', '撒少许肉豆蔻粉'],
    tags: ['甜润', '餐后', '约会']
  },
  {
    name: '含羞草', name_en: 'Mimosa', category: '经典', base_spirit: '开胃酒',
    flavor: '清爽', difficulty: '入门', class: '香槟杯', method: '调和',
    garnish: '橙片', story: '早午餐之王，以含羞草花命名，简单到只需两种材料。',
    glass: '香槟杯',
    ingredients: [
      { name: '普罗赛克起泡酒', amount: '75', unit: 'ml' },
      { name: '鲜橙汁', amount: '75', unit: 'ml' },
    ],
    steps: ['在香槟杯中倒入冰镇橙汁', '缓缓加入起泡酒', '轻轻搅拌', '用橙片装饰'],
    tags: ['清爽', '早午餐', '简单']
  },
  {
    name: '飞行', name_en: 'Aviation', category: '经典', base_spirit: '金酒',
    flavor: '花香', difficulty: '进阶', glass: '鸡尾酒杯', method: '摇和',
    garnish: '樱桃', story: '紫罗兰色的天空意象，失传多年后被重新发掘的经典。',
    ingredients: [
      { name: '金酒', amount: '45', unit: 'ml' },
      { name: '黑樱桃利口酒', amount: '15', unit: 'ml' },
      { name: '紫罗兰利口酒', amount: '7.5', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '15', unit: 'ml' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入鸡尾酒杯', '用樱桃装饰'],
    tags: ['经典', '花香', '约会']
  },
  {
    name: '纸飞机', name_en: 'Paper Plane', category: '现代', base_spirit: '威士忌',
    flavor: '苦甜', difficulty: '进阶', glass: '鸡尾酒杯', method: '摇和',
    garnish: '无', story: '2007年诞生的现代经典，四种等量材料的完美平衡。',
    ingredients: [
      { name: '波本威士忌', amount: '22.5', unit: 'ml' },
      { name: '阿玛罗诺尼苦酒', amount: '22.5', unit: 'ml' },
      { name: '阿佩罗', amount: '22.5', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '22.5', unit: 'ml' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入鸡尾酒杯'],
    tags: ['现代', '苦甜', '独酌']
  },
  {
    name: '盘尼西林', name_en: 'Penicillin', category: '现代', base_spirit: '威士忌',
    flavor: '烟熏', difficulty: '专业', glass: '洛克杯', method: '摇和',
    garnish: '姜片和烟熏威士忌', story: '2005年在纽约诞生，用烟熏威士忌讲述了一个关于治愈的故事。',
    ingredients: [
      { name: '混合苏格兰威士忌', amount: '60', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '22.5', unit: 'ml' },
      { name: '蜂蜜姜糖浆', amount: '22.5', unit: 'ml' },
      { name: '艾雷岛威士忌（浮面）', amount: '7.5', unit: 'ml' },
    ],
    steps: ['将混合威士忌、柠檬汁和蜂蜜姜糖浆加冰摇匀', '滤入加冰的洛克杯', '在表面浮上艾雷岛威士忌', '用姜片装饰'],
    tags: ['现代', '烟熏', '独酌']
  },
  {
    name: '冰沙黛绮莉', name_en: 'Frozen Daiquiri', category: '现代', base_spirit: '朗姆酒',
    flavor: '酸甜', difficulty: '入门', glass: '鸡尾酒杯', method: '搅拌',
    garnish: '青柠', story: '经典黛绮莉的冰沙版本，夏日续命神器。',
    ingredients: [
      { name: '白朗姆酒', amount: '60', unit: 'ml' },
      { name: '鲜青柠汁', amount: '30', unit: 'ml' },
      { name: '糖浆', amount: '20', unit: 'ml' },
      { name: '碎冰', amount: '1', unit: '杯' },
    ],
    steps: ['将所有材料放入搅拌机', '高速搅拌至顺滑', '倒入鸡尾酒杯', '用青柠装饰'],
    tags: ['夏日', '酸甜', '派对']
  },
  {
    name: '爱尔兰咖啡', name_en: 'Irish Coffee', category: '经典', base_spirit: '威士忌',
    flavor: '浓郁', difficulty: '进阶', glass: '爱尔兰咖啡杯', method: '调和',
    garnish: '鲜奶油', story: '1942年爱尔兰一家机场餐厅为延误旅客发明的暖身饮品。',
    ingredients: [
      { name: '爱尔兰威士忌', amount: '40', unit: 'ml' },
      { name: '热咖啡', amount: '160', unit: 'ml' },
      { name: '红糖', amount: '1', unit: '茶匙' },
      { name: '鲜奶油', amount: '适量', unit: '' },
    ],
    steps: ['用热水预热杯子', '加入红糖和热咖啡搅拌至溶解', '倒入爱尔兰威士忌', '缓缓倒入鲜奶油使其浮在表面', '不要搅拌，直接饮用'],
    tags: ['餐后', '冬日', '暖身']
  },
  {
    name: '热托迪', name_en: 'Hot Toddy', category: '经典', base_spirit: '威士忌',
    flavor: '暖甜', difficulty: '入门', glass: '耐热杯', method: '调和',
    garnish: '柠檬和肉桂', story: '苏格兰人的冬夜暖身秘方，据说能治感冒。',
    ingredients: [
      { name: '苏格兰威士忌', amount: '45', unit: 'ml' },
      { name: '蜂蜜', amount: '15', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '15', unit: 'ml' },
      { name: '热水', amount: '适量', unit: '' },
    ],
    steps: ['在耐热杯中加入蜂蜜和柠檬汁', '倒入威士忌', '加入热水', '搅拌至蜂蜜溶解', '用柠檬片和肉桂装饰'],
    tags: ['冬日', '暖身', '简单']
  },
  {
    name: '迈泰', name_en: 'Mai Tai', category: '经典', base_spirit: '朗姆酒',
    flavor: '热带', difficulty: '进阶', glass: '洛克杯', method: '摇和',
    garnish: '薄荷和菠萝', story: 'Trader Vic 在1944年发明，尝了一口的客人惊呼「Mai Tai!」（大溪地语：太棒了！）。',
    ingredients: [
      { name: '陈年朗姆酒', amount: '45', unit: 'ml' },
      { name: '橙柑橘利口酒', amount: '15', unit: 'ml' },
      { name: '鲜青柠汁', amount: '20', unit: 'ml' },
      { name: '杏仁糖浆', amount: '10', unit: 'ml' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入加碎冰的洛克杯', '用薄荷和菠萝装饰'],
    tags: ['热带', '夏日', '派对']
  },
  {
    name: '法国75', name_en: 'French 75', category: '经典', base_spirit: '金酒',
    flavor: '清爽', difficulty: '进阶', glass: '香槟杯', method: '摇和',
    garnish: '柠檬皮', story: '一战时法国的一款75毫米口径大炮给了这款酒灵感——后劲跟大炮一样猛。',
    ingredients: [
      { name: '金酒', amount: '30', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '15', unit: 'ml' },
      { name: '糖浆', amount: '10', unit: 'ml' },
      { name: '香槟', amount: '适量', unit: '' },
    ],
    steps: ['将金酒、柠檬汁和糖浆加冰摇匀', '滤入香槟杯', '缓缓加入香槟', '用柠檬皮装饰'],
    tags: ['经典', '清爽', '庆祝']
  },
  {
    name: '椰林飘香', name_en: 'Piña Colada', category: '经典', base_spirit: '朗姆酒',
    flavor: '热带', difficulty: '入门', glass: '飓风杯', method: '搅拌',
    garnish: '菠萝和樱桃', story: '波多黎各的国饮，1979年 Rupert Holmes 的歌让它火遍全球。',
    ingredients: [
      { name: '白朗姆酒', amount: '60', unit: 'ml' },
      { name: '菠萝汁', amount: '90', unit: 'ml' },
      { name: '椰浆', amount: '30', unit: 'ml' },
    ],
    steps: ['将所有材料与碎冰放入搅拌机', '搅拌至顺滑', '倒入飓风杯', '用菠萝和樱桃装饰'],
    tags: ['热带', '夏日', '派对']
  },
  {
    name: '教母', name_en: 'Godmother', category: '现代', base_spirit: '伏特加',
    flavor: '甜润', difficulty: '入门', glass: '洛克杯', method: '调和',
    garnish: '无', story: '教父的女性版本，用伏特加替代威士忌。',
    ingredients: [
      { name: '伏特加', amount: '45', unit: 'ml' },
      { name: '阿玛雷托杏仁利口酒', amount: '15', unit: 'ml' },
    ],
    steps: ['在洛克杯中加冰', '倒入伏特加和杏仁利口酒', '轻轻搅拌'],
    tags: ['简单', '餐后', '独酌']
  },
  {
    name: '罗伯罗伊', name_en: 'Rob Roy', category: '经典', base_spirit: '威士忌',
    flavor: '浓郁', difficulty: '入门', glass: '鸡尾酒杯', method: '搅拌',
    garnish: '樱桃', story: '苏格兰版曼哈顿，以苏格兰英雄 Rob Roy MacGregor 命名。',
    ingredients: [
      { name: '苏格兰威士忌', amount: '60', unit: 'ml' },
      { name: '甜味美思', amount: '30', unit: 'ml' },
      { name: '安格斯特拉苦精', amount: '2', unit: 'dash' },
    ],
    steps: ['将所有材料倒入装满冰的调酒杯', '搅拌约30秒', '滤入鸡尾酒杯', '用樱桃装饰'],
    tags: ['经典', '浓郁', '独酌']
  },
  {
    name: '蓝色泻湖', name_en: 'Blue Lagoon', category: '现代', base_spirit: '伏特加',
    flavor: '酸甜', difficulty: '入门', glass: '高球杯', method: '调和',
    garnish: '橙片和樱桃', story: '蓝色的视觉冲击力让它成为派对明星。',
    ingredients: [
      { name: '伏特加', amount: '30', unit: 'ml' },
      { name: '蓝柑橘利口酒', amount: '20', unit: 'ml' },
      { name: '柠檬汽水', amount: '适量', unit: '' },
    ],
    steps: ['在高球杯中加冰', '倒入伏特加和蓝柑橘利口酒', '倒入柠檬汽水至满', '轻轻搅拌', '用橙片和樱桃装饰'],
    tags: ['派对', '酸甜', '夏日']
  },
  {
    name: '涩', name_en: 'Gimlet', category: '经典', base_spirit: '金酒',
    flavor: '酸甜', difficulty: '入门', glass: '鸡尾酒杯', method: '摇和',
    garnish: '青柠', story: '英国海军的维C来源，「不喝涩就喝不到好金酒」。',
    ingredients: [
      { name: '金酒', amount: '60', unit: 'ml' },
      { name: '鲜青柠汁', amount: '30', unit: 'ml' },
      { name: '糖浆', amount: '15', unit: 'ml' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入鸡尾酒杯', '用青柠装饰'],
    tags: ['经典', '酸甜', '简单']
  },
  {
    name: '维斯帕', name_en: 'Vesper', category: '经典', base_spirit: '金酒',
    flavor: '干冽', difficulty: '进阶', glass: '马天尼杯', method: '摇和',
    garnish: '柠檬皮', story: '007 在《皇家赌场》中亲自点名发明的鸡尾酒，以 Vesper Lynd 命名。',
    ingredients: [
      { name: '金酒', amount: '45', unit: 'ml' },
      { name: '伏特加', amount: '15', unit: 'ml' },
      { name: '利莱白开胃酒', amount: '7.5', unit: 'ml' },
    ],
    steps: ['将所有材料加冰用力摇匀', '滤入冰镇马天尼杯', '拧柠檬皮装饰'],
    tags: ['经典', '干冽', '约会']
  },
  {
    name: '薄荷巧克力马天尼', name_en: 'Chocolate Mint Martini', category: '现代', base_spirit: '伏特加',
    flavor: '甜润', difficulty: '入门', glass: '马天尼杯', method: '摇和',
    garnish: '薄荷叶和巧克力碎', story: '甜品型鸡尾酒，薄荷与巧克力的经典组合。',
    ingredients: [
      { name: '伏特加', amount: '40', unit: 'ml' },
      { name: '薄荷利口酒', amount: '20', unit: 'ml' },
      { name: '可可利口酒', amount: '20', unit: 'ml' },
      { name: '鲜奶油', amount: '15', unit: 'ml' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入马天尼杯', '撒巧克力碎，用薄荷装饰'],
    tags: ['甜润', '餐后', '约会']
  },
  {
    name: '风暴', name_en: "Dark 'n' Stormy", category: '经典', base_spirit: '朗姆酒',
    flavor: '辛辣', difficulty: '入门', glass: '高球杯', method: '调和',
    garnish: '青柠', story: '百慕大的官方饮品，黑色朗姆浮在姜汁啤酒上像暴风雨的天空。',
    ingredients: [
      { name: '黑朗姆酒', amount: '60', unit: 'ml' },
      { name: '姜汁啤酒', amount: '适量', unit: '' },
      { name: '青柠汁', amount: '15', unit: 'ml' },
    ],
    steps: ['在高球杯中加冰', '倒入姜汁啤酒和青柠汁', '缓缓倒入黑朗姆使其浮在表面', '用青柠装饰'],
    tags: ['简单', '辛辣', '夏日']
  },
  {
    name: '佛莱明哥', name_en: 'Flamingo', category: '现代', base_spirit: '朗姆酒',
    flavor: '热带', difficulty: '进阶', glass: '鸡尾酒杯', method: '摇和',
    garnish: '火龙果', story: '粉色的热带风情，视觉和味觉的双重享受。',
    ingredients: [
      { name: '白朗姆酒', amount: '40', unit: 'ml' },
      { name: '百香果利口酒', amount: '15', unit: 'ml' },
      { name: '蔓越莓汁', amount: '30', unit: 'ml' },
      { name: '鲜青柠汁', amount: '15', unit: 'ml' },
      { name: '糖浆', amount: '10', unit: 'ml' },
    ],
    steps: ['将所有材料加冰摇匀', '滤入鸡尾酒杯', '用火龙果装饰'],
    tags: ['热带', '酸甜', '派对']
  },
  {
    name: '黑刺李金菲士', name_en: 'Sloe Gin Fizz', category: '经典', base_spirit: '金酒',
    flavor: '酸甜', difficulty: '入门', glass: '高球杯', method: '摇和',
    garnish: '柠檬', story: '用黑刺李杜松子利口酒调制，酸甜的浆果风味令人愉悦。',
    ingredients: [
      { name: '黑刺李金酒', amount: '45', unit: 'ml' },
      { name: '鲜柠檬汁', amount: '30', unit: 'ml' },
      { name: '糖浆', amount: '15', unit: 'ml' },
      { name: '苏打水', amount: '适量', unit: '' },
    ],
    steps: ['将黑刺李金酒、柠檬汁和糖浆加冰摇匀', '滤入加冰的高球杯', '倒入苏打水至满', '轻轻搅拌'],
    tags: ['经典', '酸甜', '夏日']
  },
  {
    name: '锈钉', name_en: 'Rusty Nail', category: '经典', base_spirit: '威士忌',
    flavor: '甜润', difficulty: '入门', glass: '洛克杯', method: '调和',
    garnish: '柠檬皮', story: '60年代纽约21俱乐部的招牌，名字据说来自用钉子搅拌的传说。',
    ingredients: [
      { name: '苏格兰威士忌', amount: '45', unit: 'ml' },
      { name: '杜林标利口酒', amount: '25', unit: 'ml' },
    ],
    steps: ['在洛克杯中加冰', '倒入威士忌和杜林标', '轻轻搅拌', '用柠檬皮装饰'],
    tags: ['简单', '餐后', '独酌']
  },
  {
    name: '雪球', name_en: 'Snowball', category: '现代', base_spirit: '利口酒',
    flavor: '甜润', difficulty: '入门', glass: '高球杯', method: '调和',
    garnish: '樱桃', story: '蛋奶酒般的冬日饮品，英国圣诞季的热门选择。',
    ingredients: [
      { name: '阿德沃卡蛋黄利口酒', amount: '50', unit: 'ml' },
      { name: '青柠汁', amount: '25', unit: 'ml' },
      { name: '柠檬汽水', amount: '适量', unit: '' },
    ],
    steps: ['在高球杯中加冰', '倒入蛋黄利口酒和青柠汁', '倒入柠檬汽水至满', '轻轻搅拌', '用樱桃装饰'],
    tags: ['甜润', '冬日', '派对']
  },
];

// Insert cocktails
const insertCocktail = db.prepare(`
  INSERT INTO cocktails (name, name_en, category, base_spirit, flavor, difficulty, glass, method, garnish, story, is_custom)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
`);

const insertIngredient = db.prepare(`
  INSERT INTO ingredients (cocktail_id, name, amount, unit, sort_order) VALUES (?, ?, ?, ?, ?)
`);

const insertStep = db.prepare(`
  INSERT INTO steps (cocktail_id, step_order, content) VALUES (?, ?, ?)
`);

const insertTag = db.prepare(`
  INSERT INTO tags (cocktail_id, tag) VALUES (?, ?)
`);

const insertMany = db.transaction(() => {
  // Clear existing built-in cocktails (is_custom = 0) before re-seeding
  // CASCADE foreign key will automatically delete related ingredients, steps, tags
  db.prepare('DELETE FROM cocktails WHERE is_custom = 0').run();

  for (const c of cocktails) {
    const info = insertCocktail.run(
      c.name, c.name_en, c.category, c.base_spirit, c.flavor,
      c.difficulty, c.glass, c.method, c.garnish, c.story
    );
    const id = info.lastInsertRowid;
    
    c.ingredients.forEach((ing, i) => {
      insertIngredient.run(id, ing.name, ing.amount, ing.unit, i);
    });
    
    c.steps.forEach((step, i) => {
      insertStep.run(id, i + 1, step);
    });
    
    if (c.tags) {
      c.tags.forEach(tag => insertTag.run(id, tag));
    }
  }
});

insertMany();
db.close();
console.log(`🍹 Seeded ${cocktails.length} cocktails`);
