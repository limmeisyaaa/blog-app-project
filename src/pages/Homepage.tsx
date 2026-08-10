import axios from "axios";
import { useEffect, useState } from "react";

export interface Blog {
  objectId: string;
  title: string;
  content: string;
  description: string;
  category: string;
  author: string;
  created: number;       // Menggunakan timestamp milidetik (Epoch time)
  updated: number | null; // Bisa null jika belum pernah di-update
  ownerId: string | null; // Bisa null jika tidak ada pemilik spesifik
  thumbnail: string | null; // Bisa null jika belum ada gambar
  ___class: string;      // Identifier kelas/tabel (biasanya digunakan di Backendless/Parse)
}

function Homepage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://manlygrip-us.backendless.app/api/data/Blogs');
      setBlogs(response.data as Blog[]);
    } catch (error) {
      console.error('Error occurred while fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      
      {loading ? <p>Loading blogs...</p> : null}

      {blogs.map((blog) => (
        <div key={blog.objectId}>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Homepage;
