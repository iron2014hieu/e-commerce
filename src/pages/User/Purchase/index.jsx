import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/status'
import useQuery from 'src/hooks/useQuery'
import * as S from './purchase.style'
import qs from 'query-string'
import { getPurchases } from '../user.slice'
import { formatMoney, generateNameId } from 'src/utils/helper'

export default function Purchase() {
  const [purchases, setPurchases] = useState([])
  const dispatch = useDispatch()
  const query = useQuery()
  const status = useMemo(() => query.status || purchasesStatus.all, [query])
  useEffect(() => {
    dispatch(getPurchases(status))
      .then(unwrapResult)
      .then(res => {
        setPurchases(res.data)
      })
  }, [dispatch, status])
  const handleActive = value => () => Number(value) === Number(status)

  return (
    <div>
      <S.PurchaseTabs>
        <S.PurchaseTabsItem
          isActive={handleActive(purchasesStatus.all)}
          to={{
            pathname: path.purchase
          }}
        >
          Tất cả
        </S.PurchaseTabsItem>
        <S.PurchaseTabsItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchasesStatus.waitForConfirmation
            })}`
          }}
          isActive={handleActive(purchasesStatus.waitForConfirmation)}
        >
          Chờ xác nhận
        </S.PurchaseTabsItem>
        <S.PurchaseTabsItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchasesStatus.waitForGetting
            })}`
          }}
          isActive={handleActive(purchasesStatus.waitForGetting)}
        >
          Chờ lấy hàng
        </S.PurchaseTabsItem>
        <S.PurchaseTabsItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchasesStatus.inProgress
            })}`
          }}
          isActive={handleActive(purchasesStatus.inProgress)}
        >
          Đang giao
        </S.PurchaseTabsItem>
        <S.PurchaseTabsItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchasesStatus.delivered
            })}`
          }}
          isActive={handleActive(purchasesStatus.delivered)}
        >
          Đã giao
        </S.PurchaseTabsItem>
        <S.PurchaseTabsItem
          to={{
            pathname: path.purchase,
            search: `?${qs.stringify({
              status: purchasesStatus.cancelled
            })}`
          }}
          isActive={handleActive(purchasesStatus.cancelled)}
        >
          Đã hủy
        </S.PurchaseTabsItem>
      </S.PurchaseTabs>
      <S.PurchaseList>
        {purchases.map(purchase => (
          <S.OrderCard key={purchase._id}>
            <S.OrderCardContent>
              <S.OrderCardDetail>
                <img src={purchase.product.image} alt="" />
                <S.OrderContent>
                  <S.OrderName>{purchase.product.name}</S.OrderName>
                  <S.OrderQuantity>x {purchase.buy_count}</S.OrderQuantity>
                </S.OrderContent>
              </S.OrderCardDetail>
              <S.OrderCardPrice>
                đ{formatMoney(purchase.product.price)}
              </S.OrderCardPrice>
            </S.OrderCardContent>
            <S.OrderCardButtonContainer>
              <S.PurchaseButton
                to={path.product + `/${generateNameId(purchase.product)}`}
                light={1}
              >
                Xem sản phẩm
              </S.PurchaseButton>
              <S.TotalPrice>
                <S.TotalPriceLabel>Tổng giá tiền</S.TotalPriceLabel>
                <S.TotalPricePrice>
                  đ{formatMoney(purchase.buy_count * purchase.product.price)}
                </S.TotalPricePrice>
              </S.TotalPrice>
            </S.OrderCardButtonContainer>
          </S.OrderCard>
        ))}
      </S.PurchaseList>
    </div>
  )
}
