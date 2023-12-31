import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import useFetch from '@/hooks/useFetch'
import { client } from '@/lib/apis'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import Editor from '@monaco-editor/react'

import {
  ProblemSection,
  ProblemContentChild,
  ProblemContentBaseChild,
  isProblemContentChildTagName,
} from '@/lib/schema'

const ProblemContentChildBaseElement = ({
  item,
}: {
  item: ProblemContentBaseChild
}) => {
  if (typeof item === 'string') return item
  if (item.tag == 'var')
    return <MathJax inline>{`\\(${item.content}\\)`}</MathJax>
  return <img src={item.content} />
}

const ProblemContentChildElement = ({
  item,
}: {
  item: ProblemContentChild | ProblemContentBaseChild
}) => {
  if (typeof item === 'string' || !isProblemContentChildTagName(item.tag)) {
    const realItem = item as ProblemContentBaseChild
    return <ProblemContentChildBaseElement item={realItem} />
  }

  const realItem = item as ProblemContentChild
  const contents = realItem.content.map(
    (contentItem: ProblemContentChild | ProblemContentBaseChild, index) => (
      <ProblemContentChildElement key={index} item={contentItem} />
    ),
  )

  if (['p', 'center'].includes(realItem.tag))
    return <p className="leading-9">{contents}</p>
  if (realItem.tag === 'li') return <li className="leading-9">{contents}</li>
  if (realItem.tag === 'pre')
    return (
      <pre className=" bg-[#ededf0] w-full p-3 leading-9 overflow-auto">
        {contents}
      </pre>
    )
  return <ul className="pl-5 list-disc">{contents}</ul>
}

const ProblemContentElement = ({
  content,
}: {
  content: Array<ProblemSection>
}) => {
  return (
    <div className="w-1/2 overflow-auto">
      <MathJaxContext>
        {content.map((item, index) => (
          <>
            <div key={index} className="mx-3 py-3">
              <h1 className="font-bold">{item.section}</h1>
              {item.children.map((item, index) => (
                <div key={index}>
                  <ProblemContentChildElement item={item} />
                </div>
              ))}
            </div>
            <hr />
          </>
        ))}
      </MathJaxContext>
    </div>
  )
}

const SubmitArea = ({
  code,
  setCode,
  onSubmit,
  submissionStatus,
}: {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
  onSubmit: () => void
  submissionStatus: string
}) => {
  return (
    <div className="w-1/2 mx-3 h-full flex flex-col bg-teal-400 overflow-auto">
      <div className="flex-grow m-2">
        <Editor
          defaultLanguage="python"
          defaultValue={code}
          onChange={(value) => setCode(value ?? '')}
        />
      </div>
      <div className="flex flex-row gap-3">
        <div className="w-1/2">
          <button className="h-full w-full" onClick={onSubmit}>
            <div className="w-full h-full flex items-center justify-center bg-blue-500 active:bg-violet-600">
              Submit
            </div>
          </button>
        </div>
        <h1 className="text-base w-max font-medium whitespace-nowrap flex-grow text-center bg-orange-300 py-3">
          Status: {submissionStatus}
        </h1>
      </div>
    </div>
  )
}

const SubmitSolution = () => {
  const ws_url = process.env.NEXT_PUBLIC_WS_URL
  const router = useRouter()
  const { problemId } = router.query
  const [code, setCode] = useState('# Your code here')
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

  return (
    <div>
      {isLoading && (
        <div className="w-full flex justify-center p-6">
          <div className="animate-spin w-max">
            <Icon icon="vaadin:spinner-third" className="text-2xl" />
          </div>
        </div>
      )}
      {data && (
        <div className="h-screen flex flex-col">
          <h1 className="w-full text-center text-lg font-medium p-3 border bg-blue-300">
            Problem {data.name} - {data.contest_name} (source:{' '}
            {data.source_type})
          </h1>
          <div className="flex flex-row mt-3 overflow-auto">
            <ProblemContentElement content={data.content ?? []} />
            <div className="w-0.5 bg-slate-200" />
            <SubmitArea
              code={code}
              setCode={setCode}
              submissionStatus={receivedMessage}
              onSubmit={() => sendMessage()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmitSolution
