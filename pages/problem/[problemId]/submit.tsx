import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import { client } from '../../../lib/apis'
import { Icon } from '@iconify/react'

const SubmitSolution = () => {
  const ws_url = process.env.NEXT_PUBLIC_WS_URL
  const router = useRouter()
  const { problemId } = router.query
  const [code, setCode] = useState('')
  const [socket, setSocket] = useState<WebSocket>()
  const [receivedMessage, setReceivedMessage] = useState('Waiting for submit')
  const { data, isLoading } = useFetch(
    () =>
      problemId && Number.isInteger(Number(problemId))
        ? client.getProblem(Number(problemId))
        : undefined,
    problemId ? [problemId] : undefined,
  )

  useEffect(() => {
    // Connect to the WebSocket server
    if (!ws_url) return
    const ws = new WebSocket(ws_url) // Replace with your WebSocket URL

    // Event handler for when the connection is opened
    ws.onopen = () => {
      console.log('WebSocket connection opened')
      setSocket(ws)
    }

    // Event handler for when a message is received from the server
    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data)
      console.log(receivedData)
      setReceivedMessage(receivedData.message)
    }

    // Event handler for when the connection is closed
    ws.onclose = () => {
      console.log('WebSocket connection closed')
    }

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [ws_url])

  const sendMessage = () => {
    if (!data) return
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Send a message to the WebSocket server
      setReceivedMessage('Submitting')
      socket.send(
        JSON.stringify({
          source_type: data.source_type,
          code: code,
          problem_id: data.id,
        }),
      )
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    sendMessage()
  }

  return (
    <div>
      <h1>Submit Solution for Problem {problemId}</h1>
      {isLoading && (
        <div className="w-full flex justify-center p-6">
          <div className="animate-spin w-max">
            <Icon icon="vaadin:spinner-third" className="text-2xl" />
          </div>
        </div>
      )}
      {data && (
        <>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
          <form onSubmit={handleSubmit}>
            <textarea
              className="bg-cyan-200"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <h1>Status</h1>
          <p>{receivedMessage}</p>
        </>
      )}
    </div>
  )
}

export default SubmitSolution
