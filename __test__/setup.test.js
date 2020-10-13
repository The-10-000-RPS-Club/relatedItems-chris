/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import request from 'supertest';
import mongoose from 'mongoose';
import App from '../client/src/components/App';
import List from '../client/src/components/List';
import app from '../server/index';

Enzyme.configure({ adapter: new Adapter() });

// this is the data to test against

const productList = [{
  product_id: 100,
  manufacturer: 'Morar Group',
  item_name: 'Tasty Cotton Chips',
  rating: 0.753092278577937,
  number_of_ratings: 496,
  price: 267,
  onSalePrice: 225.84,
  product_url: 'https://fecimagesghrsea12.s3-us-west-1.amazonaws.com/pics/image100.jpg',
  onSale: true,
  __v: 0,
  _id: 12345,
},
{
  product_id: 90,
  manufacturer: 'Gusikowski, Kohler and Pacocha',
  item_name: 'Intelligent Plastic Shoes',
  rating: 3.655240113863547,
  number_of_ratings: 345,
  price: 925,
  onSalePrice: 785.84,
  product_url: 'https://fecimagesghrsea12.s3-us-west-1.amazonaws.com/pics/image90.jpg',
  onSale: true,
  __v: 0,
  _id: 1345,
},
{
  product_id: 89,
  manufacturer: 'Gleason, Pacocha and Hyatt',
  item_name: 'Fantastic Metal Towels',
  rating: 4.510381807800804,
  number_of_ratings: 0,
  price: 324,
  onSalePrice: 274.84,
  product_url: 'https://fecimagesghrsea12.s3-us-west-1.amazonaws.com/pics/image89.jpg',
  onSale: false,
  __v: 0,
  _id: 1235,
}];

describe('App component', () => {
  it('should render component', () => {
    expect(shallow(<App />).contains(<div id="list-container">Bar</div>)).toBe(false);
    expect(shallow(<App />).contains(<div>LOADING</div>)).toBe(true);
  });
});

describe('List component', () => {
  it('should contain rendered items', () => {
    const wrapper = shallow(<List list={productList} />);
    expect(wrapper.text()).toContain('Morar Group');
    expect(wrapper.text()).toContain('Tasty Cotton Chips');
    expect(wrapper.text()).toContain('267');
  });

  it('should render items', () => {
    const tree = renderer
      .create(<List list={productList} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

beforeAll((done) => {
  done();
});
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe('Get /api/products/:id/relatedItems', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/api/products/5/relatedItems')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
