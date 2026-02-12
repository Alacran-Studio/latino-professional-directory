interface StepOrgInfoProps {
  data: {
    name: string;
    description: string;
    short_description: string;
    website_url: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

export function StepOrgInfo({ data, onChange, onNext }: StepOrgInfoProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext();
  }

  const inputClass =
    "w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-lexend text-xl font-semibold text-foreground">
        Organization Info
      </h2>
      <p className="text-sm text-secondary-foreground">
        Tell us about your organization.
      </p>

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1.5 text-sm font-bold text-foreground">
          Organization Name *
        </label>
        <input
          id="name"
          type="text"
          required
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={inputClass}
          placeholder="e.g., Techqueria"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="website_url" className="mb-1.5 text-sm font-bold text-foreground">
          Website URL *
        </label>
        <input
          id="website_url"
          type="url"
          required
          value={data.website_url}
          onChange={(e) => onChange("website_url", e.target.value)}
          className={inputClass}
          placeholder="https://yourorg.com"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="short_description" className="mb-1.5 text-sm font-bold text-foreground">
          Short Description
        </label>
        <input
          id="short_description"
          type="text"
          value={data.short_description}
          onChange={(e) => onChange("short_description", e.target.value)}
          className={inputClass}
          placeholder="A one-line summary of your organization"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="mb-1.5 text-sm font-bold text-foreground">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          className={inputClass}
          placeholder="Tell us more about what your organization does"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-primary px-4 py-3 text-lg text-neutralLight transition-all duration-200 hover:bg-primary-hover"
      >
        Next
      </button>
    </form>
  );
}
