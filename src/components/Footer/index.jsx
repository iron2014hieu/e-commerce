import React from 'react'
import * as S from './footer.style'
export default function Footer() {
  const contentFoo = {
    foo1: [
      'trung Tâm Trợ Giúp',
      'Shopee Blog',
      'Shopee Mall',
      'Hướng Dẫn Mua Hàng',
      'Hướng Dẫn Bán Hàng',
      'Thanh Toán',
      'Shopee Xu',
      'Vận Chuyển',
      'Trả Hàng & Hoàn Tiền',
      'Chăm Sóc Khách Hàng',
      'Chính Sách Bảo Hành'
    ],
    foo2: [
      'Giới Thiệu Về Shopee Việt Nam',
      'Tuyển Dụng',
      'Điều Khoản Shopee',
      'Chính Sách Bảo Mật',
      'Chính Hãng',
      'Kênh Người Bán',
      'Flash Sales',
      'Chương Trình Tiếp Thị Liên Kết Shopee',
      'Liên Hệ Với Truyền Thông'
    ]
  }
  return (
    <S.StyledFooter>
      <div className="container">
        <S.Footer1>
          <div>
            <S.Title>Chăm sóc khách hàng</S.Title>
            <S.FooUl>
              {contentFoo.foo1.map((item, index) => (
                <S.FooLi key={index}>
                  <S.FooLink to="" className="nav-link">
                    {item}
                  </S.FooLink>
                </S.FooLi>
              ))}
            </S.FooUl>
          </div>
          <div>
            <S.Title>về shopee</S.Title>
            <S.FooUl>
              {contentFoo.foo2.map((item, index) => (
                <S.FooLi key={index}>
                  <S.FooLink to="" className="nav-link">
                    {item}
                  </S.FooLink>
                </S.FooLi>
              ))}
            </S.FooUl>
          </div>
          <div>
            <S.Title>Theo dỏi chúng tôi trên</S.Title>
          </div>
          <div>
            <S.Title>tải ứng dụng shopee ngay thôi</S.Title>
          </div>
        </S.Footer1>
        <S.Footer2>
          <S.FooContact>
            Địa chỉ: Tầng 28, Tòa nhà trung tâm Lotte Hà Nội, 54 Liễu Giai,
            phường Cống Vị, Quận Ba Đình, Hà Nội. Tổng đài hỗ trợ: 19001221 -
            Email: cskh@hotro.shopee.vn
          </S.FooContact>
          <S.FooContact>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên
            hệ: 024 73081221 (ext 4678)
          </S.FooContact>
          <S.FooContact>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp
            lần đầu ngày 10/02/2015
          </S.FooContact>
          <S.FooContact>
            © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
          </S.FooContact>
        </S.Footer2>
      </div>
    </S.StyledFooter>
  )
}
