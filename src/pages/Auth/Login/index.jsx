import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button } from 'src/assets/styles/util'
import ErrorMessage from 'src/components/ErrorMessage'
import InputPassword from 'src/components/InputPassword'
import InputText from 'src/components/InputText'
import path from 'src/constants/path'
import rules from 'src/constants/rules'
import { login } from '../auth.slice'
import * as S from '../Register/register.style'
export default function Login() {
  const {
    handleSubmit,
    getValues,
    formState: { errors },
    control,
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogin = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      await dispatch(login(body))
      history.push(path.home)
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
    <S.StyledRegister>
      <S.Container className="container">
        <S.Form onSubmit={handleSubmit(handleLogin)} noValidate>
          <S.FormTitle>Đăng nhập</S.FormTitle>
          <S.FormControl>
            <Controller
              control={control}
              name="email"
              rules={rules.email}
              render={({ field }) => (
                <InputText
                  onChange={field.onChange}
                  value={getValues('email')}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              )}
            />
            <ErrorMessage errors={errors} name="email" />
          </S.FormControl>
          <S.FormControl>
            <Controller
              name="password"
              rules={rules.password}
              control={control}
              render={({ field }) => (
                <InputPassword
                  value={getValues('password')}
                  onChange={field.onChange}
                  name="password"
                  placeholder="Mật khẩu"
                />
              )}
            />
            <ErrorMessage errors={errors} name="password" />
          </S.FormControl>
          <S.FormButton>
            <Button type="submit">Đăng nhập</Button>
          </S.FormButton>
          <S.FormFooter>
            <span>Bạn chưa có tài khoản</span>
            <Link to={path.register} className="link">
              Đăng ký
            </Link>
          </S.FormFooter>
        </S.Form>
      </S.Container>
    </S.StyledRegister>
  )
}
