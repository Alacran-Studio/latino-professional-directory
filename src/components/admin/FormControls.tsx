export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5"
    >
      Edit
    </button>
  );
}

export function FormButtons({ saving, onCancel }: { saving: boolean; onCancel: () => void }) {
  return (
    <div className="flex gap-3">
      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-neutralLight hover:bg-primary-hover disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl border border-border px-5 py-2 text-sm text-secondary-foreground hover:text-foreground"
      >
        Cancel
      </button>
    </div>
  );
}
