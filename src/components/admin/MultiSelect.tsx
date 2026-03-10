"use client";

interface Option {
  id: number;
  name: string;
}

interface MultiSelectProps {
  label: string;
  name: string;
  options: Option[];
  selected: Option[];
  onChange: (items: Option[]) => void;
}

export function MultiSelect({ label, name, options, selected, onChange }: MultiSelectProps) {
  function toggle(opt: Option) {
    const isSelected = selected.some((s) => s.id === opt.id);
    onChange(
      isSelected ? selected.filter((s) => s.id !== opt.id) : [...selected, opt]
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-foreground">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.some((s) => s.id === opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "border-primary bg-primary text-neutralLight"
                  : "border-border bg-card text-secondary-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {opt.name}
            </button>
          );
        })}
      </div>
      {selected.map((item) => (
        <input key={item.id} type="hidden" name={name} value={item.id} />
      ))}
    </div>
  );
}
