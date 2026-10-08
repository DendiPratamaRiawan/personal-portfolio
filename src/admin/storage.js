import { supabase, BUCKET } from '../lib/supabase';

const MAX_SIDE = 1800;

// Perkecil foto besar (kamera HP bisa 4MB+) jadi webp agar website tetap ringan.
export async function compressImage(blob) {
  if (!blob.type.startsWith('image/') || /svg|gif/.test(blob.type)) return blob;
  try {
    const bitmap = await createImageBitmap(blob);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && blob.size < 600 * 1024) return blob;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const out = await new Promise((res) => canvas.toBlob(res, 'image/webp', 0.85));
    return out && out.size < blob.size ? out : blob;
  } catch {
    return blob;
  }
}

const EXT = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/svg+xml': 'svg', 'application/pdf': 'pdf' };

export async function uploadFile(file, folder = 'misc') {
  const blob = await compressImage(file);
  const ext = EXT[blob.type] || (file.name?.split('.').pop() ?? 'bin');
  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: blob.type, cacheControl: '31536000' });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

// Hapus file dari bucket jika URL-nya memang milik bucket ini (best effort).
export async function removeStoredFile(url) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  if (!url || !url.includes(marker)) return;
  const path = decodeURIComponent(url.split(marker)[1]);
  await supabase.storage.from(BUCKET).remove([path]);
}
