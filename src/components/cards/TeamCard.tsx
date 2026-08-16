import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function TeamCard({ name, role, bio, image }: TeamCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/60">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-3 bg-gradient-to-t from-ink/90 to-transparent p-5 transition-transform duration-300 group-hover:translate-y-0">
          <a href="#" aria-label={`${name} on Twitter`} className="text-offwhite transition-colors hover:text-electric">
            <FaTwitter className="h-5 w-5" />
          </a>
          <a href="#" aria-label={`${name} on LinkedIn`} className="text-offwhite transition-colors hover:text-electric">
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a href="#" aria-label={`${name} on Instagram`} className="text-offwhite transition-colors hover:text-electric">
            <FaInstagram className="h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-ink">{name}</h3>
        <p className="text-sm font-semibold text-electric">{role}</p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">{bio}</p>
      </div>
    </article>
  );
}
