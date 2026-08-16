import { useState } from 'react';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { company, navLinks, services } from '@/data/side';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-ink text-offwhite">
      <div className="container-page py-16 lg:py-20">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-neutral-700 pb-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="text-2xl font-bold sm:text-3xl text-balance">
              Stay in the loop on every drop.
            </h3>
            <p className="mt-3 text-neutral-400">
              Get notified about new releases, exclusive previews, and collector guides.
            </p>
          </div>
          {subscribed ? (
            <div className="rounded-xl border border-electric/40 bg-electric/10 px-6 py-5 text-electric">
              <p className="font-semibold">You are subscribed. Welcome to the collection.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                className="flex-1 rounded-full border border-neutral-700 bg-neutral-900 px-5 py-3 text-sm text-offwhite placeholder:text-neutral-500 focus:border-electric focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        {/* Links */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-offwhite text-ink">
                <span className="text-sm font-black">F</span>
              </span>
              {company.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {company.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 transition-colors hover:border-electric hover:text-electric">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 transition-colors hover:border-electric hover:text-electric">
                <FaInstagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 transition-colors hover:border-electric hover:text-electric">
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">Navigation</h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-neutral-400 transition-colors hover:text-electric">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">Services</h4>
            <ul className="mt-4 space-y-3">
              {services.slice(0, 5).map((s) => (
                <li key={s.name}>
                  <Link to="/services" className="text-sm text-neutral-400 transition-colors hover:text-electric">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                hello@figureform.co
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                +1 (555) 012-3456
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                42 Collector Ave, Portland, OR
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-700 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-neutral-500 transition-colors hover:text-electric">Privacy</a>
            <a href="#" className="text-sm text-neutral-500 transition-colors hover:text-electric">Terms</a>
            <a href="#" className="text-sm text-neutral-500 transition-colors hover:text-electric">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
