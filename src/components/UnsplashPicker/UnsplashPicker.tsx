import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { defaultImages } from '../../assets/default-images/images';
import { Link } from 'react-router-dom';

interface UnsplashPickerProps {
  onSetImageUrl: (arg0: string) => void;
}

export const UnsplashPicker = ({ onSetImageUrl }: UnsplashPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });

        if (result && result.response) {
          const images = result.response as Array<Record<string, any>>;
          setImages(images);
        } else {
          console.error('Failed to get images from unsplash');
        }
      } catch (error) {
        console.error(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <Loader2 className='h-6 w-6 text-indigo-600 animate-spin' />
      </div>
    );
  }
  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={cn(
                'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted'
              )}
              onClick={() => {
                setSelectedImageId(image.id);
                const imageUrl = `${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`;
                onSetImageUrl(imageUrl);
              }}
            >
              {selectedImageId === image.id && (
                <div className='absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
                  <Check className='h-4 w-4 text-white' />
                </div>
              )}
              <img
                src={image.urls.thumb}
                alt='Unsplash img'
                className='object-cover rounded-sm h-[100%] w-full'
              />
              <Link
                to={image.links.html}
                target='_blank'
                className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[0.625rem] truncate text-white hover:underline p-1 bg-black/50'
              >
                {image.user.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
