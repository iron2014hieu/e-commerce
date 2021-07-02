import { unwrapResult } from '@reduxjs/toolkit'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import ErrorMessage from 'src/components/ErrorMessage'
import InputPassword from 'src/components/InputPassword'
import rules from 'src/constants/rules'
import { updateMe } from 'src/pages/Auth/auth.slice'
import * as S from '../Profile/profile.style'
import { PasswordContent } from './password.style'

export default function Password() {
  const dispatch = useDispatch()
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_new_password: ''
    }
  })

  const updatePassword = async data => {
    const body = {
      password: data.password,
      new_password: data.new_password
    }
    try {
      await dispatch(updateMe(body)).then(unwrapResult)
      toast.success('Đổi mật khẩu thành công', {
        position: 'top-center',
        autoClose: 2000
      })
      reset()
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: 'server',
            message: error.data[key]
          })
        }
      }
    }
  }
  return (
    <S.Profile>
      <S.ProfileHeader>Đổi mật khẩu</S.ProfileHeader>
      <S.ProfileHeaderSubTitle>
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
      </S.ProfileHeaderSubTitle>
      <PasswordContent onSubmit={handleSubmit(updatePassword)} noValidate>
        <S.InputLabel>
          <S.InputLabelTitle>Mật khẩu</S.InputLabelTitle>
          <S.InputLabelContent>
            <Controller
              control={control}
              name="password"
              rules={rules.password}
              render={({ field }) => (
                <InputPassword
                  name="password"
                  value={getValues('password')}
                  onChange={field.onChange}
                />
              )}
            />
            <ErrorMessage name="password" errors={errors} />
          </S.InputLabelContent>
        </S.InputLabel>
        <S.InputLabel>
          <S.InputLabelTitle>mật khẩu mới</S.InputLabelTitle>
          <S.InputLabelContent>
            <Controller
              control={control}
              name="new_password"
              rules={{
                ...rules.password,
                validate: v =>
                  v !== getValues('password') ||
                  'Mật khẩu mới phải khác mật khẩu cũ'
              }}
              render={({ field }) => (
                <InputPassword
                  name="new_password"
                  value={getValues('new_password')}
                  onChange={field.onChange}
                />
              )}
            />
            <ErrorMessage name="new_password" errors={errors} />
          </S.InputLabelContent>
        </S.InputLabel>
        <S.InputLabel>
          <S.InputLabelTitle>Xác nhận Mật khẩu</S.InputLabelTitle>
          <S.InputLabelContent>
            <Controller
              control={control}
              name="confirm_new_password"
              rules={{
                ...rules.password,
                validate: {
                  samePassword: v =>
                    v === getValues('new_password') ||
                    'Mật khẩu xác nhận không khớp'
                }
              }}
              render={({ field }) => (
                <InputPassword
                  name="confirm_new_password"
                  value={getValues('confirm_new_password')}
                  onChange={field.onChange}
                />
              )}
            />
            <ErrorMessage name="confirm_new_password" errors={errors} />
          </S.InputLabelContent>
        </S.InputLabel>
        <S.Submit>
          <S.ButtonSubmit type="submit">Lưu</S.ButtonSubmit>
        </S.Submit>
      </PasswordContent>
    </S.Profile>
  )
}
