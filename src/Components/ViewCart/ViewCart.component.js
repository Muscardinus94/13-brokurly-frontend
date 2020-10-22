import React, { Component } from "react";
import { connect } from "react-redux";

import CartItem from "../CartItem/CartItem.component";

import {
  toggleAllSelectCheckBox,
  deleteSelectedItems,
  selectedItemsTotalPrice,
  checkStatusAllSelectCheckBox,
} from "../../redux/cart/cart.actions";

import "./ViewCart.styles.scss";

class ViewCart extends Component {
  render() {
    const {
      cartItems,
      allSelect,
      toggleAllSelectCheckBox,
      deleteSelectedItems,
      selectedItemsTotalPrice,
      checkStatusAllSelectCheckBox,
    } = this.props;
    return (
      <div className="View-cart">
        <div className="selected-items">
          <div className="selected-items-header">
            <div className="selected-items-header-select">
              <label>
                <input
                  type="checkbox"
                  onChange={() => {
                    toggleAllSelectCheckBox();
                    selectedItemsTotalPrice();
                  }}
                  checked={allSelect ? true : false}
                />
              </label>
              <span className="select-all">
                전체선택 (<span className="count">0</span>/
                <span className="total">0</span>)
              </span>
            </div>
            <div className="selected-items-header-info">
              <span>상품정보</span>
            </div>
            <div className="selected-items-header-count">
              <span>수량</span>
            </div>
            <div className="selected-items-header-cost">
              <span>상품금액</span>
            </div>
          </div>
          <div className="selected-items-info">
            {cartItems.map((cartItem, idx) => (
              <CartItem key={idx} cartItemInfo={cartItem} />
            ))}
          </div>
        </div>
        <div className="selected-options-container">
          <div className="selected-options">
            <div className="select-all">
              <div>
                <input
                  type="checkbox"
                  onChange={() => {
                    toggleAllSelectCheckBox();
                    selectedItemsTotalPrice();
                  }}
                  checked={allSelect ? "checked" : ""}
                />
              </div>
              <span>전체선택 (2/2)</span>
            </div>
            <button
              className="select-delete"
              onClick={() => {
                deleteSelectedItems();
                selectedItemsTotalPrice();
                checkStatusAllSelectCheckBox();
              }}
            >
              선택 삭제
            </button>
            <button className="sold-out-delete">품절 상품 삭제</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems,
  allSelect: cart.allSelect,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAllSelectCheckBox: () => dispatch(toggleAllSelectCheckBox()),
  deleteSelectedItems: () => dispatch(deleteSelectedItems()),
  selectedItemsTotalPrice: () => dispatch(selectedItemsTotalPrice()),
  checkStatusAllSelectCheckBox: () => dispatch(checkStatusAllSelectCheckBox()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart);
