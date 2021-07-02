import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button } from 'src/assets/styles/util'
import ErrorMessage from 'src/components/ErrorMessage'
import InputPassword from 'src/components/InputPassword'
import InputText from 'src/components/InputText'
import path from 'src/constants/path'
import rules from 'src/constants/rules'
import { register } from '../auth.slice'
import * as S from './register.style'
export default function Register() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  const dispatch = useDispatch()
  const history = useHistory()

  const handleRegister = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      await dispatch(register(body))
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
        <S.Form onSubmit={handleSubmit(handleRegister)} noValidate>
          <S.FormTitle>Đăng ký</S.FormTitle>
          <S.FormControl>
            <Controller
              name="email"
              control={control}
              rules={rules.email}
              render={({ field }) => (
                <InputText
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={field.onChange}
                  value={getValues('email')}
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
          <S.FormControl>
            <Controller
              name="confirmPassword"
              rules={{
                ...rules.confirmedPassword,
                validate: {
                  samePassword: v =>
                    v === getValues('password') || 'Mật khẩu không khớp'
                }
              }}
              control={control}
              render={({ field }) => (
                <InputPassword
                  value={getValues('confirmPassword')}
                  onChange={field.onChange}
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                />
              )}
            />
            <ErrorMessage errors={errors} name="confirmPassword" />
          </S.FormControl>
          <S.FormButton>
            <Button type="submit">Đăng ký</Button>
          </S.FormButton>
          <S.FormFooter>
            <span>Bạn đã có tài khoản</span>
            <Link to={path.login} className="link">
              Đăng nhập
            </Link>
          </S.FormFooter>
        </S.Form>
      </S.Container>
    </S.StyledRegister>
  )
}
