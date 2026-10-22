<div className="divide-y divide-slate-800/50">
  {/* 1. ค่าแรงรายวัน */}
  <div className="p-3 flex items-start justify-between gap-3">
    <div>
      <span className="font-semibold text-slate-200">ค่าแรงรายวัน</span>
      <p className="text-[11px] text-slate-400 mt-0.5">
        คิดเป็น {stats.ssoWageUnits ?? stats.work} วัน × {formatMoney(settings.rate)} ฿
        <span className="text-emerald-400 font-medium"> (ฐานคิดประกันสังคม)</span>
      </p>
    </div>
    <span className="font-mono font-bold text-slate-200 text-sm">
      {formatMoney(record.dailyWage ?? wage)}
    </span>
  </div>

  {/* 2. ค่าทำงานในวันหยุด 1เท่า */}
  {(record.holidayWorkPay || 0) > 0 && (
    <div className="p-3 flex items-start justify-between gap-3 bg-amber-500/5">
      <div>
        <span className="font-semibold text-amber-300">
          ค่าทำงานในวันหยุด {settings.holMult > 1 ? `${settings.holMult - 1}เท่า` : ''}
        </span>
        <p className="text-[11px] text-slate-400 mt-0.5">
          ทำงานวันหยุดนักขัตฤกษ์ {stats.pubW} วัน (ไม่คิดประกันสังคม)
        </p>
      </div>
      <span className="font-mono font-semibold text-amber-300 text-sm">
        {formatMoney(record.holidayWorkPay)}
      </span>
    </div>
  )}

  {/* 3. ค่าแรงทำงานในวันหยุดประเพณี */}
  {(record.pubHolidayPay || 0) > 0 && (
    <div className="p-3 flex items-start justify-between gap-3 bg-amber-500/5">
      <div>
        <span className="font-semibold text-amber-200">ค่าแรงทำงานในวันหยุดประเพณี</span>
        <p className="text-[11px] text-slate-400 mt-0.5">
          วันหยุดตามประเพณี {stats.pubW + stats.pubO} วัน × 1 เท่า (ไม่คิดประกันสังคม)
        </p>
      </div>
      <span className="font-mono font-semibold text-amber-200 text-sm">
        {formatMoney(record.pubHolidayPay)}
      </span>
    </div>
  )}

  {/* ยอดรวมรายได้ */}
  <div className="p-3 flex items-center justify-between font-bold text-sm">
    <span>รวมรายได้</span>
    <span className="font-mono text-emerald-400">{formatMoney(gross)}</span>
  </div>
</div>

{/* รายการหัก: ประกันสังคม */}
<div className="p-3 flex items-start justify-between gap-3">
  <div>
    <span className="font-semibold text-slate-200">ประกันสังคม ({settings.sso}%)</span>
    <p className="text-[11px] text-slate-400 mt-0.5">
      ฐานคิด ปกส. (เฉพาะค่าแรงรายวัน): <strong className="text-emerald-400 font-mono">{formatMoney(record.ssoBaseAmount ?? record.dailyWage ?? wage)} ฿</strong>
    </p>
    <p className="text-[10px] text-slate-400 mt-0.5">
      * คำนวณ {settings.sso}% จาก {formatMoney(record.ssoBaseAmount ?? record.dailyWage ?? wage)} ฿ (ไม่รวมยอดรายได้วันหยุด)
    </p>
  </div>
  <span className="font-mono font-bold text-rose-400 text-sm">-{formatMoney(sso)}</span>
</div>
