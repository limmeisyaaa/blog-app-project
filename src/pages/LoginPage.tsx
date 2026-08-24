import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/stores/useAuth";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    // 1. WAJIB: Mencegah halaman me-refresh bawaan dari tag <form> HTML
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 2. Kumpulkan data dari state yang sudah kamu buat
    const formData = {
      email: email,
      password: password,
      remember: remember, // ini hanya ada jika mode === 'login'
      mode: mode,
    };

    try {
      let response;
      if (mode === "signup") {//Just incase mau tambahkan fitur signup, kita bisa handle disini
        const url = "https://manlygrip-us.backendless.app/api/users/register";
        response = await axios.post(url, {
          email: formData.email,
          password: formData.password,
        });
      } else if (mode === "login") {
        const url = "https://manlygrip-us.backendless.app/api/users/login";
        response = await axios.post(url, {
          login: formData.email,
          password: formData.password,
        });
      }

      login({
        objectId: response.data.objectId,
        name: response.data.name,
        email: response.data.email,
        userToken: response.data["user-token"],
      });

    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/");
  };

  const btnPrimary =
    "inline-flex items-center justify-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-white shadow-sm shadow-electric/30 transition-colors hover:bg-blue-700 disabled:opacity-50";
  const btnOutline =
    "inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-8 py-4 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-offwhite disabled:opacity-50";

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2 lg:h-[calc(100vh-4rem)]">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <img
          src="https://images.pexels.com/photos/31983500/pexels-photo-31983500.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Star Wars clone trooper action figures"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-orange/30 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-electric/30 blur-3xl"
          aria-hidden
        />
        <div className="relative flex h-full flex-col justify-end p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            FigureHome
          </p>
          <h2 className="mt-3 max-w-md text-3xl font-bold text-offwhite text-balance">
            Collect Characters. Build Your World.
          </h2>
          <p className="mt-4 max-w-md text-neutral-300">
            Login to add posts and manage our collection.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-offwhite px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-ink">
              Login to your account
            </h1>
            <p className="mt-2 text-neutral-600">
              Login to manage the blog posts.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-neutral-400 transition-colors focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-neutral-400 transition-colors focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20"
                />
              </div>
            </div>
            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-electric focus:ring-electric"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-electric hover:text-orange"
                >
                  Forgot password?
                </a>
              </div>
            )}
            <button
              type="submit"
              className={`${btnPrimary} w-full`}
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Sign Up"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-offwhite px-4 text-xs text-neutral-500">
                  or continue with
                </span>
              </div>
            </div>
            <button type="button" className={`${btnOutline} w-full`} disabled>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-neutral-500 hover:text-electric"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
