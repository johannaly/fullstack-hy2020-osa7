import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
 
  //console.log(notification)

  if(notification.notification === undefined || notification.notification === '') {
    return null
  }
 
  const className = notification.error ? 'error' : 'notification'
  return (
    <div className = {className}>
      {notification.notification}
    </div>
  )
}

export default Notification