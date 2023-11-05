export function unicodeToString(unicode: string[]): string {
	return String.fromCodePoint(
		...unicode.map((value) => `0x${value.split('+')[1]}`).map(Number),
	);
}
