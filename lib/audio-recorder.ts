export type RecordingResult = {
  base64: string
  mimeType: string
}

export type RecorderState = "idle" | "requesting" | "recording" | "stopped"

export class AudioPermissionDenied extends Error {
  name = "AudioPermissionDenied"
}

export class AudioDeviceNotFound extends Error {
  name = "AudioDeviceNotFound"
}

export class AudioRecorderNotSupported extends Error {
  name = "AudioRecorderNotSupported"
}

export function getSupportedMimeType(): string {
  if (typeof MediaRecorder === "undefined") return ""
  if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) return "audio/webm;codecs=opus"
  if (MediaRecorder.isTypeSupported("audio/webm")) return "audio/webm"
  if (MediaRecorder.isTypeSupported("audio/mp4")) return "audio/mp4"
  return ""
}

export async function startRecording(options: {
  maxDurationMs?: number
  onStateChange?: (state: RecorderState) => void
}): Promise<{
  stop: () => Promise<RecordingResult>
  cancel: () => void
}> {
  const { maxDurationMs = 10_000, onStateChange } = options

  if (typeof MediaRecorder === "undefined") {
    throw new AudioRecorderNotSupported("MediaRecorder is not supported in this browser")
  }

  const mimeType = getSupportedMimeType()
  if (!mimeType) {
    throw new AudioRecorderNotSupported("No supported audio format found")
  }

  onStateChange?.("requesting")

  let stream: MediaStream
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  } catch (err: unknown) {
    if (err instanceof DOMException) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        throw new AudioPermissionDenied("Microphone permission denied")
      }
      if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        throw new AudioDeviceNotFound("No microphone found")
      }
    }
    throw err
  }

  const chunks: Blob[] = []
  const recorder = new MediaRecorder(stream, { mimeType })
  let stopped = false

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data)
  }

  recorder.start()
  onStateChange?.("recording")

  const autoStopTimer = setTimeout(() => {
    if (!stopped && recorder.state === "recording") {
      recorder.stop()
    }
  }, maxDurationMs)

  const stopTracks = () => {
    stream.getTracks().forEach((t) => t.stop())
  }

  const stop = (): Promise<RecordingResult> => {
    return new Promise((resolve) => {
      if (stopped) {
        resolve({ base64: "", mimeType })
        return
      }
      stopped = true
      clearTimeout(autoStopTimer)

      recorder.onstop = () => {
        stopTracks()
        onStateChange?.("stopped")

        const blob = new Blob(chunks, { type: mimeType })
        const reader = new FileReader()
        reader.onloadend = () => {
          const dataUrl = reader.result as string
          const base64 = dataUrl.split(",")[1] || ""
          resolve({ base64, mimeType })
        }
        reader.readAsDataURL(blob)
      }

      if (recorder.state === "recording") {
        recorder.stop()
      } else {
        stopTracks()
        onStateChange?.("stopped")
        resolve({ base64: "", mimeType })
      }
    })
  }

  const cancel = () => {
    stopped = true
    clearTimeout(autoStopTimer)
    if (recorder.state === "recording") {
      recorder.onstop = null
      recorder.stop()
    }
    stopTracks()
    chunks.length = 0
    onStateChange?.("idle")
  }

  return { stop, cancel }
}
