// 1. ค่าแรงรายวันปกติ (เช่น 11 วัน × 412 = 4,532.00 ฿) — ยอดนี้เป็นฐานคิดประกันสังคมโดยเฉพาะ
const dailyWage = Math.max(0, Number((ssoWageUnits * settings.rate - ssoUnpaidCut).toFixed(2)));

// 2. ค่าทำงานในวันหยุด 1เท่า (ส่วนเพิ่มเมื่อทำงานวันนักขัตฤกษ์ เช่น 412.00 ฿)
const holidayWorkUnits = pubW * Math.max(0, settings.holMult - 1);
const holidayWorkPay = Number((holidayWorkUnits * settings.rate).toFixed(2));

// 3. ค่าแรงทำงานในวันหยุดประเพณี (1 เท่าของวันหยุดนักขัตฤกษ์ เช่น 412.00 ฿)
const pubHolidayUnits = pubW + pubO;
const pubHolidayPay = Math.max(0, Number((pubHolidayUnits * settings.rate - pubUnpaidCut).toFixed(2)));

// ยอดรวมค่าแรงทั้งหมด (เช่น 4,532 + 412 + 412 = 5,356.00 ฿)
const wage = Math.max(0, Number((dailyWage + holidayWorkPay + pubHolidayPay).toFixed(2)));
const pubWage = Number((holidayWorkPay + pubHolidayPay).toFixed(2));

// รวมรายได้ทั้งหมด (รวมเงินพิเศษอื่นๆ ถ้ามี)
const gross = Number((wage + extraSum).toFixed(2));

// 🎯 ฐานคิดประกันสังคม: หักจากยอดค่าแรงรายวันปกติเท่านั้น (4,532.00 ฿) ไม่ใช่ยอดรวม 5,356.00 ฿
const ssoBaseAmount = settings.ssoBase === 'all'
  ? Math.max(0, Number((dailyWage + extraSum).toFixed(2)))
  : dailyWage;

// คำนวณประกันสังคม 5% (4,532 × 0.05 = 226.6 → ปัดเป็น 227.00 ฿)
let sso = Math.round(ssoBaseAmount * ((settings.sso || 0) / 100));
if (settings.ssoCap > 0) {
  sso = Math.min(sso, settings.ssoCap);
}

const net = Number((gross - ded).toFixed(2));
