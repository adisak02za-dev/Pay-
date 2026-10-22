<div className="p-3 flex items-start justify-between gap-3">
  <div>
    <span className="font-semibold text-slate-200">ประกันสังคม ({settings.sso}%)</span>
    <p className="text-[11px] text-slate-400 mt-0.5">
      ฐานคิด ปกส.: <strong className="text-emerald-400 font-mono">{formatMoney(record.ssoBaseAmount)} ฿</strong>
      {settings.ssoCap > 0 && ` · เพดาน ${settings.ssoCap} ฿`}
    </p>
    {(record.pubWage || 0) > 0 ? (
      <p className="text-[10px] text-amber-400/90 mt-0.5">
        * ยกเว้นค่าแรงวันนักขัตฤกษ์ ({formatMoney(record.pubWage)} ฿) ไม่นำมาคิดประกันสังคม
      </p>
    ) : (
      <p className="text-[10px] text-slate-500 mt-0.5">
        * วันนักขัตฤกษ์ไม่นำมาคิดประกันสังคม
      </p>
    )}
  </div>
  <span className="font-mono font-bold text-rose-400 text-sm">-{formatMoney(sso)}</span>
</div>
