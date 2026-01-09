import { getProjects } from '@/lib/api';
import ArchiveClient from './ArchiveClient';
import { Social, Email } from '@/components/layout';

export const metadata = {
  title: 'Archive',
  description: 'A big list of things I’ve worked on',
};

  const projects = await getProjects();
  return (
    <>
      <ArchiveClient projects={projects} />
      <Social isHome={false} />
      <Email isHome={false} />
    </>
  );
}
