import { Loading } from "./loading"

function App() {
  return (
    <div className="flex w-screen h-screen">
      <div className="m-auto">
        <Loading width={256} height={36} r={2} gap={4} />
      </div>
    </div>
  )
}

export default App
