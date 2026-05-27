export default function GlassCard({
children,
className=""
}:any){

return(

<div
className={`
rounded-[28px]
border
border-white/8

bg-[linear-gradient(
180deg,
rgba(255,255,255,.03),
rgba(255,255,255,.01)
)]

backdrop-blur-xl

shadow-[

0_0_80px_rgba(104,66,255,.08),

inset_0_1px_0_rgba(255,255,255,.04)

]

${className}
`}
>

{children}

</div>

)

}