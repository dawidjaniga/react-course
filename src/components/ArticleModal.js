import React from 'react'
import { Modal } from 'antd'
import { useMapStore } from '../pages/map/store'

export default function ArticleModal () {
  const [{ modalVisible, currentArticle }, { setModalVisible }] = useMapStore()
  const { url, title } = currentArticle

  function handleCancel () {
    setModalVisible(false)
  }

  return (
    <div>
      <Modal
        title={title}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width='80vw'
        bodyStyle={{
          height: '80vh'
        }}
      >
        <iframe
          src={url?.replace('wikipedia.org', 'm.wikipedia.org')}
          title={title}
          width='100%'
          height='100%'
          style={{ border: 'none' }}
        />
      </Modal>
    </div>
  )
}
