import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DefaultProfile from '@/assets/icons/ic_default_profile.svg';
import EditIcon from '@/assets/icons/ic_edit.svg';

interface ProfileImageUploadProps {
  imageFile?: File | string | null;
  onFileChange: (file: File) => void;
  className?: string;
  profileSize?: number;
  editIconSize?: number;
  offsetX?: number;
  offsetY?: number;
}

export default function ProfileImageUpload({
  imageFile,
  onFileChange,
  className = '',
  profileSize = 56,
  editIconSize = 22,
  offsetX = 38,
  offsetY = 20,
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }

    if (typeof imageFile === 'string') {
      setPreview(imageFile);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className={`relative ml-1 ${className}`}>
      {preview ? (
        <Image
          src={preview}
          alt="프로필 미리보기"
          width={profileSize}
          height={profileSize}
          className="rounded-full object-cover"
        />
      ) : (
        <DefaultProfile
          alt="기본 프로필"
          width={profileSize}
          height={profileSize}
        />
      )}

      <label
        htmlFor="profile-upload"
        className="absolute cursor-pointer hover:opacity-80"
        style={{
          transform: `translate(${offsetX}px, -${offsetY}px)`,
        }}
      >
        <EditIcon width={editIconSize} height={editIconSize} />
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
