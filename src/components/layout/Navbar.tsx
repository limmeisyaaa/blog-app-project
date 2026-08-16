import { useEffect, useState } from 'react';
import { Menu, X, PenLine, LogIn, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { company, navLinks } from '@/data/side';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-neutral-200 bg-offwhite/90 backdrop-blur-md'
          : 'border-transparent bg-offwhite'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between lg:h-20" aria-label="Main">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-offwhite">
            <span className="text-sm font-black">F</span>
          </span>
          {company.name}
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-electric ${
                    active ? 'text-electric' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/create-blog"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-offwhite transition-colors hover:bg-neutral-800"
          >
            <PenLine className="h-4 w-4" />
            Create Blog
          </Link>
          <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-electric"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          {/* {user ? (
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-electric"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-electric"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )} */}
        </div>

        <button
          className="rounded-lg p-2 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="animate-slide-down border-t border-neutral-200 bg-offwhite lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    active ? 'bg-electric/10 text-electric' : 'text-ink hover:bg-neutral-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-3 border-t border-neutral-200 pt-4">
              <Link
                to="/create-blog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-offwhite transition-colors hover:bg-neutral-800"
              >
                <PenLine className="h-4 w-4" />
                Create Blog
              </Link>
              <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-offwhite"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              {/* {user ? (
                <button
                  onClick={signOut}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-neutral-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-offwhite"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              )} */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
