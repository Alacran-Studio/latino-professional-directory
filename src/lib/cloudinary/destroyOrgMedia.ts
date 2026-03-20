import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** Extracts the Cloudinary public_id from a full URL.
 *  e.g. https://res.cloudinary.com/demo/image/upload/v1234/lpdd/logos/abc.jpg → lpdd/logos/abc
 */
function extractPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function destroyOrgMedia(media: {
  logo_url: string | null;
  photo_url: string | null;
  gallery_urls: string[];
}): Promise<void> {
  const urls = [media.logo_url, media.photo_url, ...media.gallery_urls].filter(Boolean) as string[];
  const publicIds = urls.map(extractPublicId).filter(Boolean) as string[];

  await Promise.all(
    publicIds.map((id) =>
      cloudinary.uploader.destroy(id).catch((err) =>
        console.error(`[destroyOrgMedia] Failed to delete ${id}:`, err)
      )
    )
  );
}
