import React, { FC, useState, useEffect } from 'react'
import InfoHeader from '../../components/infoHeader/InfoHeader'
import { GetCategory } from '../../api/info'

// export interface categoryItem {
//   id: string;
//   category_name: string;
// }

// export interface infoHeaderProps {
//   category: Array<categoryItem>;
//   keyword: Array<keywordProps>
// }
// export interface keywordProps {
//   value: string;
//   label: string;
// }
// const infoHeaderData = {
//   category: [],
//   keyword: [
//     {
//       value: "id",
//       label: "ID"
//     },
//     {
//       value: "title",
//       label: "标题"
//     }
//   ]
// }
const CategoryList: FC = (props) => {
  const [infoHeaderData, setInfoHeaderData] = useState({
    category: [],
    keyword: [
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]
  })
  useEffect(() => {
    // 请求分类
    getCategory()
  }, [])
  const getCategory = () => {
    GetCategory({}).then(res => {
      let result = res.data
      if (result.resCode === 0) {
        // 设置要传递的值
        setInfoHeaderData({ ...infoHeaderData, category: result.data.data })
      }
    })
  }
  return (
    <div>
      <InfoHeader infoHeaderProps={infoHeaderData} />
    </div>
  )
}

export default CategoryList