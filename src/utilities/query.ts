// prettier-ignore
type Selector<K extends PropertyKey> = K extends string
  ?
  | K 
  | `${K}.${string}`
		| `${K}#${string}`
		| `${K}[${string}]`
		| `${string} ${K}`
  : HTMLElement

// prettier-ignore
type Query<
	T extends {[K in keyof T]: Element}
> = <K extends keyof T>(
  name: Selector<K>,
  parent?: Element
) => T[K] | null

export const query: Query<
  // prettier-ignore
  HTMLElementTagNameMap
	& SVGElementTagNameMap
	& MathMLElementTagNameMap
> = (name, parent = document.body) => {
  return parent.querySelector(name)
}
