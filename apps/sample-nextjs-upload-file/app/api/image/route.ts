import { NextApiRequest } from 'next';
import { getXataClient } from '../../../utils/xata';

const xata = getXataClient();

export const runtime = 'edge';
export const preferredRegion = 'iad1';

// A delete function to handle requests to delete an image
export async function DELETE(req: NextApiRequest) {
  // Get the imageId from the query string
  const url = new URL(req.url as string, `http://${req.headers.host}`);
  const imageId = url.searchParams.get('imageId');

  if (!imageId || Array.isArray(imageId)) {
    return new Response(JSON.stringify({ message: 'imageId not found' }), {
      status: 404
    });
  }

  // Delete the image
  await xata.db.images.delete(imageId);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

// A post function to handle requests to create an image record
export async function POST(req: Request) {
  // Get the form data
  const formData = await req.formData();
  const fileType = formData.get('fileType') as string;

  // Create an empty image record with no base64 content
  const record = await xata.db.images.create(
    { image: { mediaType: fileType, base64Content: '' } },
    // Request an uploadUrl from the created record. We can use it to upload a file to replace the dummy one
    ['*', 'image.uploadUrl']
  );

  // Xata provides a toSerializable() method to convert the record to a plain JSON object
  // This is needed for Next.js on the client side
  return new Response(JSON.stringify(record.toSerializable()), { status: 200 });
}
