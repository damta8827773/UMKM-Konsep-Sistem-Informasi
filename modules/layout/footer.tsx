export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-6 text-xs text-faint sm:px-6">
        <span>© {year} Warung Analytics · prototype UMKM</span>
      </div>
    </footer>
  );
}
