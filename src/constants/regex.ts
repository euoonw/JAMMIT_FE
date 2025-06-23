export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const PASSWORD_RULE = {
  required: '비밀번호는 필수 입력입니다.',
  pattern: {
    value: PASSWORD_REGEX,
    message: '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
  },
};
