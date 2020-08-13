import React from 'react';
import * as bs from 'react-bootstrap'
import './App.css';
import './index.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TopContainer from './top-container.js'
import BottomContainer from './bottom-container'
import LeftContainer from './left-container'
import RightContainer from './right-container'
import Home from './home'
import Help from './help'
import About from './about'
import ProductDetail from './product-detail'
import Cart from './cart'
import Checkout from './checkout'
import Receipt from './receipt'

function App() {
  return (
    <Router>
    <bs.Container fluid className='p-0 min-vh-100 d-flex flex-column'>
      <bs.Row noGutters className='flex-grow-0 flex-shrink-0 shadow'>
        <bs.Col className='px-3 py-2' style={{ backgroundColor: '#17446e' }}>
          <TopContainer />
        </bs.Col>
      </bs.Row>
      <bs.Row noGutters className='flex-grow-1'>
        <bs.Col md='2' className='px-3 py-4 shadow' style={{ backgroundColor: '#f0f0f0' }}>
          <LeftContainer />
        </bs.Col>
        <bs.Col md='10'>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/help'>
              <Help />
            </Route>
            <Route path='/product/:productID'>
              <ProductDetail />
            </Route>
            <Route path='/category/:categoryName'>
              <Home />
            </Route>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route path='/checkout'>
              <Checkout />
            </Route>
            <Route path='/receipt'>
              <Receipt />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </bs.Col>
        {/* <bs.Col md='2' className='px-3 py-4 shadow' style={{ backgroundColor: '#268c34' }}>
          <RightContainer />
        </bs.Col> */}
      </bs.Row>
      <bs.Row noGutters className='flex-grow-0 flex-shrink-0 shadow' style={{ backgroundColor: '#17446e' }}>
        <BottomContainer />
      </bs.Row>
    </bs.Container>
    </Router >
  );
}

export default App;
