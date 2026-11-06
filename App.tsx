import { useBrewSelection } from './hooks/useBrewSelection';
import { useTheme } from './hooks/useTheme';
import { COFFEES } from './data';
import { Masthead } from './components/Masthead';
import { CoffeePicker } from './components/CoffeePicker';
import { MethodPicker } from './components/MethodPicker';
import { RecipeSheet } from './components/RecipeSheet';
import { FirstFiveTable } from './components/FirstFiveTable';
import { DialInTable } from './components/DialInTable';
import { StaticDetails } from './components/StaticDetails';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';

/** App giữ toàn bộ state chọn (hạt + kiểu pha) — component con chỉ nhận props. */
export default function App() {
  const [theme, toggleTheme] = useTheme();
  const { coffee, dripper, setCoffee, setDripper } = useBrewSelection();
  const index = Math.max(0, COFFEES.findIndex((c) => c.id === coffee.id));

  return (
    <div className="mx-auto max-w-[1060px] px-4 sm:px-6">
      <Masthead right={<ThemeToggle theme={theme} onToggle={toggleTheme} />} />

      {/* Bộ chọn dính màn hình */}
      <div className="sticky top-0 z-20 -mx-4 border-b border-hair bg-paper/92 px-4 pb-3 pt-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
        <p className="overline mb-1.5">Hạt</p>
        <CoffeePicker value={coffee.id} onChange={setCoffee} />
        <div className="mt-3 flex items-baseline gap-3">
          <p className="overline">Kiểu pha</p>
          <p className="text-[11px] italic text-mut">
            <span className="not-italic text-acc">★</span> = ưu tiên thử cho hạt này
          </p>
        </div>
        <div className="mt-1.5">
          <MethodPicker value={dripper.id} pickId={coffee.pick} onChange={setDripper} />
        </div>
      </div>

      <main className="mt-8" aria-live="polite">
        <RecipeSheet coffee={coffee} dripper={dripper} index={index} theme={theme} onPickDripper={setDripper} />
      </main>

      <section className="mt-14" aria-label="Thứ tự gợi ý">
        <p className="overline">Thứ tự gợi ý</p>
        <h2 className="mt-1 font-display text-[26px] font-[560]">Ưu tiên thử cho từng hạt</h2>
        <p className="mt-1 text-[13.5px] italic text-mut">Đánh giá thiết kế công thức, không phải điểm ném.</p>
        <div className="mt-4">
          <FirstFiveTable />
        </div>
      </section>

      <section className="mt-14" aria-label="Dial-in sau cốc đầu">
        <p className="overline">Sau cốc đầu</p>
        <h2 className="mt-1 font-display text-[26px] font-[560]">Chỉ đổi một biến mỗi lần</h2>
        <p className="mt-1 text-[13.5px] italic text-mut">
          Đọc triệu chứng ở cột trái, áp đúng một chỉnh ở cột phải, rồi pha lại.
        </p>
        <div className="mt-4">
          <DialInTable />
        </div>
      </section>

      <div className="mt-14">
        <StaticDetails />
      </div>

      <Footer />
    </div>
  );
}
