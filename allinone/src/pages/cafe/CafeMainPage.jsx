import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';
import Responsive from '../../common/Responsive';
import { Col, Container, Row } from 'react-bootstrap';
import CafeSearchContainer from '../../containers/cafe/CafeSearchContainer';
import CafeSearchResultContainer from '../../containers/cafe/CafeSearchResultContainer';

const CafeMainPage = () => {
  return (
    <>
      <HeaderContainer />

      <Container className='mt-5'>
        <Row>
          <Col sm={4} className='d-flex justify-content-center' style={{
            background: '#F1EAD6',
            height: 800,
            borderRadius: '24px',
          }}>
            <CafeSearchContainer />
          </Col>
          <Col sm={8} style={{
            height: 800,
          }}>
            <CafeSearchResultContainer />
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default CafeMainPage;