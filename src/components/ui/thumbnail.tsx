import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { formatFileSize } from '@/lib/helpers';

type ThumbnailProps = {
  url: string | null | undefined;
  name: string | undefined;
  size: number | undefined;
};

const Thumbnail = ({ url, name, size }: ThumbnailProps) => {
  if (!url || !size) return null;

  return (
    <Dialog>
      <div className='pb-3'>
        <DialogTrigger asChild>
          <div className='cursor-pointer max-w-[200px] bg-background border border-border rounded-lg p-1.5 flex items-center gap-3 justify-start'>
            <img
              src={url}
              alt='uploaded image'
              width={50}
              height={50}
              className='rounded-lg overflow-hidden object-cover'
            />
            <div>
              <p className='text-xs font-medium line-clamp-1'>
                {name || 'Untitled'}
              </p>
              <p className='text-xs text-muted-foreground'>
                {formatFileSize(size)}
              </p>
            </div>
          </div>
        </DialogTrigger>
      </div>
      <DialogContent className='max-w-[550px] border-none bg-transparent p-0 shadow-none'>
        <DialogTitle className='hidden' />
        <img
          src={url}
          alt='Message image'
          className='rounded-md object-cover size-full'
        />
      </DialogContent>
    </Dialog>
  );
};

export default Thumbnail;
