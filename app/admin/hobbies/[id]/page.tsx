'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function HobbyEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [hobby, setHobby] = useState<any>(null);
  const [form, setForm] = useState({
    title: '',
    text: '',
    imageUrl: '',
    cropWidth: 100,
    cropHeight: 100,
    cropCenterX: 50,
    cropCenterY: 50,
    order: 0,
    halfWidth: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/hobbies/${id}`);
      const data = await res.json();
      setForm(data);
      setHobby(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
        setForm({
        ...form,
        [name]: e.target.checked,
        });
    } else {
        setForm({
        ...form,
        [name]: value,
        });
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/hobbies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/hobbies');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">「{hobby?.title}」の編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="タイトル" className="w-full border p-2" />
        <textarea name="text" value={form.text} onChange={handleChange} placeholder="説明" className="w-full border p-2" rows={4} />
        <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="画像URL" className="w-full border p-2" />
        <input type="number" name="order" value={form.order} onChange={handleChange} placeholder="表示順" className="w-full border p-2" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="halfWidth" checked={form.halfWidth} onChange={handleChange} />
          半幅で表示
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">保存</button>
      </form>
    </div>
  );
}
