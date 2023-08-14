import { NextResponse } from 'next/server';
import slugify from 'slugify';
import { v4 as uuid } from 'uuid';
import { getXataClient } from '~/utils/xata';

const xata = getXataClient();

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const name = formData.get('name');
  const tags = formData.get('tags');

  const tagsArray = tags ? (tags as string).split(',').map((tag) => tag.trim()) : [];

  const fileName: string = file.name;
  const fileData = await file.arrayBuffer().then((buffer) => Buffer.from(buffer));
  const mimeType = file.type;

  const record = await xata.db.image.create({
    name: name as string,
    image: {
      name: fileName,
      mediaType: mimeType,
      base64Content: fileData.toString('base64')
    }
  });

  console.log('record', record);

  await xata.db.tag.createOrUpdate([
    ...tagsArray.map((tag) => ({
      id: slugify(tag, { lower: true }),
      name: tag
    }))
  ]);

  if (tagsArray.length > 0 && record.id) {
    await xata.db['tag-to-image'].create(
      // Create an array of objects with the tag id and image id
      tagsArray.map((tag) => ({
        id: uuid(),
        tag: slugify(tag, { lower: true }),
        image: record.id
      }))
    );
  }

  return NextResponse.json({ success: true, record });
}
