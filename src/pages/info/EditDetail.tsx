import React, { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getEditDetailData, removeEditDetailData } from '../../utils/editSave'
const EditDetail: FC = () => {
  let history: any = useHistory()
  const [detail, setDetail] = useState()
  useEffect(() => {
    // 拿到数据
    let data = history.location.state || getEditDetailData()
    setDetail(data)
    return () => {
      // 页面卸载的时候，删除数据
      removeEditDetailData()
    }
  }, []);
  return (
    <div>
      时尚家居设计师
    </div>
  )
}

export default EditDetail