import { NextResponse } from 'next/server';
import { getXataClient } from '~/utils/xata';

const xata = getXataClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  console.log('id', id);

  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing id' });
  }

  const linksFromImage = await xata.db['tag-to-image']
    .filter({
      'image.id': id
    })
    .getAll();

  await xata.db['tag-to-image'].delete(linksFromImage.map((link) => link.id));
  await xata.db.image.delete(id);

  return NextResponse.json({ success: true });
}
