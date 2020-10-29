import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProductList from "./Pages/ProductList/ProductList.component";
import SignupComponent from "./Pages/Signup/Signup.component";
import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.component";
import CartItems from "./Pages/CartItems/CartItems.component";
import SearchId from "./Pages/Login/SearchId/SearchId.component";
import SearchPwd from "./Pages/Login/SearchPwd/SearchPwd.component";
import Login from "./Pages/Login/Login.component";
import Signup from "./Pages/Signup/Signup.component";
// import MyPage from "./Pages/MyPage/MyPage.component";
import Payment from "./Pages/Payment/Payment.component";

import { getCartItems } from "./redux/cart/cart.actions";
import { GET_SHOPPINGBASKET_API } from "./config";

import "./App.scss";

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
    };
  }
  componentDidUpdate() {
    const { getCartItems, userToken } = this.props;
    userToken &&
      fetch(GET_SHOPPINGBASKET_API, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: userToken,
        },
      })
        .then((res) => res.json())
        .then((data) => data["shopping_list"])
        .then((cartItems) => getCartItems(cartItems));
  }
  componentDidMount() {
    this.addScrollEventAndFetchCartItemList();
  }
  scrollNavBarChange = () => {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > 50 && this.state.hidden === false)
      this.setState({ hidden: true });
    if (currentScrollTop < 50 && this.state.hidden === true)
      this.setState({ hidden: false });
  };
  addScrollEventAndFetchCartItemList = () => {
    const { getCartItems, currentUser, userToken } = this.props;
    window.addEventListener("scroll", this.scrollNavBarChange);
    Object.keys(currentUser).length &&
      fetch(GET_SHOPPINGBASKET_API, {
        headers: {
          "content-type": "application/json",
          Authorization: userToken,
        },
      })
        .then((res) => res.json())
        .then((data) => data["shopping_list"])
        .then((cartItems) => getCartItems(cartItems));
  };
  render() {
    const { hidden } = this.state;
    return (
      <Router>
        <Nav hidden={hidden} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/cartItems" component={CartItems} />
            <Route exact path="/productlist" component={ProductList} />
            <Route
              exact
              path="/productdetails/:id"
              component={ProductDetails}
            />
            <Route exact path="/signup" component={SignupComponent} />
            <Route exact path="/searchid" component={SearchId} />
            <Route exact path="/searchpwd" component={SearchPwd} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/mypage" component={MyPage} /> */}
            <Route exact path="/payment" component={Payment} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}
export default connect(mapStateToProps, { getCartItems })(Routes);