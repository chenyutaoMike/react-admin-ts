import React, { FC } from 'react'
import { Card, Button, Row, Col } from 'antd';
import './Category.less'
const Category: FC = () => {
  return (
    <div className="category-box">
      <div>
        <Button type="primary" size="large">添加一级分类</Button>
      </div>
      <Row>
        <Col span={8}>
          <div className="category-wrap">
            <div className="category">
              {/* 一级分类 */}
              <h4>纳尼</h4>
              <ul>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
              </ul>
            </div>
            <div className="category">
              {/* 一级分类 */}
              <h4>纳尼</h4>
              <ul>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
                <li>嘎嘎嘎</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className="category-wrap" style={{ backgroundColor: 'yellow' }}>

          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Category