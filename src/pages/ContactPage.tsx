import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { company } from '@/data/side';

const fieldClass = 'w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-ink placeholder:text-neutral-400 transition-colors focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const btnPrimary = 'inline-flex items-center justify-center gap-2 rounded-full bg-electric px-8 py-3.5 text-sm font-semibold text-white shadow-sm shadow-electric/30 transition-colors hover:bg-blue-700 disabled:opacity-50';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validasi sederhana
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);

    // Simulasi pengiriman data form (Anda bisa menggantinya dengan axios.post ke API Anda nanti)
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  return (
    <>
      {/* Page Header */}
      <section className="border-b border-neutral-200 bg-offwhite">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric">Contact Us</p>
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance">Get in Touch With Us</h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600 sm:text-xl text-balance">
              Have questions about a drop, custom figure requests, or collector guidance? Drop us a line below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            
            {/* Contact Information Sidebar */}
            <div className="space-y-8 lg:col-span-1">
              <div className="rounded-3xl border border-neutral-200 bg-white p-8">
                <h3 className="text-xl font-bold text-ink">Contact Information</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Reach out through any of these channels or fill out the form. We respond within 24 hours.
                </p>

                <ul className="mt-8 space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Email Us</p>
                      <a href="mailto:hello@figurehome.co" className="mt-1 text-sm font-medium text-ink hover:text-electric transition-colors">
                        hello@figurehome.co
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Call Us</p>
                      <a href="tel:+15550123456" className="mt-1 text-sm font-medium text-ink hover:text-electric transition-colors">
                        +1 (555) 012-3456
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Visit Us</p>
                      <p className="mt-1 text-sm font-medium text-ink leading-relaxed">
                        42 Collector Ave, Portland, OR
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 lg:col-span-2">
              <h3 className="text-2xl font-bold text-ink">Send Us a Message</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Fill out the details below and our team will get back to you shortly.
              </p>

              {error && (
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              {success ? (
                <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-green-900">Message Sent Successfully!</h4>
                  <p className="mt-2 text-sm text-green-700">
                    Thank you for reaching out to {company.name}. We have received your message and will contact you soon.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 rounded-full bg-green-600 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>Your Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you with your collection?"
                      className={`${fieldClass} resize-y`}
                    />
                  </div>

                  <div>
                    <button type="submit" className={btnPrimary} disabled={submitting}>
                      <Send className="h-4 w-4" />
                      {submitting ? 'Sending Message...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}