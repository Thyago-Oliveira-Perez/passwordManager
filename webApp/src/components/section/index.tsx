import { SectionProps } from "./types";

export default function Section(props: SectionProps) {
  return(
    <div className="mx-96 flex items-center justify-center flex-wrap w-auto">
    <h2 className="text-4xl mb-10 text-white">
      {props.title}
    </h2>
    <p className="text-2xl text-white">
      {props.text}
    </p>
  </div>
  )
}
