const inputCls = "w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground";

export function FormField({
  label, name, defaultValue, required, textarea, rows = 3, placeholder,
}: {
  label: string; name: string; defaultValue: string;
  required?: boolean; textarea?: boolean; rows?: number; placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1.5 text-sm font-bold text-foreground">{label}</label>
      {textarea ? (
        <textarea id={name} name={name} defaultValue={defaultValue} rows={rows} placeholder={placeholder} className={inputCls} />
      ) : (
        <input id={name} name={name} type="text" defaultValue={defaultValue} required={required} placeholder={placeholder} className={inputCls} />
      )}
    </div>
  );
}

export const formInputCls = inputCls;

export function DisplayRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-sm font-bold text-foreground">{label}</dt>
      <dd className="text-sm text-secondary-foreground">
        {value || <span className="italic opacity-50">Not set</span>}
      </dd>
    </div>
  );
}
