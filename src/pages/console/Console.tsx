import React, { FC } from 'react'
import { Chart, Interval, Line, Point, Area, Path } from 'bizcharts';
import { Row, Col } from 'antd'
// 数据源
const data1 = [
  { genre: '衣服', sold: 275 },
  { genre: '食物', sold: 115 },
  { genre: '手机', sold: 120 },
  { genre: '电脑', sold: 350 },
  { genre: '耳机', sold: 150 }
];
const data2 = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 7
  },
  {
    month: "Jan",
    city: "London",
    temperature: 3.9
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 6.9
  },
  {
    month: "Feb",
    city: "London",
    temperature: 4.2
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 9.5
  },
  {
    month: "Mar",
    city: "London",
    temperature: 5.7
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 14.5
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 18.4
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 21.5
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 25.2
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 26.5
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 23.3
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 18.3
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 13.9
  },
  {
    month: "Nov",
    city: "London",
    temperature: 6.6
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 9.6
  },
  {
    month: "Dec",
    city: "London",
    temperature: 4.8
  }
];
const data3 = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
// 数据源
const data4 = [
  { consumption: 0.65, price: 1, year: 1965 },
  { consumption: 0.66, price: 1.05, year: 1966 },
  { consumption: 0.64, price: 1.1, year: 1967 },
  { consumption: 0.63, price: 1.12, year: 1968 },
  { consumption: 0.55, price: 1.15, year: 1969 },
  { consumption: 0.57, price: 1.19, year: 1970 },
  { consumption: 0.58, price: 1.14, year: 1971 },
  { consumption: 0.59, price: 1, year: 1972 },
  { consumption: 0.57, price: 0.96, year: 1973 },
  { consumption: 0.55, price: 0.92, year: 1974 },
  { consumption: 0.54, price: 0.88, year: 1975 },
  { consumption: 0.55, price: 0.87, year: 1976 },
  { consumption: 0.42, price: 0.89, year: 1977 },
  { consumption: 0.28, price: 1, year: 1978 },
  { consumption: 0.15, price: 1.1, year: 1979 },
];
const scale = {
  price: {
    min: 0,
    max: 1.5
  },
  year: {
    range: [0.05, 0.95]
  }
}
const Console: FC = () => {
  return (
    <div>
      <Row>
        <Col span={11} >
          <Chart height={320} autoFit data={data1} >
            <Interval position="genre*sold" />
          </Chart>
        </Col>
        <Col span={11} offset={2}>
          <Chart scale={{ temperature: { min: 0 } }} padding={[30, 20, 50, 40]} autoFit height={320} data={data2} >
            <Line shape="smooth" position="month*temperature" color="city" label="temperature" />
            <Point position="month*temperature" color="city" />
          </Chart>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Chart height={320} autoFit data={data3} >
            <Area position="year*value" />
          </Chart>
        </Col>
        <Col span={11} offset={2}>
          <Chart  autoFit data={data4} scale={scale}>
            <Path
              animate={{
                appear: {
                  animation: 'path-in',
                  duration: 1000,
                  easing: 'easeLinear',
                }
              }}
              shape="smooth"
              position="year*price"
            />
          </Chart>
        </Col>
      </Row>
    </div>
  )
}

export default Console