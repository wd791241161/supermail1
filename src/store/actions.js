import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {

  addCart(/** (state,commit)*/context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量增加了1')
        //oldProduct.count += 1
      } else {
        payload.count = 1
        //context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}