// 1. แยกนับจำนวนหน่วยวัน และ ชม. ที่ไม่จ่ายเงิน สำหรับคิดประกันสังคมโดยเฉพาะ
let ssoWageUnits = 0; // หน่วยวันที่จะนำมาคิดประกันสังคม (ไม่รวมวันนักขัตฤกษ์)
let ssoUnHr = 0;      // ชม. ที่ไม่ได้ค่าจ้างเฉพาะของวันทำงานปกติ/วันลา

days.forEach((day) => {
  const t = day.type;
  const dayUnHr = Math.max(0, day.unpaidHours || 0);

  switch (t) {
    case 'work':
    case 'sick':
    case 'personal':
    case 'annual':
      // วันทำงานปกติและวันลาที่ได้รับค่าจ้าง: นำไปคิดประกันสังคม
      ssoWageUnits += 1;
      ssoUnHr += dayUnHr;
      break;

    case 'pubwork':
    case 'puboff':
      // วันนักขัตฤกษ์: ได้รับค่าแรงตามปกติ แต่ *ไม่นำมาบวก* ใน ssoWageUnits
      break;

    case 'holiday':
    case 'absent':
    case 'unpaid':
    case 'none':
      // วันหยุดสัปดาห์ / ขาดงาน / ลาไม่รับเงิน: ไม่คิดประกันสังคม
      break;
  }
});

// 2. คำนวณยอดค่าแรงที่เป็นฐานคิดประกันสังคม (หัก ชม. ที่ไม่ได้ค่าจ้างของวันปกติออก)
const hourRate = settings.rate / (settings.hours || 8);
const ssoUnpaidCut = Number((ssoUnHr * hourRate).toFixed(2));
const ssoWage = Math.max(0, Number((ssoWageUnits * settings.rate - ssoUnpaidCut).toFixed(2)));

// 3. กำหนดฐานคิดประกันสังคม โดยยกเว้นค่าแรงวันนักขัตฤกษ์
const ssoBaseAmount = settings.ssoBase === 'all'
  ? Math.max(0, Number((ssoWage + extraSum).toFixed(2))) // กรณีคิดรวมรายได้อื่น
  : ssoWage;                                              // กรณีคิดเฉพาะค่าแรงปกติ

// 4. คำนวณยอดเงินหักประกันสังคม (SSO) ตาม % และเพดานที่ตั้งไว้
let sso = Math.round(ssoBaseAmount * ((settings.sso || 0) / 100));
if (settings.ssoCap > 0) {
  sso = Math.min(sso, settings.ssoCap);
}
