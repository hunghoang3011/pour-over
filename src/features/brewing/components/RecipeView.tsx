/**
 * RecipeView — toàn bộ thông tin công thức pha một hạt/cách pha.
 * Tổng hợp: spec, lịch rót, mô phỏng, đồ thị nước, cảm biến.
 */

import type { Coffee, Dripper, RecipeConfig } from '../../../data/recipes/recipes';
import { CoffeeCard } from '../../coffee/components/CoffeeCard';
import { PouringTimeline } from './PouringTimeline';
import { DripperDiagram } from '../../equipment/components/DripperDiagram';
import { BrewSimulator } from './BrewSimulator';
import { TemperatureGauge } from './TemperatureGauge';
import { WaterTimelineChart } from './WaterTimelineChart';
import { AromaWheel } from '../../sensory/components/AromaWheel';

interface RecipeViewProps {
  coffee: Coffee;
  dripper: Dripper;
  recipe: RecipeConfig;
}

export function RecipeView({ coffee, dripper, recipe }: RecipeViewProps) {
  const totalWater = recipe.hotWater + recipe.ice;
  const ratio = '1:' + (Math.round((totalWater / 15) * 10) / 10).toString().replace('.', ',');

  return (
    <article className="bg-paper-2 border border-hair rounded-xl overflow-hidden scroll-mt-24">
      <div className="p-5 border-b border-hair">
        <div className="flex justify-between items-start gap-2 mb-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-mut">Hạt đang pha</span>
          {dripper.id === coffee.pick && (
            <span className="text-[10px] font-bold text-acc">★ đúng pick của hạt này</span>
          )}
        </div>
        <h2 className="font-serif text-[24px] font-semibold leading-tight text-ink mb-2">
          {coffee.name.replace(/^Colombia |^Kenya /, '')}
        </h2>
        <div className="flex items-center gap-1 text-[11px] font-mono text-mut mb-2">
          <span>{coffee.roaster}</span>
          <span>·</span>
          <span>{coffee.roast}</span>
          <span>·</span>
          <span>{dripper.name}</span>
        </div>
        <p className="font-serif text-[16px] italic text-ink-2 leading-relaxed mb-1">
          — {coffee.tasting.replaceAll('•', '·')}
        </p>
        <p className="text-[13px] text-ink-2">{coffee.goal}</p>
        <p className="text-[12px] text-mut mt-2">
          <span className="font-semibold text-mut">Lưu ý hạt —</span> {coffee.beanNote}
        </p>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-4 gap-[1px] bg-hair rounded-lg overflow-hidden p-[1px] mb-4">
          <StatCell label="C40 thường / RC" value={`${recipe.k7} / ${recipe.m40}`} sub="click từ zero · RC = thường × 2" />
          <StatCell
            label="Nước"
            value={`${recipe.hotWater}${recipe.ice > 0 ? ' + ' + recipe.ice : ''} g`}
            sub={recipe.ice > 0 ? `nóng + đá · ${ratio}` : `${ratio} · nóng`}
          />
          <StatCell label="Nhiệt độ" value={`${recipe.temp}`} sub="°C trong ấm lúc bắt đầu" />
          <StatCell label="Finish thử" value={recipe.time} sub="chỉ để tham khảo" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <DripperDiagram dripper={dripper} />
            <div className="bg-paper border border-hair rounded-lg p-3">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-mut mb-2">Chuẩn bị phễu</h3>
              <p className="text-[12px] text-mut leading-relaxed">{dripper.prep}</p>
            </div>
          </div>
          <div className="space-y-4">
            <PouringTimeline recipe={recipe} />
            <WaterTimelineChart recipe={recipe} />
            <TemperatureGauge tempC={recipe.temp} />
            <BrewSimulator dripper={dripper} recipe={recipe} />
          </div>
        </div>

        <div className="mt-4 border-t border-hair pt-4">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-mut mb-2">Hồ sơ hạt & hương vị</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            <CoffeeCard coffee={coffee} />
            <AromaWheel coffee={coffee} />
          </div>
        </div>

        {coffee.adjust.length > 0 && (
          <div className="mt-4 border-l-2 border-acc bg-acc/5 pl-4 py-2">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-acc mb-2">Chỉnh riêng cho hạt này</h3>
            <ul className="space-y-1">
              {coffee.adjust.map((a: string, i: number) => (
                <li key={i} className="text-[12px] text-mut leading-relaxed" dangerouslySetInnerHTML={{ __html: a }} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

function StatCell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-paper-2 p-3 text-center border-t border-hair first:border-0">
      <span className="text-[9px] font-bold uppercase tracking-wider text-mut block mb-1">{label}</span>
      <span className="font-serif font-semibold text-ink text-[18px] leading-none block">{value}</span>
      <span className="text-[10px] text-mut block mt-0.5">{sub}</span>
    </div>
  );
}