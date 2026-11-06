/**
 * TemperatureGauge — hiển thị nhiệt độ ấm với thang màu.
 * Pure React + SVG, không Three.js.
 */

interface TemperatureGaugeProps {
  tempC: number;
}

const TEMP_ZONES = [
  { from: 70, to: 85, label: 'Thấp', color: '#4c6b52' },
  { from: 85, to: 92, label: 'Cân bằng', color: '#8a6d3b' },
  { from: 92, to: 96, label: 'Sáng', color: '#c44b2e' },
  { from: 96, to: 100, label: 'Nóng', color: '#a14228' },
] as const;

export function TemperatureGauge({ tempC }: TemperatureGaugeProps) {
  const zone = TEMP_ZONES.find((z) => tempC >= z.from && tempC <= z.to) ?? TEMP_ZONES[TEMP_ZONES.length - 1];
  const pct = Math.min(100, Math.max(0, ((tempC - 70) / 30) * 100));

  return (
    <section className="bg-paper-2 border border-hair rounded-lg p-4">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-mut mb-3">Nhiệt độ nước</h3>
      <div className="flex items-end justify-between gap-2">
        <div className="flex-1 h-8 bg-hair rounded-t-lg relative overflow-hidden">
          <div
            className="absolute bottom-0 h-full bg-acc"
            style={{ width: `${pct}%` }}
          />
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-ink border-2 border-paper" />
        </div>
        <div className="text-[12px] font-mono font-bold text-ink tabular-nums">
          {tempC}°C
        </div>
      </div>
      <div className="flex justify-between mt-2">
        {TEMP_ZONES.map((z) => (
          <span
            key={z.from}
            className={`text-[8px] font-mono uppercase tracking-wider text-mut text-center ${
              zone.from === z.from ? 'text-ink font-bold' : 'text-mut'
            }`}
          >
            {z.from}
          </span>
        ))}
      </div>
      <div className="mt-1 text-[11px] font-mono text-mut text-center">
        {zone.label} ({zone.color === zone.color ? '' : ''})
      </div>
    </section>
  );
}