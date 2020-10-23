/* eslint-disable no-unused-expressions */
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import List from './List';

const BorderBox = styled.div`
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 10px;
  padding-right: 10px;

`;
const Header = styled.h1`
  font-family: Graphik,Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -.016rem;
  font-size: 1.3rem;
  line-height: 2.6rem;
  margin-left: 17%;

`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
    };
    this.getProductList = this.getProductList.bind(this);
  }

  componentDidMount() {
    let id = window.location.pathname.split('/');
    id = id[id.length - 2];
    id ? this.getProductList(id) : this.getProductList(1);
  }

  getProductList(product_id) {
    axios(`/api/relatedItems/${product_id}`)
      .then(({ data }) => { this.setState({ productList: data }); })
      .catch((err) => err);
  }

  render() {
    const { productList } = this.state;
    let toRender = null;
    if (productList.length === 0) {
      toRender = <div>LOADING</div>;
    } else {
      toRender = <List list={productList} />;
    }
    return (
      <div>
        <div>
          <Header id="related-item-header"> Top picks for you </Header>
          <BorderBox>
            {toRender}
          </BorderBox>
        </div>
      </div>
    );
  }
}

export default App;
