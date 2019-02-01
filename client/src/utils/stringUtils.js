export function aOrAn(wordThatFollows) {
	const vowels = ['a', 'e', 'i', 'o', 'u']
	const firstLetter = wordThatFollows.split('')[0].toLowerCase()

	if (vowels.includes(firstLetter)) {
		return 'an'
	} else {
		return 'a'
	}
}
