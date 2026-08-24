import { TeamCard } from '@/components/cards/TeamCard';
import { PageHeader } from '@/components/PageHeader';
import { teams } from '@/data/teams';



export function TeamsPage() {
  return (
    <>
      <PageHeader eyebrow="Our Team" title="Meet the People Behind the FigureHome" description="A small, passionate team of collectors, artists, and operators dedicated to bringing you the best figures in the world." />
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((member) => <TeamCard key={member.name} {...member} />)}
          </div>
        </div>
      </section>
    </>
  );
}
