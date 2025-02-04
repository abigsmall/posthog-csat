import Head from "next/head";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import confetti from "canvas-confetti";
import { usePostHog } from "posthog-js/react";
import { env } from "~/env";

export default function Home() {
  const searchParams = useSearchParams()
  const satisfactionParam = searchParams.get('satisfaction')
  const pathname = usePathname()
  const router = useRouter()
  const [satisfaction, setSatisfaction] = useState<number>(-1)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const posthog = usePostHog();

  const submitFeedback = () => {
    void confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    const userId = searchParams.get('userId')
    const ticketId = searchParams.get('ticketId')
    const team = searchParams.get('team')
    posthog?.capture('survey sent', {
      ticketId,
      userId,
      team,
      $survey_id: env.NEXT_PUBLIC_SURVEY_ID,
      $survey_name: "Customer satisfaction score (CSAT)",
      $survey_question: "How satisfied are you with PostHog surveys?",
      $survey_response: satisfaction + 1,
      $survey_response_1: feedback
    })
    setSubmitted(true)
  }

  useEffect(() => {
    setSatisfaction(parseInt(satisfactionParam ?? '-1'))
  }, [satisfactionParam])

  useEffect(() => {
    if (satisfaction !== -1) {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      current.set('satisfaction', satisfaction.toString())
      router.replace(`${pathname}?${current.toString()}`, {
        scroll: false,
      })
    }
  }, [satisfaction])

  return (
    <>
      <Head>
        <title>PostHog Survey</title>
        <meta name="description" content="PostHog Survey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#eeeded]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {!submitted ? (
            <div className="rating-section">
              <p className="text-sm font-medium">How happy are you with the level of support you received?</p>
              <div className="mt-3.5">
                <div className="flex justify-between">
                  <button
                    className="text-base bg-transparent p-0 border-[none]"
                    type="button"
                    onClick={() => setSatisfaction(0)}
                    style={{ fill: "rgb(147, 147, 147)" }}
                  >
                    <svg
                      className={`${satisfaction === 0 ? 'fill-black' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      height={48}
                      viewBox="0 -960 960 960"
                      width={48}
                    >
                      <path d="M480-417q-67 0-121.5 37.5T278-280h404q-25-63-80-100t-122-37Zm-183-72 50-45 45 45 31-36-45-45 45-45-31-36-45 45-50-45-31 36 45 45-45 45 31 36Zm272 0 44-45 51 45 31-36-45-45 45-45-31-36-51 45-44-45-31 36 44 45-44 45 31 36ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142 0 241-99t99-241q0-142-99-241t-241-99q-142 0-241 99t-99 241q0 142 99 241t241 99Z" />
                    </svg>
                  </button>
                  <button
                    className="text-base bg-transparent p-0 border-[none]"
                    type="button"
                    onClick={() => setSatisfaction(1)}
                    style={{ fill: "rgb(147, 147, 147)" }}
                  >
                    <svg
                      className={`${satisfaction === 1 ? 'fill-black' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      height={48}
                      viewBox="0 -960 960 960"
                      width={48}
                    >
                      <path d="M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm146.174 116Q413-417 358.5-379.5T278-280h53q22-42 62.173-65t87.5-23Q528-368 567.5-344.5T630-280h52q-25-63-79.826-100-54.826-37-122-37ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z" />
                    </svg>
                  </button>
                  <button
                    className="text-base bg-transparent p-0 border-[none]"
                    type="button"
                    onClick={() => setSatisfaction(2)}
                    style={{ fill: "rgb(147, 147, 147)" }}
                  >
                    <svg
                      className={`${satisfaction === 2 ? 'fill-black' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      height={48}
                      viewBox="0 -960 960 960"
                      width={48}
                    >
                      <path d="M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm20 194h253v-49H354v49ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z" />
                    </svg>
                  </button>
                  <button
                    className="text-base bg-transparent p-0 border-[none]"
                    type="button"
                    onClick={() => setSatisfaction(3)}
                    style={{ fill: "rgb(147, 147, 147)" }}
                  >
                    <svg
                      className={`${satisfaction === 3 ? 'fill-black' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      height={48}
                      viewBox="0 -960 960 960"
                      width={48}
                    >
                      <path d="M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm146 272q66 0 121.5-35.5T682-393h-52q-23 40-63 61.5T480.5-310q-46.5 0-87-21T331-393h-53q26 61 81 96.5T480-261Zm0 181q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z" />
                    </svg>
                  </button>
                  <button
                    className="text-base bg-transparent p-0 border-[none]"
                    type="button"
                    onClick={() => setSatisfaction(4)}
                    style={{ fill: "rgb(147, 147, 147)" }}
                  >
                    <svg
                      className={`${satisfaction === 4 ? 'fill-black' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      height={48}
                      viewBox="0 -960 960 960"
                      width={48}
                    >
                      <path d="M479.504-261Q537-261 585.5-287q48.5-26 78.5-72.4 6-11.6-.75-22.6-6.75-11-20.25-11H316.918Q303-393 296.5-382t-.5 22.6q30 46.4 78.5 72.4 48.5 26 105.004 26ZM347-578l27 27q7.636 8 17.818 8Q402-543 410-551q8-8 8-18t-8-18l-42-42q-8.8-9-20.9-9-12.1 0-21.1 9l-42 42q-8 7.636-8 17.818Q276-559 284-551q8 8 18 8t18-8l27-27Zm267 0 27 27q7.714 8 18 8t18-8q8-7.636 8-17.818Q685-579 677-587l-42-42q-8.8-9-20.9-9-12.1 0-21.1 9l-42 42q-8 7.714-8 18t8 18q7.636 8 17.818 8Q579-543 587-551l27-27ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-row justify-between text-[11px] opacity-60 mt-1.5">
                  <div>Very dissatisfied</div>
                  <div>Very satisfied</div>
                </div>
              </div>
              <div className="pt-6">
                <div className="text-sm font-medium">
                  What can we do to increase your rating?
                </div>
                <textarea
                  className="w-full text-sm text-black rounded-[.375rem] mt-3.5 pt-2.5 px-2.5 bg-white"
                  rows={4}
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="Start typing..."
                  style={{ border: "1px solid rgb(201, 198, 198)" }}
                />
              </div>
              <div className="mt-3.5">
                <div className="flex justify-center">
                  <button
                    onClick={submitFeedback}
                    className="relative box-border inline-block w-full overflow-visible text-sm font-bold text-center normal-case whitespace-nowrap touch-manipulation cursor-pointer select-none rounded-[.375rem] shadow-[0_2px_#0000000b] m-0 p-3 border-[1.5px] border-solid border-transparent"
                    type="button"
                    style={{ color: "white", backgroundColor: "black" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>) : (
            <h3 className="font-bold text-2xl">Thank you for your feedback!</h3>
          )}
        </div>
      </main>
    </>
  );
}
