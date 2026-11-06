interface GearGridProps {
  c40: number;
  rc: number;
  water: string;
  temp: number;
  ratio: string;
}

export function GearGrid({ c40, rc, water, temp, ratio }: GearGridProps) {
  return (
    <div className="grid grid-cols-2 gap-[1px] bg-hair rounded-xl overflow-hidden p-[1px]">
      <GearItem label="C40" value={`${c40} click`} sub="từ zero" />
      <GearItem label="Red Clix" value={`${rc}`} sub="thường × 2" />
      <GearItem label="Nước" value={water} sub={ratio} />
      <GearItem label="Nhiệt độ" value={`${temp}°C`} sub="trong ấm" />
    </div>
  );
}

function GearItem({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-paper-2 p-3 text-center">
      <span className="text-[9px] font-bold uppercase tracking-wider text-mut block mb-1">
        {label}
      </span>
      <span className="font-serif font-semibold text-ink text-[18px] leading-none">
        {value}
      </span>
      <span className="text-[10px] text-mut block mt-0.5">{sub}</span>
    </div>
  );
}