import { initThemeSwitch, initLangSwitch } from './settings.js';

class PaletteGenerator {
    constructor() {
        this.refreshBtn = document.querySelector('.refresh-btn');
        this.paletteContainer = document.querySelector('.palette-container');
        
        this.recommendedPalettes = {
            academic: [
                // 基础学术配色
                ['#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6'],
                ['#1B263B', '#415A77', '#778DA9', '#E0E1DD', '#FFFFFF'],
                ['#14213D', '#455E89', '#A8DADC', '#E9ECEF', '#FFFFFF'],
                
                // Nature风格配色
                ['#2A4858', '#557B94', '#82A5BE', '#B8D0E6', '#FFFFFF'],
                ['#1A365D', '#3C6997', '#7DB0D5', '#BED8EB', '#FFFFFF'],
                ['#27374D', '#526D82', '#9DB2BF', '#DDE6ED', '#FFFFFF'],
                ['#053B50', '#176B87', '#64CCC5', '#EEEEEE', '#FFFFFF'],
                ['#040D12', '#183D3D', '#5C8374', '#93B1A6', '#FFFFFF'],
                ['#22092C', '#872341', '#BE3144', '#F05941', '#FFFFFF'],
                ['#0C2D57', '#1A5D1A', '#C1D8C3', '#E9F5E9', '#FFFFFF'],
                
                // Science风格配色
                ['#012A4A', '#013A63', '#01497C', '#014F86', '#FFFFFF'],
                ['#2C3333', '#2E4F4F', '#0E8388', '#CBE4DE', '#FFFFFF'],
                ['#1F4172', '#3A6B35', '#CBD5E1', '#F8F9FA', '#FFFFFF'],
                ['#0A2647', '#144272', '#205295', '#2C74B3', '#FFFFFF'],
                ['#0F0F0F', '#232D3F', '#005B41', '#008170', '#FFFFFF'],
                
                // 数据可视化配色
                ['#003F5C', '#58508D', '#BC5090', '#FF6361', '#FFFFFF'],
                ['#045275', '#089099', '#7CCBA2', '#FCDE9C', '#FFFFFF'],
                ['#033F63', '#28666E', '#7C9885', '#B5B682', '#FFFFFF'],
                ['#374955', '#5C8374', '#9EC8B9', '#F1F0E8', '#FFFFFF'],
                ['#1D5B79', '#468B97', '#EF6262', '#F3AA60', '#FFFFFF'],

                // 医学期刊风格
                ['#16123F', '#1B3358', '#3D5A80', '#98C1D9', '#FFFFFF'],
                ['#142850', '#27496D', '#0C7B93', '#00A8CC', '#FFFFFF'],
                ['#11324D', '#164B60', '#1B6B93', '#4FC0D0', '#FFFFFF'],
                ['#0D1282', '#2F52A2', '#2C3333', '#A5C9CA', '#FFFFFF'],
                ['#19376D', '#576CBC', '#A5D7E8', '#0B2447', '#FFFFFF'],

                // 生物学配色
                ['#2B3467', '#1A5D1A', '#BAD7E9', '#FCFFE7', '#FFFFFF'],
                ['#0E2954', '#1F6E8C', '#84A7A1', '#FFFFFF', '#E0F4FF'],
                ['#2D4356', '#435B66', '#A76F6F', '#EAB2A0', '#FFFFFF'],
                ['#0F2167', '#0D1282', '#3085C3', '#7BC2E4', '#FFFFFF'],
                ['#164863', '#427D9D', '#9BBEC8', '#DDF2FD', '#FFFFFF'],

                // 物理学配色
                ['#070F2B', '#1B1A55', '#535C91', '#9290C3', '#FFFFFF'],
                ['#352F44', '#5C5470', '#B9B4C7', '#FAF0E6', '#FFFFFF'],
                ['#1D267D', '#5C469C', '#A4D0A4', '#F5F5F5', '#FFFFFF'],
                ['#27005D', '#4B0082', '#9400D3', '#E0B0FF', '#FFFFFF'],
                ['#1A120B', '#3C2A21', '#D5CEA3', '#E5E5CB', '#FFFFFF'],

                // 化学配色
                ['#040303', '#461111', '#A13333', '#B3541E', '#FFFFFF'],
                ['#54B435', '#379237', '#2B2A4C', '#F4E869', '#FFFFFF'],
                ['#793FDF', '#7091F5', '#97FFF4', '#FFFFFF', '#EEFFF7'],
                ['#451952', '#662549', '#AE445A', '#F39F5A', '#FFFFFF'],
                ['#451952', '#662549', '#AE445A', '#F39F5A', '#FFFFFF'],

                // 地球科学配色
                ['#2C3639', '#3F4E4F', '#A27B5C', '#DCD7C9', '#FFFFFF'],
                ['#2C3333', '#395B64', '#A5C9CA', '#E7F6F2', '#FFFFFF'],
                ['#354259', '#6D8299', '#9BA4B5', '#CDC2AE', '#F2D7D9'],
                ['#293462', '#1CD6CE', '#FEDB39', '#D61C4E', '#FFFFFF'],
                ['#1A374D', '#406882', '#6998AB', '#B1D0E0', '#FFFFFF'],

                // Nature补充配色
                ['#003F5C', '#444E86', '#955196', '#DD5182', '#FFFFFF'],
                ['#21364B', '#4A6F8A', '#87A4B9', '#C4D7E7', '#FFFFFF'],
                ['#1F456E', '#3A6EA5', '#6898D0', '#9FC3E7', '#FFFFFF'],
                ['#0B3954', '#087E8B', '#BFD7EA', '#FF5A5F', '#FFFFFF'],
                ['#1B4965', '#62B6CB', '#BEE9E8', '#CAE9FF', '#FFFFFF'],
                
                // Science补充配色
                ['#003459', '#00171F', '#007EA7', '#00A8E8', '#FFFFFF'],
                ['#2C5F2D', '#97BC62', '#D5F5E3', '#E8F8F5', '#FFFFFF'],
                ['#184E77', '#1E6091', '#1A759F', '#168AAD', '#FFFFFF'],
                ['#00296B', '#003F88', '#00509D', '#0066CC', '#FFFFFF'],
                ['#00043C', '#005BC5', '#8E8CD8', '#DBCBD8', '#FFFFFF'],

                // 添加更多学术配色
                ['#2C3E50', '#34495E', '#ECF0F1', '#BDC3C7', '#FFFFFF'],
                ['#1A5276', '#2874A6', '#AED6F1', '#EBF5FB', '#FFFFFF'],
                ['#145A32', '#196F3D', '#A9DFBF', '#E9F7EF', '#FFFFFF'],
                ['#641E16', '#922B21', '#F5B7B1', '#FDEDEC', '#FFFFFF'],
                ['#4A235A', '#6C3483', '#D2B4DE', '#F4ECF7', '#FFFFFF'],
                ['#154360', '#1F618D', '#5DADE2', '#D6EAF8', '#FFFFFF'],
                ['#0E6655', '#148F77', '#76D7C4', '#E8F8F5', '#FFFFFF'],
                ['#7D6608', '#9A7D0A', '#F9E79F', '#FEF9E7', '#FFFFFF'],

                // 新增学术配色方案 (10个)
                ['#003049', '#D62828', '#F77F00', '#FCBF49', '#EAE2B7'],
                ['#1D3557', '#457B9D', '#A8DADC', '#F1FAEE', '#E63946'],
                ['#081C15', '#1B4332', '#2D6A4F', '#40916C', '#52B788'],
                ['#132A13', '#31572C', '#4F772D', '#90A955', '#ECF39E'],
                ['#03071E', '#370617', '#6A040F', '#9D0208', '#D00000'],
                ['#10002B', '#240046', '#3C096C', '#5A189A', '#7B2CBF'],
                ['#590D22', '#800F2F', '#A4133C', '#C9184A', '#FF4D6D'],
                ['#012A4A', '#013A63', '#01497C', '#014F86', '#2A6F97'],
                ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#D90429'],
                ['#582F0E', '#7F4F24', '#936639', '#A68A64', '#B6AD90'],

                // 新增专业学术配色 (15个)
                ['#0A1128', '#001F54', '#034078', '#1282A2', '#FEFCFB'],
                ['#1A2238', '#9DAAF2', '#FF6A3D', '#F4DB7D', '#FFFFFF'],
                ['#334257', '#476072', '#548CA8', '#EEEEEE', '#FFFFFF'],
                ['#1C1427', '#40394A', '#7ECA9C', '#CCFFBD', '#FFFFFF'],
                ['#1B1A17', '#F0A500', '#E45826', '#E6D5B8', '#FFFFFF'],
                ['#2C3333', '#395B64', '#A5C9CA', '#E7F6F2', '#FFFFFF'],
                ['#2D4263', '#C84B31', '#ECDBBA', '#191919', '#FFFFFF'],
                ['#1B262C', '#0F4C75', '#3282B8', '#BBE1FA', '#FFFFFF'],
                ['#142F43', '#FFAB4C', '#FF5F7E', '#B000B9', '#FFFFFF'],
                ['#22577A', '#38A3A5', '#57CC99', '#80ED99', '#FFFFFF'],
                ['#003865', '#EF5B0C', '#D4F6CC', '#3CCF4E', '#FFFFFF'],
                ['#2D132C', '#801336', '#C72C41', '#EE4540', '#FFFFFF'],
                ['#006E7F', '#F8CB2E', '#EE5007', '#B22727', '#FFFFFF'],
                ['#1F441E', '#688F4E', '#BFCC94', '#F2F4C0', '#FFFFFF'],
                ['#1D5C63', '#417D7A', '#EDE6DB', '#1D5C63', '#FFFFFF']
            ],
            cool: [
                ['#4ECDC4', '#45B7D1', '#96CEB4', '#88D8B0', '#BEDCFE'],
                ['#006D77', '#83C5BE', '#EDF6F9', '#B8E1DD', '#A4C3B2'],
                ['#084C61', '#4F6D7A', '#56A3A6', '#9DC7C8', '#DBE9EE'],
                ['#BDE0FE', '#A2D2FF', '#CDB4DB', '#B8C0FF', '#98C1D9'],
                ['#48CAE4', '#90E0EF', '#ADE8F4', '#CAF0F8', '#03045E'],
                ['#8ECAE6', '#219EBC', '#023047', '#126782', '#A9D6E5'],
                ['#95B8D1', '#B8E0D2', '#D8E2DC', '#EAE4E9', '#FFF1E6'],
                ['#A4C3B2', '#CCE3DE', '#EAF4F4', '#F6FFF8', '#FCF6F5'],
                ['#E0FBFC', '#C2DFE3', '#9DB4C0', '#5C6B73', '#253237'],
                ['#CADBEA', '#B5C9D5', '#9FB7C9', '#8AA5BC', '#7593AF'],

                // 补充配色
                ['#89C2D9', '#61A5C2', '#468FAF', '#2C7DA0', '#FFFFFF'],
                ['#A9D6E5', '#89C2D9', '#61A5C2', '#2A6F97', '#FFFFFF'],
                ['#B8E1FF', '#9CCDDC', '#82B3C9', '#6C98B0', '#FFFFFF'],
                ['#012A4A', '#013A63', '#01497C', '#014F86', '#FFFFFF'],
                ['#48CAE4', '#90E0EF', '#ADE8F4', '#CAF0F8', '#FFFFFF'],

                // 添加更多清新配色
                ['#AEDFF7', '#C3E8F8', '#D8F1F9', '#EDFAFF', '#F0F8FF'],
                ['#A1DAD7', '#B5E2E0', '#C9EAE9', '#DDF2F2', '#F0FFFF'],
                ['#A2D5F2', '#B6E0F7', '#C9EBFB', '#DDFAFF', '#F0FFFF'],
                ['#A0E4CB', '#B4EBD6', '#C8F2E1', '#DCFAEC', '#F0FFF7'],
                ['#9EDDFF', '#B2E5FF', '#C6EDFF', '#DAFAFF', '#EEFAFF'],
                ['#97C4B8', '#ABD1C9', '#BFDEDA', '#D3EBEB', '#E7F7FC'],
                ['#9ED2BE', '#B2DEC9', '#C6EAD4', '#DAF6DF', '#EEFFEA'],
                ['#9ADCFF', '#AEE4FF', '#C2ECFF', '#D6F4FF', '#EAFCFF'],

                // 新增清新配色方案 (12个)
                ['#CDDAFD', '#DFE7FD', '#F0F4FF', '#FFFFFF', '#E2EAFC'],
                ['#BDE0FE', '#A2D2FF', '#CDB4DB', '#FFC8DD', '#FFAFCC'],
                ['#CDF0EA', '#F9F9F9', '#F6C6EA', '#C490E4', '#B8B5FF'],
                ['#D8E2DC', '#FFE5D9', '#FFCAD4', '#F4ACB7', '#9D8189'],
                ['#E0FFFF', '#CCFFFF', '#99FFFF', '#66FFFF', '#33FFFF'],
                ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA'],
                ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6'],
                ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A'],
                ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65'],
                ['#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157'],
                ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58'],
                ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28'],

                // 新增高级清新配色 (15个)
                ['#DDFFE7', '#C3E5AE', '#99D492', '#74C67A', '#56B870'],
                ['#E3F6F5', '#BAE8E8', '#2C698D', '#272643', '#FFFFFF'],
                ['#E0F2FE', '#BAE6FD', '#7DD3FC', '#38BDF8', '#0EA5E9'],
                ['#F0F9FF', '#E0F2FE', '#BAE6FD', '#7DD3FC', '#38BDF8'],
                ['#ECFEFF', '#CFFAFE', '#A5F3FC', '#67E8F9', '#22D3EE'],
                ['#F0FDFA', '#CCFBF1', '#99F6E4', '#5EEAD4', '#2DD4BF'],
                ['#EFFDF5', '#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399'],
                ['#F0FDF4', '#DCFCE7', '#BBF7D0', '#86EFAC', '#4ADE80'],
                ['#F7FEE7', '#ECFCCB', '#D9F99D', '#BEF264', '#A3E635'],
                ['#FEFCE8', '#FEF9C3', '#FEF08A', '#FDE047', '#FACC15'],
                ['#FFFBEB', '#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24'],
                ['#FFF7ED', '#FFEDD5', '#FED7AA', '#FDBA74', '#FB923C'],
                ['#FFEDD5', '#FED7AA', '#FDBA74', '#FB923C', '#F97316'],
                ['#FFF1F2', '#FFE4E6', '#FECDD3', '#FDA4AF', '#FB7185'],
                ['#FDF2F8', '#FCE7F3', '#FBCFE8', '#F9A8D4', '#F472B6']
            ],
            elegant: [
                ['#2D3047', '#93B7BE', '#E0CA3C', '#A799B7', '#048BA8'],
                ['#22223B', '#4A4E69', '#9A8C98', '#C9ADA7', '#F2E9E4'],
                ['#355070', '#6D597A', '#B56576', '#E56B6F', '#EAAC8B'],
                ['#3D405B', '#81B29A', '#F2CC8F', '#E07A5F', '#F4F1DE'],
                ['#594157', '#726DA8', '#7D8CC4', '#A0D2DB', '#BEE7E8'],
                ['#4A4E69', '#9A8C98', '#C9ADA7', '#F2E9E4', '#9A8C98'],
                ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#FFFFFF'],
                ['#1A1A1D', '#4E4E50', '#6F2232', '#950740', '#C3073F'],
                ['#2F4550', '#586F7C', '#B8DBD9', '#F4F4F9', '#586F7C'],
                ['#5C6B73', '#9DB4C0', '#C2DFE3', '#E0FBFC', '#253237'],

                // 补充配色
                ['#2F3E46', '#354F52', '#52796F', '#84A98C', '#FFFFFF'],
                ['#1B1B1E', '#373F51', '#58A4B0', '#A9BCD0', '#FFFFFF'],
                ['#2D3142', '#4F5D75', '#BFC0C0', '#FFFFFF', '#EF8354'],
                ['#2D3142', '#4F5D75', '#BFC0C0', '#FFFFFF', '#EF8354'],

                // 添加更多优雅配色
                ['#2C3333', '#395B64', '#A5C9CA', '#E7F6F2', '#FFFFFF'],
                ['#1A1A2E', '#16213E', '#0F3460', '#E94560', '#FFFFFF'],
                ['#222831', '#393E46', '#00ADB5', '#EEEEEE', '#FFFFFF'],
                ['#2C3639', '#3F4E4F', '#A27B5C', '#DCD7C9', '#FFFFFF'],
                ['#1B262C', '#0F4C75', '#3282B8', '#BBE1FA', '#FFFFFF'],
                ['#2D4059', '#EA5455', '#F07B3F', '#FFD460', '#FFFFFF'],
                ['#2B2E4A', '#E84545', '#903749', '#53354A', '#FFFFFF'],
                ['#30475E', '#F05454', '#121212', '#F5F5F5', '#FFFFFF'],

                // 新增优雅配色方案 (12个)
                ['#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD'],
                ['#212529', '#343A40', '#495057', '#6C757D', '#ADB5BD'],
                ['#EDEDE9', '#D6CCC2', '#F5EBE0', '#E3D5CA', '#D5BDAF'],
                ['#161A1D', '#0B090A', '#660708', '#A4161A', '#BA181B'],
                ['#F8F9FA', '#E9ECEF', '#6C757D', '#343A40', '#212529'],
                ['#F8F9FA', '#CED4DA', '#6C757D', '#343A40', '#212529'],
                ['#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#212529'],
                ['#FFFFFF', '#F1F3F5', '#E9ECEF', '#DEE2E6', '#212529'],
                ['#F0F0F0', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#616161'],
                ['#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#212121'],
                ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#607D8B'],
                ['#FAFBFB', '#F5F6F7', '#EBECED', '#D8DCDF', '#C8CDD0'],

                // 新增高端优雅配色 (15个)
                ['#0F0E0E', '#541212', '#8B9A46', '#EEEEEE', '#FFFFFF'],
                ['#1A1A2E', '#16213E', '#0F3460', '#E94560', '#FFFFFF'],
                ['#222831', '#393E46', '#00ADB5', '#EEEEEE', '#FFFFFF'],
                ['#2C3639', '#3F4E4F', '#A27B5C', '#DCD7C9', '#FFFFFF'],
                ['#1B262C', '#0F4C75', '#3282B8', '#BBE1FA', '#FFFFFF'],
                ['#2D4059', '#EA5455', '#F07B3F', '#FFD460', '#FFFFFF'],
                ['#2B2E4A', '#E84545', '#903749', '#53354A', '#FFFFFF'],
                ['#30475E', '#F05454', '#121212', '#F5F5F5', '#FFFFFF'],
                ['#0B0C10', '#1F2833', '#C5C6C7', '#66FCF1', '#45A29E'],
                ['#2E3840', '#4E6E81', '#F9DBBB', '#FF0303', '#FFFFFF'],
                ['#100F0F', '#0F3D3E', '#E2DCC8', '#F1F1F1', '#FFFFFF'],
                ['#100720', '#31087B', '#FA2FB5', '#FFC23C', '#FFFFFF'],
                ['#1D1D1F', '#313132', '#898989', '#F5F5F7', '#FFFFFF'],
                ['#000000', '#14213D', '#FCA311', '#E5E5E5', '#FFFFFF'],
                ['#0F044C', '#141E61', '#787A91', '#EEEEEE', '#FFFFFF']
            ],
            warm: [
                ['#FF6B6B', '#FFA07A', '#FFB6C1', '#FFA500', '#FFD700'],
                ['#E76F51', '#F4A261', '#E9C46A', '#FFB4A2', '#FFCDB2'],
                ['#FF9F1C', '#FFBF69', '#FFD93D', '#FF8C42', '#FF665A'],
                ['#D4A373', '#FAEDCD', '#FEFAE0', '#E9EDC9', '#CCD5AE'],
                ['#FFB5A7', '#FCD5CE', '#F8EDEB', '#F9DCC4', '#FEC89A'],
                ['#CB997E', '#DDBEA9', '#FFE8D6', '#B7B7A4', '#A5A58D'],
                ['#E07A5F', '#F2CC8F', '#F4F1DE', '#F8EDEB', '#FEC5BB'],
                ['#FFE5D9', '#FFD7BA', '#FEC89A', '#FEC5BB', '#FFB5A7'],
                ['#FFB4A2', '#E5989B', '#B5838D', '#FFCDB2', '#FFB4A2'],
                ['#F6BD60', '#F7EDE2', '#F5CAC3', '#F28482', '#84A59D'],

                // 补充配色
                ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#FFFFFF'],
                ['#FF7B00', '#FF8800', '#FF9500', '#FFA200', '#FFFFFF'],
                ['#FF595E', '#FF7C65', '#FF9E6D', '#FFBF75', '#FFFFFF'],
                ['#FF6B6B', '#FF8585', '#FF9E9E', '#FFB7B7', '#FFFFFF'],
                ['#FFB4A2', '#FFCDB2', '#FFE5D9', '#FFF1E6', '#FFFFFF'],

                // 添加更多温暖配色
                ['#F9ED69', '#F08A5D', '#B83B5E', '#6A2C70', '#FFFFFF'],
                ['#F9C80E', '#F86624', '#EA3546', '#662E9B', '#FFFFFF'],
                ['#FFCB91', '#FFEFA1', '#94EBCD', '#6DDCCF', '#FFFFFF'],
                ['#FFAC81', '#FF928B', '#FEC3A6', '#EFE9AE', '#FFFFFF'],
                ['#FFB6B9', '#FAE3D9', '#BBDED6', '#8AC6D1', '#FFFFFF'],
                ['#FFBBCC', '#FFCCDD', '#FFDDEE', '#FFEEFF', '#FFFFFF'],
                ['#FFBE7B', '#FFD98E', '#FFF4A1', '#FFFCB4', '#FFFFFF'],
                ['#FFCBA4', '#FFD8B8', '#FFE5CC', '#FFF2E0', '#FFFFFF'],

                // 新增温暖配色方案 (12个)
                ['#FFCDB2', '#FFB4A2', '#E5989B', '#B5838D', '#6D6875'],
                ['#CB997E', '#DDBEA9', '#FFE8D6', '#B7B7A4', '#A5A58D'],
                ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF'],
                ['#FFCBF2', '#F3C4FB', '#ECBCFD', '#E5B3FE', '#E2AFFF'],
                ['#FEC5BB', '#FCD5CE', '#FAE1DD', '#F8EDEB', '#F9DCC4'],
                ['#FFF1E6', '#F8EDEB', '#E8E8E4', '#D8E2DC', '#ECE4DB'],
                ['#F4F1DE', '#E6B89C', '#ED9B40', '#F15025', '#9A8C98'],
                ['#FADDE1', '#FFC4D6', '#FFA6C1', '#FF87AB', '#FF5D8F'],
                ['#FFF0F3', '#FFCCD5', '#FFB3C6', '#FF8FAB', '#FB6F92'],
                ['#FFEDD8', '#F3D5B5', '#E7BC91', '#D4A276', '#BC8A5F'],
                ['#EDDCD2', '#FFF1E6', '#FAD2E1', '#C5DEDD', '#DBE7E4'],
                ['#F0EAD2', '#DDE5B6', '#ADC178', '#A98467', '#6C584C'],

                // 新增专业温暖配色 (15个)
                ['#FFF8EA', '#F8EAD8', '#EDDBC7', '#E3CAA5', '#CEAB93'],
                ['#FFE6C7', '#FFC5A8', '#FF8C8C', '#FF5D5D', '#FF0000'],
                ['#FFF6BD', '#FFEBAD', '#FFE39B', '#FFD485', '#FFC55C'],
                ['#FFEECC', '#FFDDA1', '#FFCC75', '#FFBB4C', '#FFAA33'],
                ['#FFF3E2', '#FFE5CA', '#FA9884', '#E74646', '#FFFFFF'],
                ['#F9F5EB', '#E4DCCF', '#EA5455', '#002B5B', '#FFFFFF'],
                ['#F5EBE0', '#E3D5CA', '#D5BDAF', '#C8B6A6', '#A27B5C'],
                ['#FFF5E4', '#FFE3E1', '#FFD1D1', '#FF9494', '#FFFFFF'],
                ['#FEFCF3', '#F5EBE0', '#F0DBDB', '#DBA39A', '#FFFFFF'],
                ['#F9F7F7', '#DBE2EF', '#3F72AF', '#112D4E', '#FFFFFF'],
                ['#F8EDE3', '#DFD3C3', '#D0B8A8', '#7D6E83', '#FFFFFF'],
                ['#F7EDDB', '#DAC0A3', '#EABA6B', '#0F2C59', '#FFFFFF'],
                ['#FFF4E0', '#FFBF9B', '#B46060', '#4D4D4D', '#FFFFFF'],
                ['#FFFAD7', '#FFE4C0', '#FFCAAD', '#F4978E', '#F08080'],
                ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28']
            ],
            vibrant: [
                ['#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D'],
                ['#577590', '#43AA8B', '#90BE6D', '#F9C74F', '#F94144'],
                ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
                ['#FF0A54', '#FF477E', '#FF5C8A', '#FF7096', '#FF85A1'],
                ['#7400B8', '#6930C3', '#5E60CE', '#5390D9', '#4EA8DE'],
                ['#540B0E', '#9E2A2B', '#E09F3E', '#FFF3B0', '#335C67'],
                ['#FF0075', '#172774', '#77D970', '#FDFF00', '#0C134F'],
                ['#FF0000', '#FF8700', '#FFE400', '#00FF8C', '#00E0FF'],
                ['#FF449F', '#FF7BA2', '#FFB5A4', '#FFE5A7', '#FFF9AA'],
                ['#FF006E', '#FB5607', '#FF3357', '#8338EC', '#3A86FF'],

                // 补充配色
                ['#FF0000', '#FF8700', '#FFE400', '#00FF8C', '#FFFFFF'],
                ['#9B5DE5', '#F15BB5', '#FEE440', '#00BBF9', '#FFFFFF'],
                ['#FF006E', '#FB5607', '#FF3357', '#8338EC', '#FFFFFF'],
                ['#FF5400', '#FF6D00', '#FF8500', '#FF9E00', '#FFFFFF'],
                ['#FF0075', '#172774', '#77D970', '#FDFF00', '#FFFFFF'],

                // 添加更多活力配色
                ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#FFFFFF'],
                ['#FF00FF', '#FF00CC', '#CC00FF', '#7F00FF', '#FFFFFF'],
                ['#FF1E56', '#FFAC41', '#E8D21D', '#039590', '#FFFFFF'],
                ['#FF00A0', '#FE75FE', '#7A04EB', '#120458', '#FFFFFF'],
                ['#FF165D', '#FF9A00', '#F6F7D7', '#3EC1D3', '#FFFFFF'],
                ['#FF9671', '#FFC75F', '#F9F871', '#00C9A7', '#FFFFFF'],
                ['#FF5F40', '#FF9E9D', '#FFCDAB', '#78C4D4', '#FFFFFF'],
                ['#FF0075', '#F640FF', '#00FFFF', '#00FF9F', '#FFFFFF'],

                // 新增活力配色方案 (15个)
                ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
                ['#FF355E', '#FF5A36', '#FF9933', '#FFCC33', '#FFFF66'],
                ['#FF00CC', '#CC00FF', '#7F00FF', '#0000FF', '#00FFFF'],
                ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF'],
                ['#FF1493', '#FF00FF', '#8A2BE2', '#4B0082', '#00BFFF'],
                ['#FF0000', '#FF4500', '#FF8C00', '#FFA500', '#FFD700'],
                ['#FF3131', '#FF5E5E', '#FF8A8A', '#FFB6B6', '#FFE2E2'],
                ['#FF00FF', '#FF33FF', '#FF66FF', '#FF99FF', '#FFCCFF'],
                ['#00FFFF', '#33FFFF', '#66FFFF', '#99FFFF', '#CCFFFF'],
                ['#00FF00', '#33FF33', '#66FF66', '#99FF99', '#CCFFCC'],
                ['#FFFF00', '#FFFF33', '#FFFF66', '#FFFF99', '#FFFFCC'],
                ['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC'],
                ['#FF00BF', '#FF40DF', '#FF80FF', '#FFC0FF', '#FFFFFF'],
                ['#00FFBF', '#40FFDF', '#80FFFF', '#C0FFFF', '#FFFFFF'],
                ['#BFFF00', '#DFFF40', '#FFFF80', '#FFFFC0', '#FFFFFF'],

                // 新增高级活力配色 (15个)
                ['#7400B8', '#6930C3', '#5E60CE', '#5390D9', '#4EA8DE'],
                ['#390099', '#9E0059', '#FF0054', '#FF5400', '#FFBD00'],
                ['#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'],
                ['#D100D1', '#84FB95', '#00ADB5', '#006E7F', '#F8CB2E'],
                ['#FF0075', '#172774', '#77D970', '#FDFF00', '#0C134F'],
                ['#FF0000', '#FF8700', '#FFE400', '#00FF8C', '#00E0FF'],
                ['#FF449F', '#FF7BA2', '#FFB5A4', '#FFE5A7', '#FFF9AA'],
                ['#FF006E', '#FB5607', '#FF3357', '#8338EC', '#3A86FF'],
                ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'],
                ['#FF0054', '#FF5400', '#FFBD00', '#75D701', '#03DDDC'],
                ['#FF00FF', '#00FFFF', '#FFFF00', '#00FF00', '#FF0000'],
                ['#FF00A0', '#FE75FE', '#7A04EB', '#120458', '#FFFFFF'],
                ['#FF165D', '#FF9A00', '#F6F7D7', '#3EC1D3', '#FFFFFF'],
                ['#FF9671', '#FFC75F', '#F9F871', '#00C9A7', '#FFFFFF'],
                ['#FF5F40', '#FF9E9D', '#FFCDAB', '#78C4D4', '#FFFFFF']
            ]
        };
        
        this.currentStyle = 'all';
        this.currentFormat = 'hex';
        this.setupEventListeners();
        this.generatePalettes();
        
        // 获取当前语言
        this.currentLang = localStorage.getItem('language') || 'zh';
        this.translations = getTranslations();
    }
    
    setupEventListeners() {
        this.refreshBtn.addEventListener('click', () => {
            this.refreshBtn.classList.add('rotating');
            this.generatePalettes();
            setTimeout(() => {
                this.refreshBtn.classList.remove('rotating');
            }, 300);
        });

        // 添加风格切换事件监听
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentStyle = btn.dataset.style;
                this.generatePalettes();
            });
        });

        // 修改颜色格式切换事件监听
        document.querySelectorAll('.format-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFormat = btn.dataset.format;
                this.updateColorFormats(); // 只更新颜色格式显示
            });
        });
    }
    
    convertColor(hexColor) {
        // 从HEX转换到其他格式
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        switch (this.currentFormat) {
            case 'rgb':
                return `rgb(${r}, ${g}, ${b})`;
            case 'hsl':
                const [h, s, l] = this.rgbToHsl(r, g, b);
                return `hsl(${Math.round(h)}°, ${Math.round(s)}%, ${Math.round(l)}%)`;
            default:
                return hexColor.toUpperCase();
        }
    }
    
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            
            h *= 60;
        }
        
        return [h, s * 100, l * 100];
    }
    
    generatePalettes() {
        // 调整显示的配色方案数量为16个（4*4网格）
        const selectedPalettes = this.getRandomPalettes(16);
        
        const palettes = selectedPalettes.map(colors => {
            return `
                <div class="palette-card">
                    <div class="color-strip">
                        ${colors.map(color => `
                            <div class="color-block" style="background-color: ${color}">
                                <span class="color-value">${this.convertColor(color)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="palette-actions">
                        <button class="copy-btn" title="复制色值">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="like-btn" title="收藏">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.paletteContainer.innerHTML = palettes;
        this.setupPaletteInteractions();
    }
    
    getRandomPalettes(count) {
        let availablePalettes;
        if (this.currentStyle === 'all') {
            // 从所有分类中获取配色方案
            availablePalettes = Object.values(this.recommendedPalettes).flat();
        } else {
            availablePalettes = this.recommendedPalettes[this.currentStyle];
        }
        
        // 使用 Set 来存储已选择的配色方案的字符串表示，用于去重
        const selectedSet = new Set();
        const result = [];
        
        // Fisher-Yates 洗牌算法
        const shuffled = [...availablePalettes];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // 选择不重复的配色方案
        for (const palette of shuffled) {
            const paletteStr = JSON.stringify(palette);
            if (!selectedSet.has(paletteStr) && result.length < count) {
                selectedSet.add(paletteStr);
                result.push(palette);
            }
        }
        
        // 如果不够数量，说明当前分类的配色方案总数不足
        if (result.length < count) {
            console.warn(`Warning: Not enough unique palettes in current style (${this.currentStyle}). 
                Available: ${availablePalettes.length}, Requested: ${count}`);
        }
        
        return result;
    }

    setupPaletteInteractions() {
        // 复制整个配色方案功能
        this.paletteContainer.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const colors = Array.from(
                    e.target.closest('.palette-card').querySelectorAll('.color-value')
                ).map(span => span.textContent);
                
                navigator.clipboard.writeText(colors.join(', ')).then(() => {
                    this.showToast('所有颜色已复制到剪贴板');
                });
            });
        });

        // 单个色块点击复制功能
        this.paletteContainer.querySelectorAll('.color-block').forEach(block => {
            block.addEventListener('click', (e) => {
                const colorValue = e.currentTarget.querySelector('.color-value').textContent;
                navigator.clipboard.writeText(colorValue).then(() => {
                    this.showToast(`颜色代码 ${colorValue} 已复制`);
                });
            });
        });

        // 收藏功能
        this.paletteContainer.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const icon = btn.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
            });
        });
    }

    showToast(message) {
        // 移除现有的提示框
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // 添加动画效果
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // 自动消失
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // 新增方法：只更新颜色格式显示
    updateColorFormats() {
        this.paletteContainer.querySelectorAll('.color-block').forEach(block => {
            const color = block.style.backgroundColor;
            const hexColor = this.rgbToHex(color);
            const colorValue = block.querySelector('.color-value');
            colorValue.textContent = this.convertColor(hexColor);
        });
    }

    // 新增方法：将 RGB 转换为 HEX
    rgbToHex(rgb) {
        // 处理 rgb(r, g, b) 格式
        const values = rgb.match(/\d+/g);
        if (!values) return '#000000';
        
        const r = parseInt(values[0]);
        const g = parseInt(values[1]);
        const b = parseInt(values[2]);
        
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    // 更新颜色信息显示
    updateColorInfo(hue, saturation, brightness) {
        const t = this.translations[this.currentLang].theory.colorInfo;
        document.querySelector('.hue-value').textContent = `${Math.round(hue)}°`;
        document.querySelector('.saturation-value').textContent = `${Math.round(saturation)}%`;
        document.querySelector('.brightness-value').textContent = `${Math.round(brightness)}%`;
    }
}

// 初始化
function init() {
    initThemeSwitch();
    initLangSwitch();
    new PaletteGenerator();
}

document.addEventListener('DOMContentLoaded', init); 