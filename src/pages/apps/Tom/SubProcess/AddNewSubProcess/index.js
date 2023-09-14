import React from 'react'
import NewSubProcessHeader from './NewSubProcessHeader'
import NewSubProcessContent from './NewSubProcessContent'
import { Col, Row } from 'antd'
import LeftBarMenu from './LeftBarMenu'
import { useSelector } from 'react-redux'
import ActionList from './ActionList'
import ActionListHeader from './ActionList/ActionListHeader'

const NewSubProcess = () => {
  
  const leftBarId = useSelector(state => state.SubProcess.leftBarKey);
  console.log(leftBarId);
  return (
    <>
      {
        leftBarId === 0
          ? <NewSubProcessHeader />
          : leftBarId === 3
            ? <ActionListHeader />
            : <NewSubProcessHeader />
      }
      <Row className='new-sub-process' gutter={16}>
        <Col span={6}>
          <LeftBarMenu />
        </Col>
        <Col className='new-sub-process-right-content' span={18}>
          {
            leftBarId === 0
              ? <NewSubProcessContent />
              : leftBarId === 3
                ? <ActionList />
                : <NewSubProcessContent />
          }
        </Col>
      </Row>
    </>
  )
}

export default NewSubProcess