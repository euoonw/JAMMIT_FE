'use client';
import { useAuthStore } from '@/stores/useAuthStore';
import React, { useState } from 'react';

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const { accessToken } = useAuthStore();
  const handleUpload = async () => {
    if (!file) {
      return setMessage('파일 선택해');
    }
    try {
      // STEP 1. 업로드용 URL 발급
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL_NEST}/video/uploadUrl`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const { uploadUrl, uploadId } = await res.json();
      if (!uploadUrl || !uploadId) throw new Error('업로드 URL 발급 실패');
      // STEP 2. Mux로 직접 업로드
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });
      if (!uploadRes.ok) throw new Error('Mux 업로드 실패');
      // STEP 3. 백엔드에 업로드 정보 등록
      const register = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL_NEST}/video/register`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uploadId,
            title: '테스트 영상 제목',
            description: '설명 예시',
          }),
        },
      );
      if (!register.ok) throw new Error('영상 등록 실패');
      const result = await register.json();
      console.log(result);
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
    }
  };
  return (
    <div className="p-8">
      <h1>mux 업로드 테스트</h1>
      <input
        type="file"
        accept="video/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFile(e.target.files?.[0] || null)
        }
      />
      <button
        onClick={handleUpload}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        업로드
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
