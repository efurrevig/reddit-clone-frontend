'use client'

const TimeDisplay = ( props: { created_at: string }) => {
    const getTimeDifference = (timestamp: string) => {
      const currentTime = new Date()
      const previousTime = new Date(timestamp)
      const timeDifference = currentTime.getTime() - previousTime.getTime()
      const seconds = Math.floor(timeDifference / 1000)
  
      let interval = Math.floor(seconds / 31536000)
      if (interval > 1) {
        return `${interval} years ago`
      }
      interval = Math.floor(seconds / 2592000)
      if (interval > 1) {
        return `${interval} months ago`
      }
      interval = Math.floor(seconds / 86400)
      if (interval > 1) {
        return `${interval} days ago`
      }
      interval = Math.floor(seconds / 3600)
      if (interval > 1) {
        return `${interval} hours ago`
      }
      interval = Math.floor(seconds / 60)
      if (interval > 1) {
        return `${interval} minutes ago`
      }
      return `${Math.floor(seconds)} seconds ago`
    };
  
    const formattedTime = getTimeDifference(props.created_at)
  
    return <div>{formattedTime}</div>
  };
  
  export default TimeDisplay