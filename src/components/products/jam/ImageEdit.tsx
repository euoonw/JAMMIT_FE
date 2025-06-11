import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Button from '@/components/commons/Button';
import ModalImgEdit from './ModalImgEdit';
import { useFormContext } from 'react-hook-form';
import { RegisterGatheringsRequest } from '@/types/gather';
import EmptyImageIcon from '@/assets/icons/ic_emptyimage.svg';
import { imgChange } from '@/utils/imgChange';

export default function ImageEdit() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const { setValue, watch } = useFormContext<RegisterGatheringsRequest>();

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleSubmit = useCallback(
    (fileName: string) => {
      setSelectedFileName(fileName);
      setValue('thumbnail', fileName);
      setIsOpen(false);
    },
    [setValue],
  );

  useEffect(() => {
    const thumb = watch('thumbnail');
    if (thumb) {
      setSelectedFileName(thumb);
    }
  }, [watch]);

  const selectedImageSrc = selectedFileName
    ? imgChange(selectedFileName, 'banner')
    : null;

  return (
    <div className="relative mx-auto flex h-[22rem] w-full max-w-[84rem] items-center justify-center overflow-hidden rounded-[0.5rem] bg-[#393A41]">
      {selectedImageSrc ? (
        <>
          <Image
            src={selectedImageSrc}
            alt="선택된 이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute top-[1.25rem] right-[1.25rem]">
            <Button variant="outline" size="small" onClick={handleOpenModal}>
              이미지 수정
            </Button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="flex cursor-pointer flex-col items-center justify-center"
          onClick={handleOpenModal}
        >
          <EmptyImageIcon />
          <p className="text-base text-gray-100">이미지 선택</p>
        </button>
      )}
      {isOpen && (
        <ModalImgEdit
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
