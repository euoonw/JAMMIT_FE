import React from 'react';

interface TitleBlockProps {
  title: string;
  author: string;
}

export default function TitleBlock({ title, author }: TitleBlockProps) {
  return (
    <>
      <div className="mt-5 truncate text-lg leading-none font-semibold">
        {title}
      </div>
      <div className="mt-5 leading-none text-gray-300">{author}</div>
    </>
  );
}
