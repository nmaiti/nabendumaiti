import { getProjects } from '@/lib/api';
import ArchiveClient from './ArchiveClient';

export const metadata = {
  title: 'Archive',
  description: 'A big list of things I’ve worked on',
};

export default async function Archive() {
  const projects = await getProjects();

  return <ArchiveClient projects={projects} />;
}
