import type { BlogPost } from "@/types/blog";
import axios from "axios";

function getEmptyBlogPost(slug: string): BlogPost {
  return {
    slug: slug,
    title: '',
    category: '',
    description: '',
    content: '',
    excerpt: '',
    featured_image: '',
    author: '',
    tags: [],
    status: 'draft',
    reading_time: 0,
    created_at: new Date().toISOString()
  } as BlogPost;
}

function apiClient (api: string){
    return axios.create({
        baseURL: api,
        timeout: 10000, // Timeout 10 detik
    });
} 

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const apiFetchAll = apiClient('https://manlygrip-us.backendless.app/api/data/BlogPosts');
    const response = await apiFetchAll.get<BlogPost[]>('');
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data blog:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  try {
    const apiFetchAll = apiClient(`https://manlygrip-us.backendless.app/api/data/BlogPosts?where=slug='${slug}'`);
    const response = await apiFetchAll.get<BlogPost[]>('');
    if (response.data && response.data.length > 0) {
      const rawPost = response.data[0];
      
      if (rawPost.tags && typeof rawPost.tags === 'string') {
        rawPost.tags = (rawPost.tags as string)
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean); 
      }
      
      return rawPost as BlogPost;
    }
    
    return getEmptyBlogPost(slug);
  } catch (error) {
    console.error("Gagal mengambil data blog:", error);
    return getEmptyBlogPost(slug);
  }
}