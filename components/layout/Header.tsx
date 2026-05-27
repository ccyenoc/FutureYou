import { Ghost, Moon } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-white/10 px-8 py-5">

      <div className="flex justify-between items-center">

        <div className="flex gap-3 items-center">

          <div className="w-11 h-11 rounded-2xl bg-violet-500/20 flex items-center justify-center">
            <Ghost className="text-violet-400"/>
          </div>

          <div>
            <h1 className="text-white font-semibold">
              Career Echo
            </h1>

            <p className="text-sm text-zinc-500">
              Meet your future self
            </p>
          </div>

        </div>

        <Moon className="text-zinc-400"/>

      </div>

    </header>
  )
}