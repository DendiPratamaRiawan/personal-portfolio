import { useState } from 'react';
import { ArrowUpRight, Award, BadgeCheck, FolderGit2, Star } from 'lucide-react';
import { SectionHead, Slider, Tabs } from './ui';
import Modal from './Modal';
import { GithubIcon } from './icons';
import { useLang } from '../i18n';

const validLink = (l) => l && l !== '#';

function ProjectCard({ p, onOpen }) {
  const { t, tr } = useLang();
  return (
    <button onClick={() => onOpen(p)} className="card group flex w-[86vw] max-w-[28rem] flex-col overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 sm:w-[28rem]">
      <div className="relative m-2.5 mb-0 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-sky">
        {p.image_url ? (
          <img src={p.image_url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="dot-grid grid h-full place-items-center text-accent">
            <FolderGit2 size={40} />
          </div>
        )}
        {p.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-sun px-3 py-1 text-xs font-bold text-ink">
            <Star size={12} fill="currentColor" /> {t('projects.featured')}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold leading-tight">{tr(p, 'title')}</h3>
          {p.date_label && <span className="shrink-0 rounded-full bg-paper px-2.5 py-1 text-xs font-bold text-muted">{p.date_label}</span>}
        </div>
        {tr(p, 'description') && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{tr(p, 'description')}</p>}
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {p.tech?.slice(0, 3).map((x) => (
              <span key={x} className="rounded-lg bg-sky px-2.5 py-1 text-xs font-semibold text-accent">
                {x}
              </span>
            ))}
            {p.tech?.length > 3 && <span className="px-1 py-1 text-xs font-semibold text-muted">+{p.tech.length - 3}</span>}
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </button>
  );
}

function CertCard({ c, onOpen }) {
  const { tr } = useLang();
  return (
    <button onClick={() => onOpen(c)} className="card group flex w-[78vw] max-w-[20rem] flex-col overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 sm:w-[20rem]">
      <div className="m-2.5 mb-0 aspect-[4/3] rounded-[1.25rem] bg-sky p-4">
        {c.image_url ? (
          <img src={c.image_url} alt={c.title} loading="lazy" className="h-full w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center text-accent">{c.type === 'award' ? <Award size={44} /> : <BadgeCheck size={44} />}</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold text-accent">{c.date_label}</span>
        <h3 className="mt-1 text-lg font-bold leading-snug">{tr(c, 'title')}</h3>
        {c.issuer && <p className="mt-1 text-sm text-muted">{tr(c, 'issuer')}</p>}
      </div>
    </button>
  );
}

export default function Projects({ projects, certificates }) {
  const { t, tr } = useLang();
  const certs = certificates.filter((c) => c.type !== 'award');
  const awards = certificates.filter((c) => c.type === 'award');
  const tabs = [
    { id: 'project', label: t('projects.projects'), count: projects.length },
    { id: 'cert', label: t('projects.certificates'), count: certs.length },
    { id: 'award', label: t('projects.awards'), count: awards.length },
  ].filter((x) => x.count > 0);

  const [selected, setSelected] = useState('project');
  const tab = tabs.some((x) => x.id === selected) ? selected : tabs[0]?.id;
  const [project, setProject] = useState(null);
  const [cert, setCert] = useState(null);

  if (!tabs.length) return null;
  const sorted = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead label={t('projects.label')} title={t('projects.title')}>
          <Tabs id="work" tabs={tabs} value={tab} onChange={setSelected} />
        </SectionHead>
      </div>

      <div key={tab}>
        {tab === 'project' && (
          <Slider>
            {sorted.map((p) => (
              <ProjectCard key={p.id} p={p} onOpen={setProject} />
            ))}
          </Slider>
        )}
        {tab !== 'project' && (
          <Slider>
            {(tab === 'cert' ? certs : awards).map((c) => (
              <CertCard key={c.id} c={c} onOpen={setCert} />
            ))}
          </Slider>
        )}
      </div>

      <Modal open={!!project} onClose={() => setProject(null)} wide>
        {project && (
          <div>
            {project.image_url && <img src={project.image_url} alt={project.title} className="max-h-[55vh] w-full bg-sky object-contain" />}
            <div className="p-6 sm:p-10">
              <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold text-accent">{project.date_label}</span>
              <h3 className="mt-3 text-3xl font-bold">{tr(project, 'title')}</h3>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-muted">{tr(project, 'description')}</p>
              {project.tech?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((x) => (
                    <span key={x} className="rounded-lg bg-sky px-3 py-1.5 text-xs font-semibold text-accent">
                      {x}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                {validLink(project.github_url) && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <GithubIcon size={16} /> {t('cta.source')}
                  </a>
                )}
                {validLink(project.demo_url) && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    {t('cta.demo')} <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!cert} onClose={() => setCert(null)} wide>
        {cert && (
          <div className="p-4 sm:p-6">
            {cert.image_url && <img src={cert.image_url} alt={cert.title} className="max-h-[68vh] w-full rounded-2xl bg-sky object-contain" />}
            <div className="flex flex-wrap items-center justify-between gap-4 px-2 pt-5">
              <div>
                <h3 className="text-2xl font-bold">{tr(cert, 'title')}</h3>
                <p className="text-sm text-muted">
                  {tr(cert, 'issuer')}
                  {cert.date_label && ` · ${cert.date_label}`}
                </p>
              </div>
              {validLink(cert.link) && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t('cta.viewCredential')} <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
