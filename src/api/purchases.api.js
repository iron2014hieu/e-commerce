import { purchasesStatus } from 'src/constants/status'
import http from 'src/utils/http'

const URL = 'purchases'
const purchasesApi = {
  addToCart(data) {
    return http.post(`${URL}/add-to-cart`, data)
  },
  getCartPurChases() {
    return http.get(URL, {
      params: {
        status: purchasesStatus.inCart
      }
    })
  },
  getPurchases(status) {
    return http.get(URL, {
      params: {
        status
      }
    })
  },
  updatePurChase(data) {
    return http.put(`${URL}/update-purchase`, data)
  },
  deletePurchases(data) {
    return http.delete(`${URL}`, data)
  },
  buyPurchases(data) {
    return http.post(`${URL}/buy-products`, data)
  }
}
export default purchasesApi
