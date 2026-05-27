import { Upload } from "lucide-react"

export default function UploadBox(){

return(

<div className="
border-2
border-dashed
border-violet-500/20
rounded-3xl
p-8
text-center
">

<Upload className="mx-auto mb-4"/>

<p className="text-white">
Drop Resume Here
</p>

<p className="text-sm text-zinc-500">
PDF • DOCX
</p>

</div>

)

}