"use client";

interface Option {
  id: number;
  name: string;
}

interface MultiSelectProps {
  label: string;
  name: string;
  options: Option[];
  selected: number[];
  onChange: (ids: number[]) => void;
}

export function MultiSelect({ label, name, options, selected, onChange }: MultiSelectProps) {
  function toggle(id: number) {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-foreground">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                active
                  ? "border-primary bg-primary text-neutralLight"
                  : "border-border bg-background text-secondary-foreground hover:border-primary"
              }`}
            >
              {opt.name}
            </button>
          );
        })}
      </div>
      {/* Hidden inputs so the form action receives the values */}
      {selected.map((id) => (
        <input key={id} type="hidden" name={name} value={id} />
      ))}
    </div>
  );
}
