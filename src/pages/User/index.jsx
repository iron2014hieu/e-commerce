import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import path from 'src/constants/path'
import Password from './Password'
import Profile from './Profile'
import Purchase from './Purchase'
import * as S from './user.style'

export default function User() {
  const profile = useSelector(state => state.auth.profile)
  useEffect(() => {
    document.title = 'Shopee - Cá nhân'
  }, [])
  return (
    <S.Container className="container">
      <S.Sidebar>
        <S.Brief>
          <S.BriefAvatar to={path.profile}>
            <img
              src="https://cf.shopee.vn/file/33ad2f03133306e456484f41af2ea8ba_tn"
              alt=""
            />
          </S.BriefAvatar>
          <S.BriefRight>
            <S.BriefRightUserName>
              {profile.name || profile.email}
            </S.BriefRightUserName>
            <S.BriefRightEdit to="">
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: 4 }}
              >
                <path
                  d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                  fill="#9B9B9B"
                  fillRule="evenodd"
                />
              </svg>
              Sửa hồ sơ
            </S.BriefRightEdit>
          </S.BriefRight>
        </S.Brief>
        <S.SidebarMenu>
          <S.SidebarMenuEntry to={path.profile}>
            <S.SidebarMenuEntryIcon>
              <img
                src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
                alt=""
              />
            </S.SidebarMenuEntryIcon>
            Tài khoản của tôi
          </S.SidebarMenuEntry>
          <S.SidebarMenuEntry to={path.password}>
            <S.SidebarMenuEntryIcon>
              <img
                src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
                alt=""
              />
            </S.SidebarMenuEntryIcon>
            Đổi mật khẩu
          </S.SidebarMenuEntry>
          <S.SidebarMenuEntry to={path.purchase}>
            <S.SidebarMenuEntryIcon>
              <img
                src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
                alt=""
              />
            </S.SidebarMenuEntryIcon>
            Đơn mua
          </S.SidebarMenuEntry>
        </S.SidebarMenu>
      </S.Sidebar>
      <S.Main>
        <Switch>
          <Route path={path.user} exact>
            <Redirect to={path.profile} />
          </Route>
          <Route path={path.profile}>
            <Profile />
          </Route>
          <Route path={path.password}>
            <Password />
          </Route>
          <Route path={path.purchase}>
            <Purchase />
          </Route>
        </Switch>
      </S.Main>
    </S.Container>
  )
}
