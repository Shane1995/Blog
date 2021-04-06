import React from 'react'

const CommentList = ({ comments }) => {
  const renderContent = (comment) => {
    let content

    if (comment.status === 'approved') {
      content = comment.content
    }
    if (comment.status === 'pending') {
      content = <i style={{ color: 'orange' }}>This comment is awaiting moderation</i>
    }
    if (comment.status === 'rejected') {
      content = <i style={{ color: 'red' }}>This comment has been rejected</i>
    }

    return content
  }

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{renderContent(comment)}</li>
  })
  return <ul>{renderedComments}</ul>
}

export default CommentList
