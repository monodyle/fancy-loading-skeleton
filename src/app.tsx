import { Loading as Example1 } from "./loading/example-1"
import { Loading as Example2 } from "./loading/example-2"

function App() {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col gap-4 m-auto">
        <Example1 width={256} height={36} r={2} gap={4} />
        <Example2 width={256} height={36} r={2} gap={4} />
      </div>
    </div>
  )
}

export default App
