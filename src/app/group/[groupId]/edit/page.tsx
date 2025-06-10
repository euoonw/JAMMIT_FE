'use client';
import { useParams } from 'next/navigation';

export default function EditPage() {
  const { groupId } = useParams();
  return <> 모임 {groupId} 수정 페이지</>;
}
