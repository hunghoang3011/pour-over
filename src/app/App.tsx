import { useState } from 'react';
import { COFFEES, DRIPPERS } from '../data/recipes/recipes';
import { Navigation } from '../components/layout/Navigation';
import { RecipeView } from '../features/brewing/components/RecipeView';
import { CoffeeCard } from '../features/coffee/components/CoffeeCard';
import { GearGrid } from '../features/brewing/components/GearGrid';
import { PouringTimeline } from '../features/brewing/components/PouringTimeline';
import { DripperDiagram } from '../features/equipment/components/DripperDiagram';
import { BrewSimulator } from '../features/brewing/components/BrewSimulator';
import '../styles/globals.css';

type Tab = 'discover' | 'equipment' | 'coffee' | 'brew' | 'live' | 'analyze';

const TAB_LABELS: Record<Tab, string> = {
  discover: 'Thư viện công thức',
  equipment: 'Thiết bị & giấy lọc',
  coffee: 'Hồ sơ hạt',
  brew: 'Lập công thức',
  live: 'Trợ lý pha chế',
  analyze: 'Nhật ký pha chế',
};

export function App() {
  const [tab, setTab] = useState<Tab>('discover');
  const [coffeeId, setCoffeeId] = useState('karina');
  const [dripperId, setDripperId] = useState('switch-hot');

  const coffee = COFFEES.find((c) => c.id === coffeeId)!;
  const dripper = DRIPPERS.find((d) => d.id === dripperId)!;
  const recipe = coffee.recipes[dripperId];
  const totalWater = recipe.hotWater + recipe.ice;
  const ratio = '1:' + (Math.round((totalWater / 15) * 10) / 10).toString().replace('.', ',');

  return (
    <div className="min-h-screen bg-paper text-ink">
      <nav className="border-b border-hair bg-paper/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-728 mx-auto px-4">
          <div className="flex items-center gap-1 py-3">
            <span className="font-serif font-bold text-[22px] tracking-tight text-ink">
              Pour Over<span className="text-acc">·</span>
            </span>
            <div className="flex-1" />
            <div className="flex gap-1">
              {Object.entries(TAB_LABELS).map(([key, label]) => {
                const t = key as Tab;
                return (
                  <button
                    key={key}
                    onClick={() => setTab(t)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-md transition-colors ${
                      tab === t
                        ? 'bg-ink text-paper'
                        : 'text-mut hover:text-ink hover:bg-paper-2'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-728 mx-auto px-4 py-6">
        {tab === 'discover' && (
          <Navigation
            coffee={coffeeId}
            dripper={dripperId}
            onCoffeeChange={setCoffeeId}
            onDripperChange={setDripperId}
          />
        )}
        {tab === 'coffee' && <CoffeeCard coffee={coffee} />}
        {tab === 'equipment' && (
          <GearGrid
            c40={recipe.k7}
            rc={recipe.m40}
            water={`${recipe.hotWater}${recipe.ice > 0 ? ' + ' + recipe.ice : ''} g`}
            temp={recipe.temp}
            ratio={ratio}
          />
        )}
        {tab === 'brew' && <RecipeView coffee={coffee} dripper={dripper} recipe={recipe} />}
        {tab === 'live' && (
          <div className="space-y-4">
            <DripperDiagram dripper={dripper} />
            <PouringTimeline recipe={recipe} />
            <BrewSimulator dripper={dripper} recipe={recipe} />
          </div>
        )}
        {tab === 'analyze' && (
          <div className="border border-hair rounded-lg p-4">
            <h2 className="font-serif text-[20px] font-semibold mb-3">Nhật ký pha chế</h2>
            <p className="text-mut text-sm">Chức năng đang phát triển.</p>
          </div>
        )}
      </main>
    </div>
  );
}