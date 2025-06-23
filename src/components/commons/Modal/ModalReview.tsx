import React, { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ModalWrapper from './ModalWrapper';
import TextArea from '../Textarea';
import Button from '../Button';
import { ReviewFormData } from '@/types/modal';
import TagSection from '../TagSection';

const REVIEW_TAGS = [
  '🎸 연주 실력이 좋아요',
  '📒 곡 준비를 잘 해왔어요',
  '🙌 다른 파트와의 호흡이 잘 맞아요',
  '📚 악보나 연습 자료를 잘 공유해줬어요',
  '🤘 분위기를 잘 이끌어요',
  '🤝 팀워크가 좋고 함께 연주하기 편했어요',
  '♪ 볼륨이나 톤을 배려해줘요',
  '⏰ 합주 시간 약속을 잘 지켜요',
];

interface ModalReviewProps {
  /** "리뷰등록" 버튼 클릭 시 실행할 콜백 */
  onSubmit: (data: { review: string; tags: string[] }) => void;
  /** "x"버튼 또는 "취소" 버튼 클릭 시 실행할 콜백 */
  onCancel: () => void;
  revieweeNickname: string;
}

export default function ModalReview({
  onCancel,
  onSubmit,
  revieweeNickname,
}: ModalReviewProps) {
  const methods = useForm<ReviewFormData>({
    defaultValues: {
      tags: [],
      review: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit, watch, setValue } = methods;
  const tags = watch('tags') || [];
  const isValid = tags.length > 0;

  const handleTagChange = useCallback(
    (selected: string[]) => {
      setValue('tags', selected);
    },
    [setValue],
  );

  const tagSections = [
    {
      key: 'tags',
      label: '태그',
      tags: REVIEW_TAGS,
      initialSelected: tags,
      onChange: handleTagChange,
    },
  ];

  return (
    <ModalWrapper
      title="리뷰쓰기"
      onClose={onCancel}
      className="tab:w-[32.5rem] relative h-auto w-full rounded-lg bg-[#242429] p-[1.5rem] text-gray-100"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[2rem]"
        >
          <div className="flex flex-col gap-[2rem]">
            <div className="flex flex-col gap-[0.75rem]">
              <div className="flex flex-col gap-[0.5rem]">
                {tagSections.map(({ key, tags, initialSelected, onChange }) => (
                  <TagSection
                    key={key}
                    label={`${revieweeNickname}님과의 합주 경험은 어땠나요?`}
                    tags={tags}
                    initialSelected={initialSelected}
                    onChange={onChange}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[0.75rem]">
              <p className="text-lg font-semibold">
                경험에 대해 자유롭게 남겨주세요.(선택)
              </p>
              <TextArea
                name="review"
                placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
                rules={{
                  maxLength: {
                    value: 500,
                    message: '소개글은 500자 이내로 입력해주세요.',
                  },
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" size="large" onClick={onCancel}>
              취소
            </Button>
            <Button
              variant="solid"
              size="large"
              disabled={!isValid}
              type="submit"
            >
              리뷰 등록
            </Button>
          </div>
        </form>
      </FormProvider>
    </ModalWrapper>
  );
}
