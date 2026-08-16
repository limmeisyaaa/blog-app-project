export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content?: string;
  featured_image: string;
  author: string;
  tags?: string[];
  status: string;
  reading_time: number;
  created_at?: string;
}
