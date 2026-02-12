interface StepContactInfoProps {
  data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export function StepContactInfo({
  data,
  onChange,
  onBack,
  onSubmit,
  loading,
}: StepContactInfoProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  const inputClass =
    "w-full rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-lexend text-xl font-semibold text-foreground">
        Your Contact Info
      </h2>
      <p className="text-sm text-secondary-foreground">
        Create your account to manage your organization.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="first_name" className="mb-1.5 text-sm font-bold text-foreground">
            First Name *
          </label>
          <input
            id="first_name"
            type="text"
            required
            value={data.first_name}
            onChange={(e) => onChange("first_name", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="last_name" className="mb-1.5 text-sm font-bold text-foreground">
            Last Name *
          </label>
          <input
            id="last_name"
            type="text"
            required
            value={data.last_name}
            onChange={(e) => onChange("last_name", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1.5 text-sm font-bold text-foreground">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1.5 text-sm font-bold text-foreground">
          Password *
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={data.password}
          onChange={(e) => onChange("password", e.target.value)}
          className={inputClass}
          placeholder="At least 6 characters"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone" className="mb-1.5 text-sm font-bold text-foreground">
          Phone (optional)
        </label>
        <input
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-lg text-neutralLight transition-all duration-200 hover:bg-primary-hover disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Organization"}
        </button>
      </div>
    </form>
  );
}
