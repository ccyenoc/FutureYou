export default function SectionTitle({
title,
subtitle,
}:any){

return(

<div className="mb-5">

<h2 className="text-xl font-bold text-white">
{title}
</h2>

<p className="text-zinc-500">
{subtitle}
</p>

</div>

)

}