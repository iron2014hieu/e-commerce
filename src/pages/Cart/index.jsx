import * as S from './cart.style'
import CheckBox from 'src/components/CheckBox'
import ProductQuantityController from 'src/components/ProductQuantityController'
import { useSelector } from 'react-redux'
import { convertArrayToObject, formatMoney } from 'src/utils/helper'
import { useEffect, useState } from 'react'
import { createNextState, unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {
  buyPurchases,
  deletePurchases,
  getCartPurChases,
  updatePurChase
} from './cart.slice'
import { toast } from 'react-toastify'
// import keyBy from 'lodash/keyBy'

export default function Cart() {
  const purchases = useSelector(state => state.cart.purchases)
  const [localPurchases, setLocalPurchases] = useState(() =>
    createNextState(purchases, draft => {
      draft.forEach(purchase => {
        purchase.disabled = false
        purchase.checked = false
      })
    })
  )

  const dispatch = useDispatch()
  const isCheckedAll = localPurchases.every(purchase => purchase.checked)
  const checkedPurchases = localPurchases.filter(purchase => purchase.checked)
  const totalCheckedPurchases = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce(
    (result, current) => {
      return result + current.product.price * current.buy_count
    },
    0
  )
  const totalCheckedPurchasesSavingPrice = checkedPurchases.reduce(
    (result, current) => {
      return (
        result +
        (current.price_before_discount - current.price) * current.buy_count
      )
    },
    0
  )
  useEffect(() => {
    setLocalPurchases(localPurchases => {
      const localPurchasesObject = convertArrayToObject(localPurchases, '_id')

      return createNextState(purchases, draft => {
        draft.forEach(purchase => {
          purchase.disabled = false
          purchase.checked = Boolean(
            localPurchasesObject[purchase._id]?.checked
          )
        })
      })
    })
  }, [purchases])
  const handleInputQuantity = indexPurchase => value => {
    const newLocalPurchase = createNextState(localPurchases, draft => {
      draft[indexPurchase].buy_count = value
    })
    setLocalPurchases(newLocalPurchase)
  }
  const handleBlurQuantity = indexPurchase => async value => {
    const purchase = localPurchases[indexPurchase]
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = true
      })
    )
    await dispatch(
      updatePurChase({
        product_id: purchase.product._id,
        buy_count: value
      })
    ).then(unwrapResult)
    await dispatch(getCartPurChases()).then(unwrapResult)
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = false
      })
    )
  }
  const handleDecreaseAndIncrease = indexPurchase => async value => {
    const purchase = localPurchases[indexPurchase]
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = true
        draft[indexPurchase].buy_count = value
      })
    )
    await dispatch(
      updatePurChase({
        product_id: purchase.product._id,
        buy_count: value
      })
    ).then(unwrapResult)
    await dispatch(getCartPurChases()).then(unwrapResult)
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = false
      })
    )
  }
  const handleCheck = indexPurchase => value => {
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].checked = value
      })
    )
  }
  const handleCheckedAll = () => {
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft.forEach(purchase => {
          purchase.checked = !isCheckedAll
        })
      })
    )
  }
  const handleRemove = indexPurchase => async () => {
    const purchase_id = localPurchases[indexPurchase]._id
    await dispatch(deletePurchases([purchase_id]))
      .then(unwrapResult)
      .then(res => {
        toast.success(res.message, {
          position: 'top-center',
          autoClose: 2500
        })
      })
    await dispatch(getCartPurChases()).then(unwrapResult)
  }
  const handleRemoveManyPurchases = async () => {
    const purchase_ids = checkedPurchases.map(purchase => purchase._id)
    await dispatch(deletePurchases(purchase_ids))
      .then(unwrapResult)
      .then(res => {
        toast.success(res.message, {
          position: 'top-center',
          autoClose: 2500
        })
      })
    await dispatch(getCartPurChases()).then(unwrapResult)
  }
  const handleBuyPurchases = async () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map(purchase => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      await dispatch(buyPurchases(body)).then(unwrapResult)
      toast.success('Đặt hàng thành công', {
        position: 'top-center',
        autoClose: 2500
      })
      await dispatch(getCartPurChases()).then(unwrapResult)
    } else {
      toast.warning('Bạn vẫn chưa chọn sản phẩm nào để mua.', {
        position: 'bottom-center',
        autoClose: 3500
      })
    }
  }
  return (
    <div className="container">
      <S.ProductHeader>
        <S.ProductHeaderCheckbox>
          <CheckBox onChange={handleCheckedAll} checked={isCheckedAll} />
        </S.ProductHeaderCheckbox>
        <S.ProductHeaderName>Sản phẩm</S.ProductHeaderName>
        <S.ProductHeaderUnitPrice>Đơn giá</S.ProductHeaderUnitPrice>
        <S.ProductHeaderQuantity>Số lượng</S.ProductHeaderQuantity>
        <S.ProductHeaderTotalPrice>Số tiền</S.ProductHeaderTotalPrice>
        <S.ProductHeaderAction>Thao tác</S.ProductHeaderAction>
      </S.ProductHeader>
      <S.ProductSection>
        {localPurchases.map((purchase, index) => (
          <S.CartItem key={purchase._id}>
            <S.CartItemCheckbox>
              <CheckBox
                onChange={handleCheck(index)}
                checked={purchase.checked}
              />
            </S.CartItemCheckbox>
            <S.CartItemOverview>
              <S.CartItemOverviewImage to="">
                <img src={purchase.product.image} alt="" />
              </S.CartItemOverviewImage>
              <S.CartItemOverviewNameWrapper>
                <S.CartItemOverviewName to="">
                  {purchase.product.name}
                </S.CartItemOverviewName>
              </S.CartItemOverviewNameWrapper>
            </S.CartItemOverview>
            <S.CartItemUnitPrice>
              <span>
                đ{formatMoney(purchase.product.price_before_discount)}
              </span>
              <span>đ{formatMoney(purchase.product.price)}</span>
            </S.CartItemUnitPrice>
            <S.CartItemQuantity>
              <ProductQuantityController
                max={purchase.product.quantity}
                value={purchase.buy_count}
                disabled={purchase.disabled}
                onInput={handleInputQuantity(index)}
                onBlur={handleBlurQuantity(index)}
                onDecrease={handleDecreaseAndIncrease(index)}
                onIncrease={handleDecreaseAndIncrease(index)}
              />
            </S.CartItemQuantity>
            <S.CartItemTotalPrice>
              <span>
                đ{formatMoney(purchase.product.price * purchase.buy_count)}
              </span>
            </S.CartItemTotalPrice>
            <S.CartItemAction>
              <S.CartItemActionButton onClick={handleRemove(index)}>
                Xóa
              </S.CartItemActionButton>
            </S.CartItemAction>
          </S.CartItem>
        ))}
      </S.ProductSection>
      <S.CartFooter>
        <S.CartFooterCheckbox>
          <CheckBox onChange={handleCheckedAll} checked={isCheckedAll} />
        </S.CartFooterCheckbox>
        <S.CartFooterButton onClick={handleCheckedAll}>
          Chọn tất cả ({purchases.length})
        </S.CartFooterButton>
        <S.CartFooterButton onClick={handleRemoveManyPurchases}>
          Xóa
        </S.CartFooterButton>
        <S.CartFooterSpaceBetween />
        <S.CartFooterPrice>
          <S.CartFooterPriceTop>
            <div>Tổng thanh toán ({totalCheckedPurchases} sản phẩm): </div>
            <div>đ{formatMoney(totalCheckedPurchasesPrice)}</div>
          </S.CartFooterPriceTop>
          <S.CartFooterPriceBot>
            <div>đ{formatMoney(totalCheckedPurchasesSavingPrice)}</div>
          </S.CartFooterPriceBot>
        </S.CartFooterPrice>
        <S.CartFooterCheckout onClick={handleBuyPurchases}>
          Mua hàng
        </S.CartFooterCheckout>
      </S.CartFooter>
    </div>
  )
}
