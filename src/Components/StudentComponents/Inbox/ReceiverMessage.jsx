import React from 'react'

const SenderMessage = ({message, time}) => {
  return (
    <>
        <div class="container1 darker1">
            <img src="/vite.svg" alt="Avatar" class="right1" />
            <p>{message}</p>
            <span class="time-left1">{time}</span>
        </div>
    </>
  )
}

export default SenderMessage