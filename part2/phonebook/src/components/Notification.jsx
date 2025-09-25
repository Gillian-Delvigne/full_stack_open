import React from 'react'

export const Notification = ({ message, status }) => {
  return (
    message &&
	<div className={`${status}`}>{message}</div>
  )
}
