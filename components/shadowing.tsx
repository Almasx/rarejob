"use client"

import { cn } from "@/lib/utils"
import { api } from "@/convex/_generated/api"
import { startRecording, type RecorderState, AudioPermissionDenied, AudioDeviceNotFound } from "@/lib/audio-recorder"
import { useAction } from "convex/react"
import { motion } from "framer-motion"
import { Mic, Pause, Play, RotateCcw, Square } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

type ShadowingProps = {
  dialogue: { speaker: string; lineEn: string; lineJp: string }
  onRate: (rating: "again" | "good" | "easy") => void
}

export function Shadowing({ dialogue, onRate }: ShadowingProps) {
  const generateSpeech = useAction(api.openai.generateSpeech)
  const transcribeAudio = useAction(api.openai.transcribeAudio)
  const comparePronunciation = useAction(api.openai.comparePronunciation)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioSrc, setAudioSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [listened, setListened] = useState(false)

  // Recording states
  const [recorderState, setRecorderState] = useState<RecorderState>("idle")
  const [transcribing, setTranscribing] = useState(false)
  const [comparing, setComparing] = useState(false)
  const [feedback, setFeedback] = useState<{
    score: number
    differences: { expected: string; got: string; type: string }[]
    tipEn: string
    tipJp: string
  } | null>(null)
  const [recordError, setRecordError] = useState<string | null>(null)
  const stopRecordingRef = useRef<(() => Promise<{ base64: string; mimeType: string }>) | null>(null)
  const cancelRecordingRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setAudioSrc(null)
    setPlaying(false)
    setListened(false)
    setRecorderState("idle")
    setTranscribing(false)
    setComparing(false)
    setFeedback(null)
    setRecordError(null)
    stopRecordingRef.current = null

    generateSpeech({ text: dialogue.lineEn }).then((src) => {
      if (!cancelled) {
        setAudioSrc(src)
        setLoading(false)
      }
    }).catch(() => {
      if (!cancelled) setLoading(false)
    })

    return () => {
      cancelled = true
      cancelRecordingRef.current?.()
    }
  }, [dialogue.lineEn, generateSpeech])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !audioSrc) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }, [playing, audioSrc])

  const replay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.play()
    setPlaying(true)
  }, [])

  const handleEnded = useCallback(() => {
    setPlaying(false)
    setListened(true)
  }, [])

  const handleStartRecording = useCallback(async () => {
    setRecordError(null)
    setFeedback(null)
    try {
      const { stop, cancel } = await startRecording({
        maxDurationMs: 10_000,
        onStateChange: setRecorderState,
      })
      stopRecordingRef.current = stop
      cancelRecordingRef.current = cancel
    } catch (err: unknown) {
      if (err instanceof AudioPermissionDenied) {
        setRecordError("マイクの使用が許可されていません。設定から許可してください。")
      } else if (err instanceof AudioDeviceNotFound) {
        setRecordError("マイクが見つかりません。")
      } else {
        setRecordError("録音を開始できませんでした。")
      }
      setRecorderState("idle")
    }
  }, [])

  const handleStopRecording = useCallback(async () => {
    if (!stopRecordingRef.current) return

    const result = await stopRecordingRef.current()
    stopRecordingRef.current = null
    cancelRecordingRef.current = null
    setRecorderState("idle")

    if (!result.base64) return

    setTranscribing(true)
    try {
      const transcription = await transcribeAudio({
        audioBase64: result.base64,
        mimeType: result.mimeType,
      })
      setTranscribing(false)

      setComparing(true)
      const pronunciationFeedback = await comparePronunciation({
        original: dialogue.lineEn,
        transcription,
      })
      setComparing(false)
      setFeedback(pronunciationFeedback)
    } catch {
      setTranscribing(false)
      setComparing(false)
      setRecordError("フィードバックを取得できませんでした。もう一度お試しください。")
    }
  }, [transcribeAudio, comparePronunciation, dialogue.lineEn])

  return (
    <div className="card-raised overflow-hidden">
      <div className="p-6 pb-8">
        <span className="text-caption text-text-tertiary font-medium tracking-wide uppercase">
          Listen & Repeat
        </span>

        <div className="mt-5 mb-2">
          <p className="text-text-tertiary text-sm font-medium mb-1">{dialogue.speaker}</p>
          <p className="text-[22px] font-semibold leading-relaxed">{dialogue.lineEn}</p>
          <p className="text-text-secondary text-base mt-2">{dialogue.lineJp}</p>
        </div>

        <div className="flex items-center gap-3 mt-8">
          {loading ? (
            <div className="w-full flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : audioSrc ? (
            <>
              <audio ref={audioRef} src={audioSrc} onEnded={handleEnded} />
              <motion.button
                onClick={togglePlay}
                className={cn(
                  "flex items-center justify-center w-14 h-14 rounded-full transition-colors",
                  playing ? "bg-accent/10 text-accent" : "bg-accent text-white"
                )}
                whileTap={{ scale: 0.95 }}
              >
                {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
              </motion.button>
              <motion.button
                onClick={replay}
                className="flex items-center justify-center w-10 h-10 rounded-full text-text-tertiary active:opacity-60 transition-opacity"
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw size={18} />
              </motion.button>
              <div className="flex-1" />
              {listened && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-caption text-accent font-medium"
                >
                  Now repeat!
                </motion.span>
              )}
            </>
          ) : (
            <p className="text-text-tertiary text-sm">Audio unavailable</p>
          )}
        </div>
      </div>

      {listened && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 border-t border-border"
        >
          {/* Mic recording */}
          <div className="pt-4 pb-2 flex items-center gap-3">
            {!feedback && (
              <motion.button
                onClick={recorderState === "recording" ? handleStopRecording : handleStartRecording}
                disabled={transcribing || comparing}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full transition-colors",
                  recorderState === "recording"
                    ? "bg-red-500 text-white"
                    : "bg-surface-secondary text-text-secondary"
                )}
                whileTap={{ scale: 0.95 }}
              >
                {recorderState === "recording" ? (
                  <Square size={16} fill="currentColor" />
                ) : (
                  <Mic size={20} />
                )}
              </motion.button>
            )}
            {recorderState === "recording" && (
              <span className="flex items-center gap-2 text-red-500 text-caption font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Recording...
              </span>
            )}
            {(transcribing || comparing) && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-text-secondary">
                  {transcribing ? "Analyzing your speech..." : "Checking pronunciation..."}
                </span>
              </div>
            )}
          </div>

          {recordError && (
            <p className="text-sm text-red-500 pb-2">{recordError}</p>
          )}

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="pb-3 mb-1 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={cn(
                  "inline-flex items-center justify-center w-11 h-11 rounded-full text-base font-bold",
                  feedback.score >= 90 ? "bg-accent/10 text-accent" :
                  feedback.score >= 70 ? "bg-yellow-100 text-yellow-700" :
                  feedback.score >= 50 ? "bg-orange-100 text-orange-700" :
                  "bg-red-100 text-red-700"
                )}>
                  {feedback.score}
                </span>
                <span className="text-sm font-medium text-text-secondary">
                  {feedback.score >= 90 ? "Excellent!" :
                   feedback.score >= 70 ? "Good job!" :
                   feedback.score >= 50 ? "Keep practicing!" :
                   "Try again!"}
                </span>
              </div>

              {feedback.differences.length > 0 && (
                <div className="mb-3">
                  <p className="text-caption text-text-tertiary font-medium mb-1">Differences</p>
                  <div className="flex flex-wrap gap-1.5">
                    {feedback.differences.map((d, i) => (
                      <span key={i} className={cn(
                        "px-2 py-0.5 rounded-md text-sm font-medium",
                        d.type === "missing" ? "bg-red-50 text-red-600 line-through" :
                        d.type === "extra" ? "bg-blue-50 text-blue-600" :
                        "bg-orange-50 text-orange-600"
                      )}>
                        {d.type === "missing" ? d.expected :
                         d.type === "extra" ? `+${d.got}` :
                         `${d.expected} → ${d.got}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-sm">
                <p className="text-text-primary">{feedback.tipEn}</p>
                <p className="text-text-secondary mt-0.5">{feedback.tipJp}</p>
              </div>

              <button
                onClick={() => { setFeedback(null); setRecordError(null) }}
                className="mt-3 text-accent text-sm font-medium active:opacity-60 transition-opacity"
              >
                Try again
              </button>
            </motion.div>
          )}

          <p className="text-caption text-text-tertiary font-medium pt-1 pb-2">How did you do?</p>
          <button
            onClick={() => onRate("again")}
            className="w-full text-left px-0 py-4 text-text-tertiary font-semibold text-base border-b border-border active:opacity-60 transition-opacity"
          >
            Again
          </button>
          <button
            onClick={() => onRate("good")}
            className="w-full text-left px-0 py-4 text-text-primary font-semibold text-base border-b border-border active:opacity-60 transition-opacity"
          >
            Good
          </button>
          <button
            onClick={() => onRate("easy")}
            className="w-full text-left px-0 py-4 text-accent font-semibold text-base active:opacity-60 transition-opacity"
          >
            Easy
          </button>
          <div className="h-3" />
        </motion.div>
      )}
    </div>
  )
}
